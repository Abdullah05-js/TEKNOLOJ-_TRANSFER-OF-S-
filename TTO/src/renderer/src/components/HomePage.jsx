import React from 'react';
import logo from "../assets/logo-beyaz.png"
import { Button } from '@heroui/react';
const HomePage = () => {

    return (
        <div className="flex flex-col justify-center items-center gap-4  w-screen h-screen">

            <ul className="flex flex-col gap-4">

                <li>
                    <img src={logo} alt="logo" />
                </li>
                <li>
                    <div className="flex flex-row gap-2 justify-center items-center  mt-10">
                        <Button color='success' variant='bordered' className="min-w-52 bg-white text-center text-3xl font-bold">
                            Online
                        </Button>
                    </div>
                </li>
            </ul>
            <p className="text-center p-10 text-white">&copy; {new Date().getFullYear()} TTO inc.</p>

        </div>
    );
}

export default HomePage;
