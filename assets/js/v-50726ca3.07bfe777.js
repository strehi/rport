(self.webpackChunkrport_site=self.webpackChunkrport_site||[]).push([[83],{1363:(e,r,t)=>{"use strict";t.r(r),t.d(r,{data:()=>o});const o={key:"v-50726ca3",path:"/docs/no19-rdp-proxy.html",title:"RDP-Proxy",lang:"en-DE",frontmatter:{},excerpt:"",headers:[{level:2,title:"Preface",slug:"preface",children:[]},{level:2,title:"Prerequisites",slug:"prerequisites",children:[]},{level:2,title:"Install Apache Guacamole Server",slug:"install-apache-guacamole-server",children:[]},{level:2,title:"Frontend Options",slug:"frontend-options",children:[]}],filePathRelative:"docs/no19-rdp-proxy.md"}},7917:(e,r,t)=>{"use strict";t.r(r),t.d(r,{default:()=>I});var o=t(6252);const n=(0,o.uE)('<h1 id="rdp-proxy" tabindex="-1"><a class="header-anchor" href="#rdp-proxy" aria-hidden="true">#</a> RDP-Proxy</h1><h2 id="preface" tabindex="-1"><a class="header-anchor" href="#preface" aria-hidden="true">#</a> Preface</h2><p>Starting with version 0.6.0 RPort has the ability to create a tunnel to a remote RDP server with a built-in HTTPS proxy. RPort uses the Apache Guacamole Server to connect to the remote RDP Server, which brings the remote desktop into your browser without the need of an RDP viewer. If a rdp tunnel with https proxy is created, RPort first creates the tunnel to the remote machine and makes it available through the https proxy with path &quot;/&quot;. Pointing the browser to this URL creates a websocket tunnel to connect the browser with the guacamole server and starts the connection to the remote RDP server.</p><h2 id="prerequisites" tabindex="-1"><a class="header-anchor" href="#prerequisites" aria-hidden="true">#</a> Prerequisites</h2><ul><li>Apache Guacamole Server 1.4.X has to be running on 127.0.0.1</li></ul><div class="custom-container tip"><p class="custom-container-title">TIP</p><p>👉 <strong>You don&#39;t need a fully featured Guacamole installation.</strong> Only the <code>guacd</code> is needed, which is a lightweight and easy to install daemon. It does not require any configuration or special maintenance.</p></div><h2 id="install-apache-guacamole-server" tabindex="-1"><a class="header-anchor" href="#install-apache-guacamole-server" aria-hidden="true">#</a> Install Apache Guacamole Server</h2><p>To run the guacamole server <code>guacd</code> you have the following options:</p>',8),a=(0,o.Uk)("Use the pre-compiled packges for Ubuntu or Debian we have perpared to run the "),l=(0,o.Wm)("code",null,"guacd",-1),i=(0,o.Uk)(" just for RPort. "),c={href:"https://bitbucket.org/cloudradar/rport-guacamole/src/main/",target:"_blank",rel:"noopener noreferrer"},d=(0,o.Uk)("downloads and instructions"),s=(0,o.Uk)("Build the Guacamole Server from source and run it, which is described "),u={href:"http://guacamole.incubator.apache.org/doc/gug/installing-guacamole.html",target:"_blank",rel:"noopener noreferrer"},h=(0,o.Uk)("here"),p=(0,o.Uk)("."),m=(0,o.Uk)("Use one of the provided Docker images for guacd, e.g. from "),g={href:"https://docs.linuxserver.io/images/docker-guacd",target:"_blank",rel:"noopener noreferrer"},f=(0,o.Uk)("linuxserver.io"),w=(0,o.uE)('<div class="language-text ext-text line-numbers-mode"><pre class="language-text"><code>docker pull lscr.io/linuxserver/guacd\ndocker run -d --name=guacd -p 4822:4822 --net=host --restart unless-stopped lscr.io/linuxserver/guacd\n</code></pre><div class="line-numbers"><span class="line-number">1</span><br><span class="line-number">2</span><br></div></div>Important: docker run with <code>--net=host</code> to connect to RPort tunnel on 127.0.0.1',4),k=(0,o.Wm)("h2",{id:"frontend-options",tabindex:"-1"},[(0,o.Wm)("a",{class:"header-anchor",href:"#frontend-options","aria-hidden":"true"},"#"),(0,o.Uk)(" Frontend Options")],-1),b=(0,o.Wm)("p",null,'If the browser links to the exposed proxy port with "/", query parameters can be set to control the rdp connection.',-1),y=(0,o.Wm)("p",null,[(0,o.Uk)("E.g. "),(0,o.Wm)("code",null,"/?username=Administrator&width=800&height=600&security=nla&keyboard=de-de-qwertz")],-1),v=(0,o.Wm)("li",null,[(0,o.Wm)("p",null,[(0,o.Wm)("code",null,"username"),(0,o.Uk)(" is the pre-filled login user on the remote machine. For security reasons, the password cannot be injected.")])],-1),W=(0,o.Wm)("li",null,[(0,o.Wm)("p",null,[(0,o.Wm)("code",null,"width"),(0,o.Uk)(" for the required screen width and "),(0,o.Wm)("code",null,"height"),(0,o.Uk)(" for the required screen height. If "),(0,o.Wm)("code",null,"width"),(0,o.Uk)(" and "),(0,o.Wm)("code",null,"height"),(0,o.Uk)(" are omitted, 1024 x 768 are the default values.")])],-1),x=(0,o.uE)("<code>security</code> with one of the following values: <code>any</code>, <code>nla</code>, <code>nla-ext</code>, <code>tls</code>, <code>vmconnect</code>, <code>rdp</code>. <code>nla</code> is the most commonly used security option on MS Windows. Read more on the ",16),q={href:"https://guacamole.apache.org/doc/gug/configuring-guacamole.html#authentication-and-security",target:"_blank",rel:"noopener noreferrer"},U=(0,o.Uk)("Guacamole documentation"),P=(0,o.Uk)("."),R=(0,o.uE)("<p><code>keyboard</code> to identify the local keyboard of the user, not the desired remote keyboard, with one of the following options.</p><ul><li>Brazilian (Portuguese), <code>pt-br-qwerty</code></li><li>English (UK) <code>en-gb-qwerty</code></li><li>English (US) <code>en-us-qwerty</code></li><li>French <code>fr-fr-azerty</code></li><li>French (Belgian) <code>fr-be-azerty</code></li><li>French (Swiss) <code>fr-ch-qwertz</code></li><li>German <code>de-de-qwertz</code></li><li>German (Swiss) <code>de-ch-qwertz</code></li><li>Hungarian <code>hu-hu-qwertz</code></li><li>Italian <code>it-it-qwerty</code></li><li>Japanese <code>ja-jp-qwerty</code></li><li>Norwegian <code>no-no-qwerty</code></li><li>Spanish <code>es-es-qwerty</code></li><li>Spanish (Latin American) <code>es-latam-qwerty</code></li><li>Swedish <code>sv-se-qwerty</code></li><li>Turkish-Q <code>tr-tr-qwerty</code></li></ul>",2),S=(0,o.Uk)("Read more on the "),G={href:"https://guacamole.apache.org/doc/gug/configuring-guacamole.html#session-settings",target:"_blank",rel:"noopener noreferrer"},D=(0,o.Uk)("Guacamole documentation"),I={render:function(e,r){const t=(0,o.up)("OutboundLink");return(0,o.wg)(),(0,o.j4)(o.HY,null,[n,(0,o.Wm)("ul",null,[(0,o.Wm)("li",null,[a,l,i,(0,o.Wm)("a",c,[d,(0,o.Wm)(t)])]),(0,o.Wm)("li",null,[s,(0,o.Wm)("a",u,[h,(0,o.Wm)(t)]),p]),(0,o.Wm)("li",null,[m,(0,o.Wm)("a",g,[f,(0,o.Wm)(t)]),w])]),k,b,y,(0,o.Wm)("ul",null,[v,W,(0,o.Wm)("li",null,[(0,o.Wm)("p",null,[x,(0,o.Wm)("a",q,[U,(0,o.Wm)(t)]),P])]),(0,o.Wm)("li",null,[R,(0,o.Wm)("p",null,[S,(0,o.Wm)("a",G,[D,(0,o.Wm)(t)])])])])],64)}}}}]);