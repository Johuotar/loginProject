import mongoose from 'mongoose';

const User = mongoose.model('User', new mongoose.Schema({
    email: {type:String,unique:true},
    password: {type:String},

}));


export default User;



/*
const UserSchema = new mongoose.Schema({
    email: {type:String,unique:true},
    password: {type:String},
  });
  const User = mongoose.model('User', UserSchema);
*/