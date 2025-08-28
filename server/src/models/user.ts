import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

interface IUser extends Document {
    username : string;
    email : string;
    password : string;
    matchPassword: (enteredPassword: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser>({
    username : {
        type: String,
        require: true,
    },
    email : {
        type: String,
        require : true,
        unique: true,
    },
    password : {
        type : String,
        require : true,
    }
});

userSchema.pre("save", async function(next) {
    if (!this.isModified("password")){
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt); 
});

userSchema.methods.matchPassword = async function(enteredPassword: string){
    return await bcrypt.compare(enteredPassword, this.password);
}

export const User = mongoose.model<IUser>("User",userSchema);