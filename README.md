## Setup
```javascript
var Test = require('teqlabs-testify')
  , assert = require('assert')

// host, port, and https options
var api = new Test('localhost', 8000, true)
```

## Methods

 Method                       | Action
----------------------------  | -----------------------------------------------------------------------------------------------------------
`api.get(path, next)`         | [GET Request](#get-request)
`api.post(path, json, next)`  | [POST Request](#post-request)
`api.put(path, json, next)`   | [PUT Request](#put-request)
`api.del(path, json, next)`   | [DELETE Request](#delete-request)
`api.bearer(token)`           | [Set Bearer](#set-bearer)
`api.header(key, val)`        | [Set Header](#set-header)


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
  "role": "client"
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

# Set Bearer
See [passport-http-bearer](https://www.npmjs.com/package/passport-http-bearer)
```javascript
api.bearer('youshallnotpass')
```

# Set Header
Add a header for future requests
```javascript
api.header('X-Auth', 'therecanonlybeone')
```
