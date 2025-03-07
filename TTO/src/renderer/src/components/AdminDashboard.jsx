import React, { useState } from 'react'
import SignUp from './Uİ/SignUp';
import AllUsers from './AllUsers';
import AdminDataFilter from './AdminDataFilter';

const AdminDashboard = () => {
    const [subPage, setSubPage] = useState("signUpUser"); // Varsayılan alt sayfa

    return (
        <div className='flex flex-col items-center pt-10 w-screen h-screen'>
            <div className='text-white items-center w-[60%]'>
                <h1 className='text-center mb-8 text-3xl'>Admin Paneli</h1>
                <nav className='flex border-2 border-white'>
                    <button className={`${subPage == 'signUpUser' ? 'bg-white text-black' : '' } w-1/3 py-1`} onClick={() => setSubPage("signUpUser")}>Kullanıcı Ekle</button>
                    <button className={`${subPage == 'users' ? 'bg-white text-black' : '' } w-1/3 py-1`} onClick={() => setSubPage("users")}>Kullanıcılar</button>
                    <button className={`${subPage == 'allDatas' ? 'bg-white text-black' : '' } w-1/3 py-1`} onClick={() => setSubPage("allDatas")}>Bütün İşlemler</button>
                </nav>
            </div>
            
            {subPage === "signUpUser" && <SignUp />}
            <div className="w-[90%] mt-8">
                {subPage === 'users' && <AllUsers/>}
            </div>
            {subPage === 'allDatas' && <AdminDataFilter/>}
        </div>
    );
}

export default AdminDashboard