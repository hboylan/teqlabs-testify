var request = require('request')

function Test (host, port, secure) {
  this._params = {}
  this._rootAPI = 'http'
  if(secure){

    // allow testing with self-signed certificate
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    this._params.rejectUnhauthorized = false
    this._rootAPI += 's'
  }
  this._rootAPI += '://' + opts.host + ':' + (opts.port || 80)
  this._headers = {
    'Content-Type': 'application/json'
  }
  console.log('Testing ' + this._rootAPI)
  console.log()
}
module.exports = Test

Test.prototype._req = function (opts, next) {

  // request params
  opts.method = opts.method ? opts.method : 'GET'
  opts.headers = this._headers
  opts.uri = this._rootAPI + opts.path
  for(p in this._params)
    opts[p] = this._params[p]

  console.info(opts.method.toUpperCase(), opts.uri)           // GET http://localhost:8000/
  console.info(JSON.stringify(opts.json, null, 2))            // { username: 'hjboylan' }
  request(params, function (err, res, body) {
    if(err) console.error(err)
    console.log('RESPONSE:', '[' + res.statusCode + ']')      // RESPONSE: [200]
    console.log(JSON.stringify(body, null, 2) || null, '\n')  // { message: 'you win!' }
    next(res, body)
  })
}

Test.prototype.get = function (path, next) {
  this._req({ path:path }, next)
}

Test.prototype.post = function (path, json, next) {
  this._req({ method:'POST', path:path, json:json }, next)
}

Test.prototype.put = function (path, json, next) {
  this._req({ method:'PUT', path:path, json:json }, next)
}

Test.prototype.del = function (path, json, next) {
  this._req({ method:'DELETE', path:path, json:json }, next)
}

Test.prototype.bearer = function (token) {
  this._req['Authorization'] = 'Bearer ' + token
}

Test.prototype.header = function (key, val) {
  this._headers[key] = val
}
