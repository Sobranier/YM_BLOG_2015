var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var topicSchema = new Schema({
    name: String,
    title: String,
    content: Array,
    background: String
},{
    collection: 'topic'
});

topicModel = mongoose.model('Topic', topicSchema);
