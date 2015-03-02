var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var topicSchema = new Schema({
    name: String,
},{
    collection: 'topic'
});

topicModel = mongoose.model('Topic', topicSchema);
