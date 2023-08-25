const fs = require('fs')
const kill = require('tree-kill');

const pid = process.argv[2]

kill(Number(pid))

try {
  const pids = new Set(fs.readFileSync('./.temp/pids.txt', 'utf8').split(','))
  pids.delete(pid)
  fs.writeFileSync('./.temp/pids.txt', [...pids].join(','))
} catch {}
