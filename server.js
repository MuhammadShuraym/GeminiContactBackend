const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const ContactRoutes = require("./routes/ContactRoutes");

// Load env variables
dotenv.config();

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());



// MongoDB Connection
// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGO_URL, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log(`✅ MongoDB connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error(`❌ MongoDB connection error: ${error.message}`);
//     process.exit(1);
//   }
// };

let isConnected = false;

async function connectToMongoDB(){
    try {
        await mongoose.connect(process.env.MONGO_URL,{
            useNewUrlParser: true,
       useUnifiedTopology: true,
        });
        isConnected = true;
        console.log("Connected To MongoDb")
    } catch (error) {
        console.error("Error Connecting to MongoDB:", error)
    }
}

app.use((req,res,next)=>{
    if(!isConnected){
        connectToMongoDB()
    }
    next()
})
// Routes
app.use("/api/contact", ContactRoutes);



// Start server
// const PORT = process.env.PORT || 3001;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });

module.exports = app;