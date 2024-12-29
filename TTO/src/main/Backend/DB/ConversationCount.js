import mongoose from "mongoose"

const ConversationCountSchema = mongoose.Schema(
    {
        
        CompanyName:{
            type:String,
            required:true
        },
        Conversations:{
            type:Number,
            required:true
        }
    }
)


const ConversationCounts = mongoose.model("ConversationCounts",ConversationCountSchema);

export default ConversationCounts; 