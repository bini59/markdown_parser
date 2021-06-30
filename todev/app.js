const express = require("express");

let app = express();

app.use(express.static('../'));

app.get('/', (req, res)=>{
    res.sendFile("./index.html")
});

app.listen(3000, ()=>{
    console.log("listen at 3000!!");
})