var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var tagSchema = new Schema({
    name: String,
},{
    collection: 'tag'
});

tagModel = mongoose.model('Tag', tagSchema);
