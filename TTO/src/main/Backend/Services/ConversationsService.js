import Conversations from "../DB/Conversations";
import Users from "../DB/Users";
import { GetUsers } from "./UsersService";
export const GetConversations = async () => {
   try {
      return await Conversations.find().lean();
   } catch (error) {
      console.log("error from GetConversations", error);
      return []
   }
}

export const SearchConversations = async (query) => {
   try {
      return await Conversations.find(query).lean();
   } catch (error) {
      console.log("error from SearchConversations:", error);
      return []
   }
}


export const SetConversation = async (data) => {
   try {
      const newConversation = new Conversations(data)
      await newConversation.save()
      return true
   } catch (error) {
      console.log("error from SetConversation:", error);
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
      const AllUsers = await GetUsers();

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




