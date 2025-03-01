import React, { useState } from 'react';
import { WebsiteIcon } from '../assets/icons';
import Input from './Uİ/Input';
import { useEffect } from 'react';
import { Spinner } from '@heroui/react';
const Login = ({ setShow }) => {

    const [Data, setData] = useState({
        UserName: "",
        password: ""
    })
    const [isLoading,setisLoading] = useState(false)
    const [isDisabled, setisDisabled] = useState(true)
    const [ShowError, setShowError] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        setisLoading((e) => !e)
        const response = await window.electron.ipcRenderer.invoke("Auth", Data)

        if (response.success) {
            // Store user data in localStorage
            localStorage.setItem("userData",JSON.stringify({
                userId:response.user.id,
                username:response.user.username,
                isAdmin:response.user.isAdmin
            }))
            setisLoading((e) => !e)
            setShow(0)
        }
        else {
            setData({
                UserName: "",
                password: ""
            })
            setShowError(true)

            setTimeout(() => {
                setShowError(false)
            }, 1000);
        }

    }

    useEffect(() => {
        if (Data.UserName.length > 0 && Data.password.length > 0) {
            setisDisabled(false)
        }
        else 
            setisDisabled(true)


    }, [Data.password, Data.UserName]);


    return (
        <form className='w-screen h-screen flex flex-col justify-center items-center gap-6' onSubmit={handleSubmit}>

            <WebsiteIcon />

            <p className='bg-gradient-to-r from-green-100 to-green-400 text-4xl font-bold bg-clip-text text-transparent h-12'>Teknoloji Transfer Ofisi</p>

            <Input type={"text"} placeholder={"Kullancı Adı"} onchange={(e) => setData({ ...Data, UserName: e.target.value })} value={Data.UserName} />

            <Input type={"password"} placeholder={"Şifre"} onchange={(e) => setData({ ...Data, password: e.target.value })} value={Data.password} />

            {ShowError && <h1 className='text-xl bg-gradient-to-r from-red-300 to-red-700 font-bold  bg-clip-text text-transparent'>"Kullancı Adı veya Şifre Hattalı"</h1>}
            {isLoading && <Spinner size="lg" label='Yükleniyor...' className='!text-white' color='success'/>}
            <button type="submit" className={`mt-2  border-2 ${isDisabled ? "px-6 py-2 bg-red-500 text-black rounded-xl font-bold hover:bg-red-600 transition-colors" : "px-6 py-2 bg-green-300 text-black rounded-xl font-bold hover:bg-green-400 transition-colors"} p-3  cursor-pointer`} disabled={isDisabled} >Giriş</button>

            <p className='px-6 py-2  bg-gradient-to-r from-green-100 to-green-400   rounded-xl font-bold '>
            Powered by Abdullah Han && Selçuk Öz && Arif Can Güneş
            </p>
        </form>
    );
}

export default Login;
