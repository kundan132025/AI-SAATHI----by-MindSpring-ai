import express from "express";
import dotenv from "dotenv";
import chatRoutes from "./Backend/routes/chat.js";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/chat", chatRoutes);
app.get('/' , (req,res)=>{
    res.send("Server is working");
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
