import React from 'react';
import { WebsiteIcon, HomeIcon, PostIcons, SearchIcon, TodoIcon } from "../assets/icons.jsx"
const NavBar = ({ setShow }) => {


    return (
        <div className='w-28 h-screen border-green-300 border-r-2 flex flex-col justify-center items-center gap-16'>
            <WebsiteIcon />

            <ul className='h-screen flex flex-col gap-5'>
                <li className='flex justify-center'>
                    <button title='Ana Sayfa' onClick={() => setShow(0)}>
                        <HomeIcon width={6} height={6} />
                    </button>
                </li>
                <li className='flex justify-center'>
                    <button title='VERİ GİRME' onClick={() => setShow(1)}>
                        <PostIcons width={52} height={52} />
                    </button>
                </li>
                <li className='flex justify-center'>
                    <button title='VERİ ARAMA' onClick={() => setShow(2)}>
                        <SearchIcon width={48} height={48} />
                    </button>
                </li>
                <li className='flex justify-center'>
                    <button title='GÖREV LİSTESİ' onClick={() => setShow(3)}>
                        <TodoIcon width={48} height={48} />
                    </button>
                </li>
            </ul>

        </div>
    );


}

export default NavBar;
