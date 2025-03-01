import React, { useState, useEffect } from 'react';
import logo from "../assets/logo-beyaz.png"
import { Spinner } from '@heroui/react';

const HomePage = () => {
    const [Todos, setTodos] = useState([])
    const [isLoading,setİsloading] = useState(false)
    useEffect(() => {
        (async function getTodo() {
            try {
                setİsloading(true)
                const resposne = await window.electron.ipcRenderer.invoke("GetUserTodos", JSON.parse(localStorage.getItem("userData")).userId)
                const data = resposne.map((e) => {
                    const date1 = new Date(e.createdAt)
                    const date2 = new Date(e.deadline)
                    const days = Math.floor((date1.getTime() - date2.getTime()) / 86400000)
                    if (days <= 15)
                        return e
                })
                setİsloading(false)
                setTodos(data)
            } catch (error) {
                console.log(error);
                setİsloading(false)
            }
        })()
    }, []);

    return (
        <div className="flex flex-col justify-center items-center gap-4  w-screen h-screen">

            <img src={logo} alt="logo" />


            <h1 className='text-white font-bold text-xl text-center'>Hoşgeldin {JSON.parse(localStorage.getItem("userData")).username}</h1>

            <ul className="flex flex-col gap-2 w-1/2 overflow-auto">

                {!isLoading ? (Todos.length === 0 ? "" : (
                    Todos.map((e) => {
                        return (<li className='flex justify-center items-start flex-col text-white rounded-xl border-2 border-green-600 p-2'>
                            <h1 className='font-bold break-words text-xl border-b-1 border-white p-1'>Son gün {(new Date(e.deadline)).toLocaleDateString()}</h1>
                            <p className='font-bold break-words text-wrap text-lg leading-loose w-[400px] overflow-auto'>{e.description}</p>
                        </li>)
                    })
                )) : <Spinner size='lg' color='success' />}


            </ul>
            <p className="text-center p-10 text-white">&copy; {new Date().getFullYear()} TTO inc.</p>

        </div>
    );
}

export default HomePage;
