var request = require('request')

function Test (opts) {
  this._params = {}
  this._rootAPI = 'http'
  if(opts.secure){
    this._params.
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

Test.prototype._req = function (params, next) {
  console.info(method.toUpperCase(), params.uri)
  console.info(JSON.stringify(params.json, null, 2))
  request(params, function (err, res, body) {
    if(err) console.error(err)
    console.log('RESPONSE:', '[' + res.statusCode + ']')
    console.log(JSON.stringify(body, null, 2) || null)
    console.log()
    next(res, body)
  })
}

Test.prototype.request = function (opts, next) {
  opts.headers = this._headers
  opts.uri = this._rootAPI + opts.path
  this._req(opts, next)
}

Test.prototype.get = function (path, next) {
  this.request({ path:path }, next)
}

Test.prototype.post = function (path, data, next) {
  this.request({ method:'POST', path:path, json:data }, next)
}

Test.prototype.put = function (path, data, next) {
  this.request({ method:'PUT', path:path, json:data }, next)
}

Test.prototype.del = function (path, data, next) {
  this.request({ method:'DELETE', path:path, json:data }, next)
}

Test.prototype.cookie = function (name, res) {
  this._headers['Cookie'] = cookie
}

Test.prototype.bearer = function (token) {
  this._headers['Authorization'] = 'Bearer ' + token
}

Test.prototype.setHeader = function (key, val) {
  this._headers[key] = val
}
