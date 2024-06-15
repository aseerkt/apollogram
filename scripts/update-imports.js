const fs = require('fs')
const path = require('path')

const directoryPath = path.join(__dirname, '..', process.argv[2])

console.log(directoryPath)

function updateImports(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file)
    if (fs.lstatSync(fullPath).isDirectory()) {
      updateImports(fullPath)
    } else if (path.extname(fullPath) === '.ts') {
      let content = fs.readFileSync(fullPath, 'utf8')
      content = content.replace(
        /(import\s+.*?from\s+['"])(.*?)(['"];?)/g,
        (match, p1, p2, p3) => {
          if (
            p2.startsWith('.') &&
            !p2.endsWith('.js') &&
            !p2.endsWith('.ts')
          ) {
            return `${p1}${p2}.js${p3}`
          }
          return match
        }
      )
      fs.writeFileSync(fullPath, content, 'utf8')
    }
  })
}

updateImports(directoryPath)
