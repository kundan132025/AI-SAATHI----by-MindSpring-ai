import express from "express";
import dotenv from "dotenv";
import chatRoutes from "./Backend/routes/chat.js";

dotenv.config();
const app = express();
app.use(express.json());

app.use("/api", chatRoutes);
app.get('/' , (req,res)=>{
    res.send("Server is working");
});

console.log("Env key test:", process.env.GEMINI_API_KEY);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
