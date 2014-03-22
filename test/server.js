var express = require('express')
  , MemStore = express.session.MemoryStore
  , api = express()
  
// Configure API environment
api.configure(function () {
  api.use(express.logger('dev'))
  api.use(express.bodyParser())
  api.use(express.cookieParser())
  api.use(express.methodOverride())
  api.use(express.session({
    store: new MemStore,
    secret: 'mysecret',
    cookie: {maxAge:7 * 24 * 60 * 60 * 1000} // one week
  }))
  api.use(api.router)
  api.use(function (req, res) {
    res.status(404).send('Invalid route')
  })
})

// Configure API routes
api.get('/', function (req, res) {
  req.cookies.test = 'testing123'
  res.send(true)
})

api.post('/', function (req, res) {
  res.send(true)
})

api.put('/', function (req, res) {
  res.send(true)
})

api.delete('/', function (req, res) {
  res.send(true)
})

// Serve API
require('http').createServer(api).listen(8000, function () {
  console.log('teqlabs-testify API running at http://localhost:8000')
  
  // Testify API
  var testify = require('../index.js')('localhost', 8000)
    , assert = require('assert')
  
  testify.get('/', function (err, data) {
    assert.equal(data, true)
    
    testify.put('/', function (err, data) {
      assert.equal(data, true)
      
      testify.post('/', function (err, data) {
        assert.equal(data, true)
        
        testify.del('/', function (err, data) {
          assert.equal(data, true)
          
          // kill test
          process.exit(0)
        })
      })
    })
  })
})
