const express = require('express');
const path = require('path');
const app = express();
app.use(express.static('/dist/bank-frontend'));
app.get('/*', function(req,res) {
  res.sendFile(path.join(__dirname+
    '/dist/bank-frontend/index.html'));});
app.listen(process.env.PORT || 8080);