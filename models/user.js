import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : String,
    lastName: String,
    birthDate: String,
    gender: String,
    cellPhone: String,
    email: String,
    passwordHash: String,
})

const UserModel = mongoose.model('User' , userSchema);

export default UserModel;
