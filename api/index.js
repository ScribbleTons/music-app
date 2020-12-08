const express = require("express");
const PORT = process.env.PORT || 4000;
const morgan = require("morgan");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./config/db");
const app = express();
const path = require("path")


//configure database and mongoose
mongoose.set("useCreateIndex", true);
mongoose
    .connect(config.database, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log("Database is connected");
    })
    .catch(err => {
        console.log({
            database_error: err
        });
    });


// db configuaration ends here
//registering cors
app.use(cors());
//configure body parser
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
//configure body-parser ends here
app.use(morgan("dev")); // configure morgan

app.use("/uploads", express.static(path.join(__dirname, '../uploads'))); //static files
// console.log(path.join(__dirname, '../uploads'))


const musicRoutes = require("./routes/music"); //bring in our user routes
app.use("/music", musicRoutes);

//export express app
module.exports = app;

// define first route
app.get("/", (req, res) => {
    res.json("Welcome to this music app");
});
if(require.main === module) {
    const port = process.env.PORT || 3001
    app.listen(port, () => {
        console.log(`API server listening on port http://localhost${port}`)
    })
}