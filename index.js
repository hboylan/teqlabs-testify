var request = require('request')

function Test (host, port, secure) {
  this._rootAPI = secure? 'https://' : 'http://'
  this._rootAPI += host + ':' + (port || 80)
  this.headers = {
    'Content-Type': 'application/json'
  }
}

Test.prototype._req = function (method, path, data, next) {
  if(typeof data == 'function') {
    next = data
    data = {}
  }
  request({
    method: method,
    uri: this._rootAPI + path,
    json: data,
    headers: this._headers
  }, next)
}

Test.prototype.get = function (path, next) {
  this._req('GET', path, next)
}

Test.prototype.post = function (path, data, next) {
  this._req('POST', path, data, next)
}

Test.prototype.put = function (path, data, next) {
  this._req('PUT', path, data, next)
}

Test.prototype.del = function (path, data, next) {
  this._req('DELETE', path, data, next)
}

Test.prototype.auth = function (res) {
  res.headers['set-cookie'].filter(function(cookie) {
    if (!!~cookie.indexOf('connect.sid'))
      this.headers['Cookie'] = cookie
  })
}

module.exports = Test