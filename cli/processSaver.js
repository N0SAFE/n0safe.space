const { spawn } = require('child_process')
const fs = require('fs')

const args = process.argv.slice(2)

const child = spawn(args.join(' '), {
  stdio: 'inherit',
  shell: true,
})

try {
  fs.mkdirSync('./.temp')
} catch {}

try {
  const pids = new Set(fs.readFileSync('./.temp/pids.txt', 'utf8').split(','))
  fs.writeFileSync('./.temp/pids.txt', [...pids, process.pid].join(','))
} catch {
  fs.writeFileSync('./.temp/pids.txt', `${process.pid}`)
}

child.on('exit', (code, signal) => {
  console.log(
    'child process exited with ' + `code ${code} and signal ${signal}`
  )
  const pids = new Set(fs.readFileSync('./.temp/pids.txt', 'utf8').split(','))
  pids.delete(process.pid)
  fs.writeFileSync('.temp/pids.txt', [...pids].join(','))
})
