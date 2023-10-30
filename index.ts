import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { books } from "./src/modules/book_module";


export const app = express();

// parsing the request data
app.use(express.json());
app.use(cors());

const PORT = 4000;
const MONGO_URL = "mongodb://0.0.0.0:27017/Book_management"

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


// connection to DataBase

mongoose.set('strictQuery', false);
mongoose.connect(MONGO_URL).then(()=>{
  console.log("\n*************MONGODB connected**************\n");
}).catch(error =>{
  console.log("unable to connect with database:", error);
});
 
// App testing
app.get('/ping', (req,res)=>{
  res.status(200).json({
      status: true,
      message : "App is working",
  })
});

// router 

app.use("/book", books);


