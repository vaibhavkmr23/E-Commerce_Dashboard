const express = require("express");
const app = express();
const cors = require("cors");

require("./Db/db.config");

const User = require("./Db/User");
const Product = require("./Db/Product")

app.use(express.json());// to capture json object from request body
app.use(cors());

app.post("/register", async (req, res) => {
    let user = new User(req.body);
    let result = await user.save();
    result = result.toObject();
    delete result.password
    res.send(result);
})

app.post("/login", async (req, res) => {
    console.log(req.body)
    if (req.body.password && req.body.email) {
        let user = await User.findOne(req.body).select("-password");
        if (user) {
            res.send(user)
        }
        else {
            res.send({ result: "No User Found" })
        }
    }
    else {
        res.send({ result: "Enter both Details" })
    }
})

app.post("/add-product", async (req, res) =>{
    let product = new Product(req.body);
    let result = await product.save();
    res.send(result)
})

app.listen(5000)