const mongoose = require('mongoose');
const url = "mongodb+srv://kivuos:ss123546@cluster0.vwqxl.mongodb.net/SIH?retryWrites=true&w=majority";

mongoose.connect(url, { useNewUrlParser: true })
const con = mongoose.connection

con.on('open', () => {
    console.log('connected')
})

module.exports = con