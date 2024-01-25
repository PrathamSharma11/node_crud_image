const mongoose = require('mongoose')






const  connectDB=()=>{
    return mongoose.connect('mongodb://127.0.0.1:27017/curd')


    .then(()=>{
        console.log('connection successfull')

    })
    .catch((err)=>{
        console.log(err)

    })
}
module.exports = connectDB