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

export const DeleteUser = async (user) => {
   try {
      return await Users.findByIdAndDelete(user._id)
   } catch (error) {
      console.log("error from DeleteUser");
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

export const UpdatePassword= async (id,newPassWord)=> {
   try {
      await Users.findOneAndUpdate({
         _id:id
      },{
         PassWord:newPassWord
      })
      return true
   } catch (error) {
      console.log("error from UpdateAccount: ",error);
      return false
   }
}

export const CreateAcccount = async (user) => {
   try {
         console.log(user);
         const NewUser = new Users({
            UserName: user.UserName,
            PassWord: user.PassWord,
            isAdmin:user.isAdmin
         })

         await NewUser.save();

      return true;

   } catch (error) {
      console.log("error from  createAccount:", error);
      return false
   }
}