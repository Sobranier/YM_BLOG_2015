var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var blogSchema = new Schema({
    title: String,
    date: {type: Date},
    content: String,
    summary: String,
    alias: String,
    topics: Array,
    tags: Array,
    ifpublic: Boolean,
    ifsafe: Boolean,
},{
    collection: 'blog'
});

blogModel = mongoose.model('Blog', blogSchema);
