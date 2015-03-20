# [Teqlabs](http://teqlabs.com)

## Setup
```javascript
var Test = require('teqlabs-testify')
  , assert = require('assert')

var api = new Test('localhost', 8000)
```

## Functions

 Method        | Action
-------------  | -----------------------------------------------------------------------------------------------------------
`request()`    | [Request Wrapper](#request-wrapper)
`get()`        | [GET Request](#get-request)
`post()`       | [POST Request](https://bitbucket.org/hboylan/nomadicfitness-api#markdown-header-post-request)
`put()`        | [PUT Request](https://bitbucket.org/hboylan/nomadicfitness-api#markdown-header-put-request)
`del()`        | [DELETE Request](https://bitbucket.org/hboylan/nomadicfitness-api#markdown-header-delete-request)
`cookie(name)` | [Set Cookie](https://bitbucket.org/hboylan/nomadicfitness-api#markdown-header-set-cookie)

- - -

# Request Wrapper
```javascript
api.get('/users', function (res, users) {
  assert.equal(res.statusCode, 200)
  assert.equal(users[0].role, 'client')
  // etc...
})
```

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
GET /users
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
api.post('/user', { email:'bluehugh2@gmail.com', name:'Hugh Boylan', password:'password1' }, function (res, user) {
  assert.equal(res.statusCode, 200)
})
```
```javascript
POST /user
{
  "email": "bluehugh2@gmail.com",
  "name": "Hugh Boylan"
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
api.put('/user/532b95856006dd7f10000003', { color:"blue" }, function (res, user) {
  assert.equal(res.statusCode, 200)
  assert.equal(user.color, 'blue')
})
```
```javascript
PUT /user/532b95856006dd7f10000003
{
  "color": "blue"
}
RESPONSE: [200]
{
  "_id": "532b95856006dd7f10000003",
  "color": "blue",
  "email": "bluehugh2@gmail.com",
  "name": "Hugh Boylan",
  "role": "client"
}
```



# DELETE Request
```javascript
api.del('/user/532b95856006dd7f10000003', { password:'password1' }, function (res, body) {
  assert.equal(res.statusCode, 200)
  assert.equal(body, null)
})
```
```javascript
PUT /user/532b95856006dd7f10000003
{
  "color": "blue"
}
RESPONSE: [200]
{
  "_id": "532b95856006dd7f10000003",
  "color": "blue",
  "email": "bluehugh2@gmail.com",
  "name": "Hugh Boylan",
  "role": "client"
}
```

# Set Cookie
```javascript
api.post('/login', { email:'bluehugh2@gmail.com', password:'password1' }, function (res, user) {
  api.cookie('connect.sid', res)

  api.get('/auth', function (res, user) { // with expressjs, check req.session is valid
    assert.equal(res.statusCode, 200)
    assert.equal(user.email, 'bluehugh2@gmail.com')
  })
})
```
```javascript
POST /admin/login
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

GET /auth
{}
RESPONSE: [200]
{
  "_id": "532b95856006dd7f10000003",
  "email": "bluehugh2@gmail.com",
  "name": "Hugh Boylan",
  "role": "client"
}
```
