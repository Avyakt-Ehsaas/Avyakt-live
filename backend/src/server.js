import 'dotenv/config'
import dbConnect from './config/dbConnect.js'
import app from './app.js'

const PORT = process.env.PORT || 3000

dbConnect();

const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

export default server
