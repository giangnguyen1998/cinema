const express = require("express");
const connectDB = require("./config/db");
const proxy = require("http-proxy-middleware");
const cors = require("cors");

const app = express();

//Init Middleware
app.use(express.json({extended: false}));
//connect database
connectDB();

//enable cors
app.use(cors());

app.get("/", (req, res) => {
    res.json({msg: 'Welcome to the movie API...'})
});

//Define Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/contacts", require("./routes/contacts"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});