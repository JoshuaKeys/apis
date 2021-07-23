const { connect } = require("mongoose")

const connectDB = async() => {
    const conn = await connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useFindAndModify: true,
        useCreateIndex: true,
        useUnifiedTopology: true
    })
    console.log(`MongoDB connected running on host ${conn.connection.host}`)
}

module.exports = connectDB;