const version = process.argv[2]
const packageJson = 'package.json'
const fs = require('fs')
fs.readFile(packageJson, 'utf8', function (err, data) {
  if (err) {
    throw new Error(err?.stack)
  }
  const result = data.replace(/"version": ".+"/g, `"version": "${version}"`)

  fs.writeFile(packageJson, result, 'utf8', function (err) {
    if (err) {
      throw new Error(err?.stack)
    }
  })
})
