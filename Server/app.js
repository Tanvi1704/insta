const express = require('express');
const app = express()
// const port = 5000;
const port=process.env.port || 5000;
const mongoose = require("mongoose");
const { mongoUrl }  = require("./keys");
const cors = require("cors");
const bodyParser = require( "body-parser");

// app.use(bodyParser.json({limit:"30mb",extended:true}));
// app.use(bodyParser.urlencoded({limit:"30mb",extended:true}));
// app.use(cors());

app.use(cors())
require('./models/model')
require('./models/post')
app.use(express.json())
app.use(require("./routes/auth"))
app.use(require("./routes/createPost"))
app.unsubscribe(require("./routes/user"))
mongoose.connect(mongoUrl);

// mongoose.set("strictQuery", false);
// mongoose.connect( "mongodb+srv://instagram:instagram@cluster0.nntcshj.mongodb.net/?retryWrites=true&w=majority" , 
//     { useNewUrlParser:true,useUnifiedTopology: true}
//     )
//     .then(()=> app.listen(port,()=> console.log(`Server Running on port:${port}  
// successfully connected to mongo` ) ))
//     .catch((error)=>console.log(error.message));

mongoose.connection.on("connected", () => {
    console.log("successfully connected to mongo")
})

mongoose.connection.on("error", () => {
    console.log("not connected to mongodb")
})


app.listen(port, () => {
    console.log("server is running on port" + " " + port)

})