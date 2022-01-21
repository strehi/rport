package clienttunnel

import (
	"context"
	"crypto/tls"
	"errors"
	"fmt"
	"net"
	"net/http"
	"time"

	"github.com/gorilla/mux"

	chshare "github.com/cloudradar-monitoring/rport/share"
	"github.com/cloudradar-monitoring/rport/share/logger"
)

type TunnelProxyConfig struct {
	CertFile  string `mapstructure:"tunnel_proxy_cert_file"`
	KeyFile   string `mapstructure:"tunnel_proxy_key_file"`
	NovncRoot string `mapstructure:"novnc_root"`
	Enabled   bool
}

func (c *TunnelProxyConfig) ParseAndValidate() error {
	if c.CertFile == "" && c.KeyFile == "" {
		c.Enabled = false
		return nil
	}
	if c.CertFile != "" && c.KeyFile == "" {
		return errors.New("when 'tunnel_proxy_cert_file' is set, 'tunnel_proxy_key_file' must be set as well")
	}
	if c.KeyFile != "" && c.CertFile == "" {
		return errors.New("when 'tunnel_proxy_key_file' is set, 'tunnel_proxy_cert_file' must be set as well")
	}
	_, err := tls.LoadX509KeyPair(c.CertFile, c.KeyFile)
	if err != nil {
		return fmt.Errorf("invalid 'tunnel_proxy_cert_file', 'tunnel_proxy_key_file': %v", err)
	}
	c.Enabled = true
	return nil
}

type TunnelProxy struct {
	Tunnel               *Tunnel
	Logger               *logger.Logger
	Config               *TunnelProxyConfig
	Host                 string
	Port                 string
	TunnelHost           string
	TunnelPort           string
	ACL                  *TunnelACL
	proxyServer          *http.Server
	tunnelProxyConnector TunnelProxyConnector
}

func NewTunnelProxy(tunnel *Tunnel, logger *logger.Logger, config *TunnelProxyConfig, host string, port string, acl *TunnelACL) *TunnelProxy {
	tp := &TunnelProxy{
		Tunnel:     tunnel,
		Config:     config,
		Host:       host,
		Port:       port,
		TunnelHost: tunnel.Remote.LocalHost,
		TunnelPort: tunnel.Remote.LocalPort,
		ACL:        acl,
	}
	tp.Logger = logger.Fork("tunnel-proxy:%s", tp.Addr())

	tp.tunnelProxyConnector = NewTunnelProxyConnector(tp)
	return tp
}
func (tp *TunnelProxy) Start(ctx context.Context) error {
	router := mux.NewRouter()
	router.Use(tp.handleACL)

	router = tp.tunnelProxyConnector.InitRouter(router)

	tp.proxyServer = &http.Server{
		Addr:    tp.Addr(),
		Handler: router,
	}

	go func() {
		err := tp.proxyServer.ListenAndServeTLS(tp.Config.CertFile, tp.Config.KeyFile)
		if err != nil && err == http.ErrServerClosed {
			tp.Logger.Infof("tunnel proxy closed")
			return
		}
		if err != nil {
			tp.Logger.Debugf("tunnel proxy ended with %v", err)
		}
	}()

	tp.Logger.Infof("tunnel proxy started")
	return nil
}

func (tp *TunnelProxy) Stop(ctx context.Context) error {
	ctxShutDown, cancel := context.WithTimeout(ctx, 5*time.Second)
	defer cancel()

	if err := tp.proxyServer.Shutdown(ctxShutDown); err != nil {
		tp.Logger.Infof("tunnel proxy shutdown failed:%+s", err)
	}

	return nil
}

func (tp *TunnelProxy) Addr() string {
	return net.JoinHostPort(tp.Host, tp.Port)
}

func (tp *TunnelProxy) TunnelAddr() string {
	return net.JoinHostPort(tp.TunnelHost, tp.TunnelPort)
}

//handleACL middleware to handle ACL
func (tp *TunnelProxy) handleACL(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		if tp.ACL == nil {
			next.ServeHTTP(w, r)
			return
		}
		clientIP := chshare.RemoteIP(r)
		ipv4 := net.ParseIP(clientIP)
		if ipv4 == nil {
			tp.Logger.Infof("Proxy Access rejected. Cannot parse ip: %s", clientIP)
		}
		if ipv4 != nil {
			tcpIP := &net.TCPAddr{IP: ipv4}
			if tp.ACL.CheckAccess(tcpIP.IP) {
				next.ServeHTTP(w, r)
				return
			}

			tp.Logger.Infof("Proxy Access rejected. Remote addr: %s", clientIP)
		}
		tp.sendHTML(w, http.StatusForbidden, "Access rejected by ACL")
	})
}

func (tp *TunnelProxy) handleProxyError(w http.ResponseWriter, r *http.Request, err error) {
	tp.Logger.Errorf("Error during proxy request %v", err)
	tp.sendHTML(w, http.StatusInternalServerError, err.Error())
}

func (tp *TunnelProxy) sendHTML(w http.ResponseWriter, statusCode int, msg string) {
	w.Header().Set("Content-Type", "text/html; charset=UTF-8")
	w.WriteHeader(statusCode)
	m := fmt.Sprintf("[%d] Rport tunnel proxy: %s", statusCode, msg)
	_, _ = w.Write([]byte(m))
}
