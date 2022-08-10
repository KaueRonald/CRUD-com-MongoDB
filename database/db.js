const mongoose = require('mongoose')

const connectToDb = () => {
    mongoose.connect(`${process.env.DATABASE_NAME}//${process.env.MONGO_HOST}/${process.env.MONGO_DATABASE}`)
}

module.exports = connectToDb;