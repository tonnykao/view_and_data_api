var mongoose = require('mongoose');

var userSchema = mongoose.Schema( {
    clientId: String,
    token: String
});

var model = mongoose.model('User', userSchema);
model.saveOrCreaateUser = function(clientId, user){
    model.findOne({clientId: clientId}, function(err, row){
        if(row){
            row.token = user.token;
        } else {
            row = new User(user);
            row.clientId = clientId;
            row.token = user.token;
        }
        row.save(function(err){
            if(err){
                console.log('save user token failure!!');
            }
        });
    });
}        

module.exports = mongoose.model('User', userSchema);
