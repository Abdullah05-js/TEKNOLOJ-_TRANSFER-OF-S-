import Conversations from "../DB/Conversations";
import Users from "../DB/Users";
import { GetUsers } from "./UsersService";
import Filter from "../DB/Filter.js"
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
      let List = await Conversations.find()

      Object.keys(query).forEach((e) => {
         if (e === "Date") {
            List = List.filter((a) => a.Date === query[e])
         } else if (e === "Contract") {


            List = List.filter((a) => a.Contract.isContractSigned === query[e].isContractSigned)
             
            if (query[e].ContractType) {
               List = List.filter((a) =>{
                  return  a.Contract.ContractType.includes(query.Contract.ContractType)
               })
            }

            if (query[e].startDate && query[e].endDate) {
               List = List.filter((a) => (new Date(a.Contract.startDate)).getTime() >= (new Date(query[e].startDate)).getTime() && (new Date(a.Contract.endDate)).getTime() <= (new Date(query[e].endDate)).getTime())
            }
            else if (query[e].startDate) {
               List = List.filter((a) => (new Date(a.Contract.startDate)).getTime() >= (new Date(query[e].startDate)).getTime())
            }
            else if (query[e].endDate) {
               List = List.filter((a) => (new Date(a.Contract.endDate)).getTime() <= (new Date(query[e].endDate)).getTime())
            }

            if (query[e].Amount) {
               List = List.filter((a) => a.Contract.Amount === query[e].Amount)
            }
         } else if (e === "Teklif") {
            List = List.filter((a) => a.Teklif.isTeklif === query[e].isTeklif)
            if (query[e].startDate && query[e].endDate) {
               List = List.filter((a) => (new Date(a.Teklif.startDate)).getTime() >= (new Date(query[e].startDate)).getTime() && (new Date(a.Teklif.endDate)).getTime() <= (new Date(query[e].endDate)).getTime())
            }
            else if (query[e].startDate) {
               List = List.filter((a) => (new Date(a.Teklif.startDate)).getTime() >= (new Date(query[e].startDate)).getTime())
            }
            else if (query[e].endDate) {
               List = List.filter((a) => (new Date(a.Teklif.endDate)).getTime() <= (new Date(query[e].endDate)).getTime())
            }
         }
         else if (e === "Academics") {
            List = List.filter((a) => a.Academics.isAcademicJoined)
            if (query[e].AcademicNames) {
               console.log("am in 32 ");
               List = List.filter((a) => a.Academics.AcademicNames.includes(query[e].AcademicNames))
            }
         } else if (e === "isGelistirme" || e === "isProtocolSigned" || e === "isArge") {
            List = List.filter((a) => a[e])
         }
         else if (e === "CompanyNames") {
            List = List.filter((a) => a.CompanyNames === query[e])
         }
         else if (e === "ConversationOwners") {
            // in the conversation there may 2 or more people join so we need to filter like this for better output because they may want see the 2 Owners in the same time 
            const ConversationOwnersList = query[e].split(",")
            console.log(ConversationOwnersList);
            ConversationOwnersList.forEach((element) => {
               List = List.filter((a) => a.ConversationOwners.includes(element))
            });
         }
      })

      const end = page * 15;
      const start = end - 15;
      return JSON.stringify({ List: [...List].splice(start, end), TotalPages: Math.ceil(List.length / 15) === 0 ? 1 : Math.ceil(List.length / 15) , AllList:[...List]}) // i did this becouse i got som error the _id was coming as a buffer
   } catch (error) {
      console.log("error from SearchConversations: ", error);
      return []
   }
}

export const SetOneConversation = async (data, id) => {
   try {
      await Conversations.findOneAndUpdate({
         _id: id
      }, data)
      return true
   } catch (error) {
      console.log("error from SetOneConversation: ", error)
      return false
   }
}

export const GetOneConversation = async (id) => {
   try {
      const response = await Conversations.findOne({ _id: id })
      if (response)
         return JSON.stringify(response);
      else
         return false
   } catch (error) {
      console.log("error from GetOneConversation: ", error)
      return false
   }
}

export const SetConversation = async (data) => {
   try {
      console.log(data);
      const newConversation = new Conversations(data)
      await newConversation.save()
      const newData = newConversation.Academics.AcademicNames.split(",")
      const filter = await Filter.find({})
      for (const e of newData) {
         if (!filter[0].AcademicNames.includes(e)) {
            await Filter.findOneAndUpdate({ _id: filter[0]._id }, {
               $push: {
                  AcademicNames: e
               }
            })
         }
      }
      if (!filter[0].CompanyNames.includes(newConversation.CompanyNames)) {
         await Filter.findOneAndUpdate({ _id: filter[0]._id }, {
            $push: {
               CompanyNames: newConversation.CompanyNames
            }
         })
      }
      if (newConversation.Contract.isContractSigned && !filter[0].ContractType.includes(newConversation.Contract.ContractType)) {
         await Filter.findOneAndUpdate({ _id: filter[0]._id }, {
            $push: {
               ContractType: newConversation.Contract.ContractType
            }
         })
      }
      return true
   } catch (error) {
      console.log("error from SetConversation: ", error);
      return false
   }
}


export const getAllComponeyNamesAndAcademics = async () => {
   try {
      const filter = (await Filter.find({}))[0]
      console.log(filter);
      return JSON.stringify({
         CompanyNames: filter.CompanyNames,
         Academics: filter.AcademicNames,
         ContractType: filter.ContractType
      })
   } catch (error) {
      console.log("error from getAllComponeyNamesAndAcademics: ", error);
      return JSON.stringify({
         CompanyNames: [],
         Academics: [],
         ContractType: []
      })
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




