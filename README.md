## Setup
```javascript
var Test = require('teqlabs-testify')
  , assert = require('assert')

var api = new Test({
  host: 'http://localhost:8000'   // api host
  print: false,                   // print request/response messages
  headers: {},                    // headers to send with every request
  params: {},                     // params to send with every request
  done: function(body){}          // called before every request callback
})
```

## Methods

 Method                       | Action
----------------------------  | -----------------------------------------------------------------------------------------------------------
`api.get(path, next)`         | [GET Request](#get-request)
`api.post(path, json, next)`  | [POST Request](#post-request)
`api.put(path, json, next)`   | [PUT Request](#put-request)
`api.del(path, json, next)`   | [DELETE Request](#delete-request)
`api.param(key, val)`         | [Set Param](#set-param)
`api.header(key, val)`        | [Set Header](#set-header)
`api.bearer(token)`           | [Set Bearer](#set-bearer)


- - -

# GET Request
```javascript
api.get('/users', function (res, users) {
  assert.equal(res.statusCode, 200)
  assert.equal(users[0].role, 'client')
  // etc...
})
```
```javascript
GET https://localhost:8000/users
{}
RESPONSE: [200]
[
  {
    "_id": "532b95856006dd7f10000003",
    "email": "bluehugh2@gmail.com",
    "name": "Hugh Boylan",
    "role": "client"
  }
]
```


# POST Request
```javascript
api.post('/users/auth', { email:'bluehugh2@gmail.com', password:'password1' }, function (res, user) {
  assert.equal(res.statusCode, 200)
})
```
```javascript
POST https://localhost:8000/users/auth
{
  "email": "bluehugh2@gmail.com",
  "password": "password1"
}
RESPONSE: [200]
{
  "_id": "532b95856006dd7f10000003",
  "email": "bluehugh2@gmail.com",
  "name": "Hugh Boylan",
  "role": "client",
  "token": "youshallnotpass"
}
```


# PUT Request
```javascript
api.put('/users', { name:"hjboylan" }, function (res, user) {
  assert.equal(res.statusCode, 200)
  assert.equal(user.name, "hjboylan")
})
```
```javascript
PUT https://localhost:8000/users
{
  "name": "hjboylan"
}
RESPONSE: [200]
{
  "_id": "532b95856006dd7f10000003",
  "email": "bluehugh2@gmail.com",
  "name": "hjboylan",
  "role": "client"
}
```


# DELETE Request
```javascript
api.del('/users', { name:'hjboylan', password:"password1" }, function (res, body) {
  assert.equal(res.statusCode, 200)
  assert.equal(body, null)
})
```
```javascript
DELETE https://localhost:8000/users
{
  "name": "hjboylan",
  "password": "password1"
}
RESPONSE: [200]
{
  "_id": "532b95856006dd7f10000003",
  "email": "bluehugh2@gmail.com",
  "name": "hjboylan",
  "role": "client"
}
```


# Set Param
Add a param to all future requests
(npm-request)[https://www.npmjs.com/package/request#requestoptions-callback]
```javascript
api.param('json', false)
api.param('timeout', 1000)
```


# Set Header
Add a header to all future requests
```javascript
api.header('X-Auth', 'therecanonlybeone')
```


# Set Bearer
Convenience method for ```api.header('X-Authorization', 'Bearer: youshallnotpass')```. Add a feature request on GitHub for more functions like this to simplify your tests.
[passport-http-bearer](https://www.npmjs.com/package/passport-http-bearer)
```javascript
api.bearer('youshallnotpass')
```


## Example App
Look for ```teqlabs-testify-example``` coming soon
