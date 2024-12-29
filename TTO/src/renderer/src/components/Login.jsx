import React, { useState } from 'react';
import { WebsiteIcon } from '../assets/icons';
import Input from './Uİ/Input';
import { useEffect } from 'react';
const Login = ({ setShow }) => {

    const [Data, setData] = useState({
        UserName: "",
        password: ""
    })

    const [isDisabled, setisDisabled] = useState(true)
    const [ShowError, setShowError] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();

        const status = await window.electron.ipcRenderer.invoke("Auth", Data)

        if(status)
        {
            setShow(0)
        }
        else
        {
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


    }, [Data.password, Data.UserName]);


    return (
        <form className='w-screen h-screen flex flex-col justify-center items-center gap-6' onSubmit={handleSubmit}>

            <WebsiteIcon />

            <p className='bg-gradient-to-r from-green-100 to-green-400 text-4xl font-bold bg-clip-text text-transparent h-12'>Teknoloji Transfer Ofisi</p>

            <Input type={"text"} placeholder={"Kullancı Adı"} onchange={(e) => setData({ ...Data, UserName: e.target.value })} value={Data.UserName} />

            <Input type={"password"} placeholder={"Şifre"} onchange={(e) => setData({ ...Data, password: e.target.value })} value={Data.password} />

           {ShowError &&  <h1 className='text-xl bg-gradient-to-r from-red-300 to-red-700 font-bold  bg-clip-text text-transparent'>"Kullancı Adı veya Şifre Hattalı"</h1>}

            <button type="submit" className={`mt-2 text-white border-2 ${isDisabled ? "border-red-400" : "border-green-300"} p-3 rounded-xl cursor-pointer`} disabled={isDisabled} >Giriş</button>

        </form>
    );
}

export default Login;
