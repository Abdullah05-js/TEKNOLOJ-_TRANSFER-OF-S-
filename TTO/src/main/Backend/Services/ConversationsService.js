import Conversations from "../DB/Conversations";


export const GetConversations = async () => {
    try {
        return await Conversations.find();
     } catch (error) {
        console.log("error from SearchUser:",error);
     }
}

export const SearchConversations = async (query) => {
 try {
    return await Conversations.findOne(query)
 } catch (error) {
    console.log("error from SearchUser:",error);
 }
}


