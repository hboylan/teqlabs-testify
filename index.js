var request = require('request');

function Test (opts) {
  this._params = opts.params || {};
  this._headers = opts.headers || {};
  this._host = opts.host || 'http://localhost:8000';
  this._done = opts.done || function(body){};
  this._print = opts.print;
  if(opts.host.indexOf('https') > -1){

    // test self-signed certificate
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
    this._params.rejectUnhauthorized = false;
  }
  _log('Testing: ' + this._host, '\n');
}
function _log (data) {
  if(this._print) console.info(data);
}
module.exports = Test;

Test.prototype._req = function (opts, next) {
  var done = this._done;
  opts.uri = this._host + opts.path;
  opts.json = this._params.json || true;
  opts.headers = this._headers;
  opts.method = opts.method ? opts.method : 'GET';
  for(p in this._params)
    opts[p] = this._params[p];

  _log(opts.method.toUpperCase(), opts.uri);           // GET http://localhost:8000/
  _log(JSON.stringify(opts.body, null, 2));            // { username: 'hjboylan' }
  request(opts, function (err, res, body) {
    if(err) {
      _log(err);
    }
    _log('RESPONSE:', '[' + res.statusCode + ']');      // RESPONSE: [200]
    _log(JSON.stringify(body, null, 2) || null, '\n');  // { message: 'you win!' }
    done(body);
    next(res, body);
  })
}

Test.prototype.get = function (path, next) {
  this._req({ path:path }, next);
}

Test.prototype.post = function (path, json, next) {
  this._req({ method:'POST', path:path, body:json }, next);
}

Test.prototype.put = function (path, json, next) {
  this._req({ method:'PUT', path:path, body:json }, next);
}

Test.prototype.del = function (path, json, next) {
  this._req({ method:'DELETE', path:path, body:json }, next);
}

Test.prototype.param = function (key, val) {
  this._params[key] = val;
}

Test.prototype.header = function (key, val) {
  this._headers[key] = val;
}

Test.prototype.bearer = function (token) {
  this._headers['Authorization'] = 'Bearer ' + token;
}
