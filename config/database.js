const mongoose = require('mongoose');
const {MONGO_URL} = process.env;

exports.connect = (req,res) => {
    mongoose.connect(MONGO_URL).then(
        console.log(`DB connected`)
    ).catch((err)=>{
        console.log(err);
        process.exit(1);
    })
}

