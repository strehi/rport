// +build !windows,!linux

package fs

import (
	"context"

	"github.com/shirou/gopsutil/disk"
)

func getPartitions(onlyUniqueDevices bool) ([]disk.PartitionStat, error) {
	ctx, cancel := context.WithTimeout(context.Background(), fsInfoRequestTimeout)
	defer cancel()

	return disk.PartitionsWithContext(ctx, true)
}
