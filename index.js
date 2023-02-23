

const express = require("express");
const app = express();
const PORT = 3000;
const bodyparser = require("body-parser");
app.use(bodyparser.json());

require("./model/index");
const userdata = require("./controller/index");


app.get("/", (req, res) => {
    res.send("server start for pratik");
})

app.post("/adduser", userdata.createuser)
app.get("/userbytoken", userdata.userbytoken)
app.get("/getoneuser/:id", userdata.getuserbyid)
app.get("/getalluser", userdata.getalluser)
app.delete("/deleteuser/:id", userdata.deleteuser)


app.listen(PORT, (error) => { console.log(`server start on localhost//:${PORT}`) })

