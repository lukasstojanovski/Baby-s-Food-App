const config = require("../../pkg/config")
require('../../pkg/db')

const express = require('express')
const post = require("./handlers/post")

const api = express()

api.use(express.json());

api.get("/api/v1/blog", post.getAll);
api.get("/api/v1/blog/:id", post.getSingle);
api.post("/api/v1/blog", post.create);
api.put("api/v1/blog/:id", post.update);
api.patch("api/v1/blog/:id", post.updatePartial);
api.delete("/api/v1/blog/:id", post.remove);

api.listen(config.get("services").blog.port, err => {
    if(err) return console.log(err);
    console.log(`Server started on port ${config.get("services").blog.port}`)
})