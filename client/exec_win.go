//+build windows

package chclient

import (
	"context"
	"golang.org/x/text/encoding/charmap"
	"os/exec"
	"strings"
	"syscall"
)

func (e *CmdExecutorImpl) New(ctx context.Context, execCtx *CmdExecutorContext) *exec.Cmd {
	// workaround for the issue with escaping args on windows for cmd shell https://github.com/golang/go/issues/1849
	if execCtx.Shell == cmdShell {
		cmd := exec.CommandContext(ctx, execCtx.Shell)
		cmd.SysProcAttr = &syscall.SysProcAttr{}
		cmd.SysProcAttr.CmdLine = strings.Join(shellOptions[execCtx.Shell], " ") + execCtx.Command
		return cmd
	}

	return e.newCmd(ctx, execCtx)
}

func (e *CmdExecutorImpl) DecodeOutput(output string) (string, error) {
	decoder := charmap.CodePage850.NewDecoder()
	dec, err := decoder.String(output)
	return dec, err
}
