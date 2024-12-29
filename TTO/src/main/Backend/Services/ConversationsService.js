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
    return await Conversations.find(query)
 } catch (error) {
    console.log("error from SearchUser:",error);
 }
}


export const SetConversation = async (data) => {
   try {
      const newConversation = new Conversations(data)
      await newConversation.save()

      return true
   } catch (error) {
      console.log("error from SearchUser:",error);
      return false
   }
  }




