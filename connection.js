// const mongoose = require('mongoose');

// async function connectMongoDB(url){
    
//     return mongoose.connect(url)
//     .then(()=>{console.log('MongoDB connection established')})
//     .catch((err)=>{console.log('MongoDb connection failed, Error->', err)})
// }

// module.exports = {
//     connectMongoDB,
// }

// connection.js
const mongoose = require('mongoose');

const connectMongoDB = async (url) => {
    try {
        await mongoose.connect(url, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        });
        console.log('✅ MongoDB connection established');
    } catch (error) {
        console.error('❌ MongoDB connection failed:', error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectMongoDB;
