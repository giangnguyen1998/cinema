import express from "express";
import bodyParser from "body-parser";
import connectDB from "./config/db";
import cors from "cors";
//import router
import UsersRoute from "./routes/users.route";
import MoviesRoute from "./routes/movies.route";
import AuthRoute from "./routes/auth.route";
//init express
const app = express();
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}));
// parse application/json
app.use(bodyParser.json());
//connect database
const connect = connectDB();
//enable cors
app.use(cors());

app.get("/", (req, res) => {
    res.json({msg: 'Welcome to the movie API...'})
});

//Define Routes
app.use("/api/users", UsersRoute);
app.use("/api/auth", AuthRoute);
app.use("/api/movies", MoviesRoute);

const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});