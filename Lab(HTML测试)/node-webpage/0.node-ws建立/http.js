const express = require('express'),
         open = require('open'),
         path = require('path')
const app = express()

const port = 8888

app.listen(port, () => {
  console.log(`App listening at ${port}`)
  open(`http://localhost:${port}`)
})