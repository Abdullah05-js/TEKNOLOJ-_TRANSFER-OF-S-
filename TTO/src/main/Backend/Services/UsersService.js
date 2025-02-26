import Users from "../DB/Users";


export const GetUsers = async () => {
   try {
      return await Users.find();
   } catch (error) {
      console.log("error from GetUsers:", error);
   }
}

export const SearchUser = async (user) => {
   try {
      return await Users.findOne({
         UserName: user
      })
   } catch (error) {
      console.log("error from SearchUser:", error);
   }
}


export const AuthUser = async (user) => {
   try {
      const foundUser = await Users.findOne({
         UserName: user.UserName,
      });

      if (!foundUser || foundUser.PassWord !== user.password) {
         return { success: false };
      }

      return {
         success: true,
         user: {
            id: foundUser._id.toString(),
            username: foundUser.UserName,
            isAdmin:foundUser.isAdmin
         }
      };

   } catch (error) {
      console.log("error from AuthUser:", error);
      return { success: false };
   }
}


export const CreateAcccount = async (user) => {
   try {
         console.log(user);
         const NewUser = new Users({
            UserName: user.UserName,
            PassWord: user.PassWord,
            isAdmin:false
         })

         await NewUser.save();

      return true;

   } catch (error) {
      console.log("error from  createAccount:", error);
      return false
   }
}