var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var testSchema = new Schema({
    name: String
},{
    collection: 'test'
});

testModel = mongoose.model('Test', testSchema);

/*(
 *  find out the function
function BlogTest(test) {
    this.name = test.name;
};

BlogTest.prototype.save = function (callback) {
    var test = {
        name: this.name
    };

    var instance = new testModel(test);
    instance.save(function () {
        callback();
    });
}
BlogTest.get = function (config, callback) {
    testModel.find(config).exec(function (err, tests) {
        if (err) {
            return callback(err);
        }
        callback(tests);
    })
}

module.exports = BlogTest;
*/




