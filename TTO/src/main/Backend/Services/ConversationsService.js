import Conversations from "../DB/Conversations";
import Users from "../DB/Users";
import { GetUsers } from "./UsersService";
export const GetConversations = async () => {
   try {
      return await Conversations.find().lean();
   } catch (error) {
      console.log("error from GetConversations ", error);
      return []
   }
}



export const SearchConversations = async (query) => {
   try {
      const page = query.page;
      delete query.page
      const List =  await Conversations.find(query)
      const end  = page*10;
      const start = end-10;
      return JSON.stringify(List.splice(start,end)) // i did this becouse i got som error the _id was coming as a buffer
   } catch (error) {
      console.log("error from SearchConversations: ", error);
      return []
   }
}

export const SetOneConversation = async (data,id) => {
try {
   await Conversations.findOneAndUpdate({
      _id:id
   },data)
   return true
} catch (error) {
   console.log("error from SetOneConversation: ",error)
   return false
}
}

export const GetOneConversation = async (id) => {
   try {
      const response = await Conversations.findOne({_id:id})
      if(response)
         return JSON.stringify(response);
      else
         return false
   } catch (error) {
      console.log("error from GetOneConversation: ",error)
      return  false  
   }
} 

export const SetConversation = async (data) => {
   try {
      const newConversation = new Conversations(data)
      await newConversation.save()
      return true
   } catch (error) {
      console.log("error from SetConversation: ", error);
      return false
   }
}

export const GetSelectors = async () => {
   const Data = {
      Akademiks: [],
      Companies: [],
      DealType: [],
      Users: [],
      Sektor: [],
   }
   try {

      const AllData = await GetConversations();
      const response = await GetUsers();
      const AllUsers = JSON.parse(response);

      AllData.forEach(e => {
         Data.Akademiks.push(e.AcademicName)
         Data.Companies.push(e.CompanyNames)
         Data.DealType.push(e.ContractType)
         Data.Sektor.push(e.Sector)
      });

      AllUsers.forEach(e => {
         Data.Users.push(e.UserName)
      });

      console.log("fetched everything successfully");
      return Data

   } catch (error) {
      console.log("error from SearchUser:", error);
      return Data
   }
}




