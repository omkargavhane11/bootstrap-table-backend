import express from 'express';
import mongoose from 'mongoose';
import dotenv from "dotenv";
import cors from "cors";
// importing routes
import companyRoute from "./routes/companyRoute.js";


dotenv.config(); // getting access to files in ".env" folder
const app = express();
const PORT = process.env.PORT;


// connecting to mongoDB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => console.log("mongodb connected ✅"));


// middlewares
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


app.get("/", (req, res) => {
    res.send("Hello World !")
})

// routes
app.use("/company", companyRoute);



app.listen(PORT, () => console.log(`Server started at port ${PORT} 🚀`));