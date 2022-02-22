const express = require('express')

const app = express()
app.use(express.json())


//database
const db = require('./conn/conn')

//routes
const dic = require('./routes/dic.js')
const auth_users = require('./routes/users')

app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

//link_parent
app.use('/help', dic)
app.use('/user', auth_users)
app.listen(process.env.PORT || 8000)