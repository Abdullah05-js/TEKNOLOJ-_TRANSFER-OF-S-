import mongoose from "mongoose"

const UsersSchema = mongoose.Schema(
    {
        
        UserName:{
            type:String,
            required:true
        },
        PassWord:{
            type:String,
            required:true
        },
        isAdmin:{
            type:Boolean,
            required:true
        }
    }
)


const Users = mongoose.model("Users",UsersSchema);

export default Users; 