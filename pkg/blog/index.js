const mongoose = require("mongoose");


const Posts = mongoose.model(
    'posts',
    {
        user_id: String,
        title: String,
        photo: String,
        content: String,
        bestServed: String,
        type: String,
        time: Number,
        people: Number
    },
    "posts"
)

const getAll = async (user_id) => {
    return await Posts.find({user_id})
};

const getSignle = async (user_id, id)=> {
    return await Posts.findOne({user_id, _id: id});
};

const create = async (data) => {
    let p = new Posts(data);
    return await p.save();
};

const update = async (id, data) => {
    return Posts.updateOne({_id: id}, data);
}

const remove = async (id) => {
    return await Posts.deleteOne({_id: id});
};

module.exports = {
    getAll,
    getSignle,
    create,
    update,
    remove
}