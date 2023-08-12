const { spawn } = require('child_process')

const child = spawn('npm run dev', {
  shell: true,
  stdio: 'pipe'
})

child.stdout.on('data', (data) => {
  process.stdout.write(data.toString())
})
