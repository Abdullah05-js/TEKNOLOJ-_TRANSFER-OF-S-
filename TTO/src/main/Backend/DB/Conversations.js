import mongoose from "mongoose"

const ConversationSchema = mongoose.Schema(
    {
        Date:{
            type:String
        },
        Contract:{
            isContractSigned:Boolean,
            ContractType:String,
            startDate: String,
            endDate: String,
            Amount:{
                type:Number,
                default:0
            }
        },
        Teklif:{
            isTeklif:Boolean,
            startDate: String,
            endDate:String,
        },
        Academics: {
            isAcademicJoined:Boolean,
            AcademicNames:String,
        },
        isGelistirme:Boolean,
        isProtocolSigned:Boolean,
        CompanyNames:String,
        ConversationOwners:String,
        isArge:Boolean,
        ConversationDetails:String
    }
)


const Conversations=  mongoose.model("Conversations",ConversationSchema);

export default Conversations; 