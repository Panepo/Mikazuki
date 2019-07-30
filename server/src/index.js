// Transpile all code following this line with babel and use 'env' (aka ES6) preset.
require('@babel/register')

if (process.argv[2] == 'console') {
  module.exports = require('./console.js')
} else {
  module.exports = require('./server.js')
}
