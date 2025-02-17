import mongoose from "mongoose"

const ConversationSchema = mongoose.Schema(
    {
        Date:{
            type:String
        },
        CompanyNames:{
            type:String
        },
        Sector:{
            type:String
        },
        ConversationOwner:{
            type:String
        },
        isAcademicJoined:{
            type:Boolean
        },
        AcademicName:{
            type:String
        },
        isProtocolSigned:{
            type:Boolean
        },
        isContractSigned:{
            type:Boolean
        },
        ContractType:{
            type:String
        },
        isArge:{
            type:Boolean
        },
        isArgeBackStatus:{
            type:Boolean
        },
        isSurdurulebilirlik:{
            type:Boolean
        },
        ACCOUNT:{
            type:String
        }
    }
)


const Conversations=  mongoose.model("Conversations",ConversationSchema);

export default Conversations; 