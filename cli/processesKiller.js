const fs = require('fs')
const kill = require('tree-kill');

try {
  const pids = fs.readFileSync('./.temp/pids.txt', 'utf8').split(',')
  console.log('Killing pids:', pids)
  pids.forEach((pid) => {
    console.log('Killing pid:', pid)
    try {
      if (pid && !isNaN(Number(pid))) {
        kill(Number(pid))
      }
      console.log('pid: ', pid + ' killed')
    } catch (e) {
      console.log('Failed to kill pid:', pid)
    }
  })
  fs.writeFileSync('./.temp/pids.txt', '')
} catch {}
