const posts = require("../../../pkg/blog");
const {Post, PostPartial, validate} = require("../../../pkg/blog/validation")

const getAll = async (req, res) => {
    try{
        let ps = await posts.getAll(req.user_id);
        return res.send(ps)
    }catch(err) {
        console.log(err);
        return res.status(500).send("Internal sever error")
    }
};

const getSingle = async (req, res) => {
    try{
        let ps = await posts.getSignle(req.user_id, req.params.id);
        if(!ps) {
            throw{
                code: 404,
                error: "Post not found"
            }
        }
        return res.send(ps)
    }catch(err){
        console.log(err)
        return res.status(err.code).send(err.error)
    }
}

const create = async (req, res) => {
    try{
        await validate(req.body, Post);
        let data = {
            ...req.body,
            user_id: req.user_id
        };
        let ps = await posts.create(data);
        return res.status(201).send(ps);
    }catch (err) {
        console.log(err);
        return res.status(err.code).send(err.error)
    }
};
const update = async (req, res) => {
    try{
        await validate(req.body, Post);
        let data = {
            ...req.body,
            user_id: req.user.id
        };
        await posts.update(req.params.id, data);
        return res.status(204).send("")
    }catch (err) {
        console.log(err)
        return res.status(err.code).send(err.error)
    }
};

const updatePartial = async (req, res) => {
    try{
        await validate(req.body, PostPartial);
        let data = {
            ...req.body,
            user_id: req.user_id
        };
        await posts.update(req.params.id, data);
        return res.status(204).send('')
    }catch(err){
        console.log(err);
        return res.status(err.code).send(err.error);
    }
}

const remove = async (req, res) => {
    try{
        await posts.remove(req.params.id);
        return res.status(204).send("post deleted succesfuly");
    }catch(err) {
        console.log(err);
        return res.status(err.code).send(err.error)
    }
}

module.exports = {
    getAll,
    getSingle,
    create,
    update,
    updatePartial,
    remove
}

