const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userName: { type: String, require: [true, 'this field is necessary'] },
    email: { type: String, unique: true, require: [true, 'this field is necessary'] },
    password: { type: String },
    date: { type: Date, default: Date.now() }
}) 

userSchema.methods.encryptPassword = async (password) => {
    const Salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, Salt)
}
userSchema.methods.validatePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}
module.exports = mongoose.model('user', userSchema);