const express = require("express");
const cors = require('cors')
const PORT = 8000 || process.env.PORT


const app = express();

app.use(express.json());
app.use(
    express.urlencoded({
        extended: true,
    })
);


app.use(cors({
    // origin: "http://localhost:3000",
    // origin: "https://661aec5f0db875d908ab845b--dribblevivek.netlify.app",
    origin: " https://dribblevivek.netlify.app",
    credentials: true,
}));


app.use("/api/user", require("./Routes/userRoutes"));

app.listen(PORT, (req, res) => {
    console.log(`Server has been started at ${PORT}`);
})
