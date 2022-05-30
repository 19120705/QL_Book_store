const mongoose =require('mongoose');

async function connect(){
    try {
        await mongoose.connect('mongodb://localhost:27017/web_education_dev');
        console.log('Connect DB successfully!!!');
    } catch (error) {
        console.log('Connect DB failure!!!mongodb://localhost:27017/web_education_dev');
    }

}

module.exports={connect};