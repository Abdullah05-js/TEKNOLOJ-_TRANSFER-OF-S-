import React, { useState, useEffect } from 'react';
import logo from "../assets/logo-beyaz.png"
import { Spinner } from '@heroui/react';

const HomePage = () => {
    const [Todos, setTodos] = useState([])
    const [isLoading, setİsloading] = useState(false)
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
                });
                console.log(data);
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


            <h1 className='text-white font-bold text-2xl text-center'>Hoşgeldin {JSON.parse(localStorage.getItem("userData")).username}</h1>

            <ul className="flex flex-col gap-2 w-1/2 scrollbar-hide overflow-y-auto">
                <h2 className='text-white w-full text-center text-xl mb-2'>Yaklaşan Aktiviteler</h2>
                {!isLoading ? (Todos.length === 0 ? "" : (
                    Todos.map((e) => {
                        return (
                            <li className='flex gap-2 justify-center items-start shadow-inner flex-col border border-white text-white rounded-xl px-6 py-4'>
                                <h2 className='text-center w-full text-lg text-green-300'>Görev Açıklaması</h2>
                                <h2 className='font-bold break-words text-medium leading-loose'>{e.description}</h2>
                                <p className='font-bold break-words text-medium self-end pr-10 text-green-700'>Son gün {(new Date(e.deadline)).toLocaleDateString()}</p>
                            </li>
                        )
                    })
                )) : <Spinner size='lg' color='success' />}


            </ul>
            <p className="text-center p-10 text-white">&copy; {new Date().getFullYear()} TTO inc.</p>

        </div>
    );
}

export default HomePage;
