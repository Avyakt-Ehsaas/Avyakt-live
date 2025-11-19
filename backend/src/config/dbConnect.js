import mongoose from "mongoose";

const dbConnect = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log(`Database is connect :) `)
    } catch (error) {
        console.log(`Database is not connect :(`)
        console.log(error)
        process.exit(1)
    }
}
export default dbConnect;