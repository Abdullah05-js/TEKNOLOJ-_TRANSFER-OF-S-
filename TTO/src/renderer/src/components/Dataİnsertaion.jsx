import React from 'react';
import Input from './Uİ/Input';



const Dataisertaion = ({ }) => {
    return (
        <form className='w-screen h-screen flex flex-col  justify-center items-center'>

            <ul className='flex justify-center items-start flex-col gap-5'>
                <li>
                    <div className='flex justify-between items-center gap-2'>
                        <h1 className='text-white  text-2xl font-bold'>Firma Adı:</h1>

                        <Input type={"text"} placeholder={"Firma Adını Giriniz"} />
                    </div>
                </li>

                <li>
                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white  text-2xl font-bold'>Sektör:</h1>
                        <Input type={"text"} placeholder={"Sektör Adını Giriniz"} />
                    </div>
                </li>

                <li>
                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white  text-2xl font-bold'>Tarih:</h1>
                        <Input type={"date"} placeholder={"tarih"} />
                    </div>
                </li>


                <li>
                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white  text-2xl font-bold'>Görüşmeyi Yapan Kişi:</h1>
                        <select className='min-w-28 p-2 border-2 border-white rounded-lg outline-none focus:border-2 focus:border-green-300 bg-black text-white'>
                            <option value="hi">hi</option>
                        </select>
                    </div>
                </li>

                <li>
                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white  text-2xl font-bold'>Akademisyen Katılımı:</h1>
                        <input type="checkbox" className='h-6 w-6 accent-green-300 ' />
                        <select className='min-w-28 p-2 border-2 border-white rounded-lg outline-none focus:border-2 focus:border-green-300 bg-black text-white'>
                            <option value="hi">hi</option>
                        </select>
                    </div>
                </li>

                <li>
                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white  text-2xl font-bold'>Protokol:</h1>
                        <input type="checkbox" className='h-6 w-6 accent-green-300 ' />
                    </div>
                </li>

                <li>
                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white  text-2xl font-bold'>Sözleşme:</h1>
                        <input type="checkbox" className='h-6 w-6 accent-green-300 ' />
                        <select className='min-w-28 p-2 border-2 border-white rounded-lg outline-none focus:border-2 focus:border-green-300 bg-black text-white'>
                            <option value="ÖZKAYNAK">ÖZKAYNAK</option>
                            <option value="TÜBİTAK">TÜBİTAK</option>
                            <option value="PROJE YAZMA">PROJE YAZMA</option>
                            <option value="TEKNOPARK">ÖZKAYNAK</option>
                        </select>
                    </div>
                </li>

                <div className='flex flex-row gap-2'>

                    <li>
                        <div className='flex justify-between items-center gap-2 '>
                            <h1 className='text-white  text-2xl font-bold'>Arge Merkezi:</h1>
                            <input type="checkbox" className='h-6 w-6 accent-green-300 ' />
                        </div>
                    </li>
                    <li>
                        <div className='flex justify-between items-center gap-2 '>
                            <h1 className='text-white  text-2xl font-bold'>Arge Back Ofis Danışmanlığı:</h1>
                            <input type="checkbox" className='h-6 w-6 accent-green-300 ' />
                        </div>
                    </li>

                    <li>
                        <div className='flex justify-between items-center gap-2 '>
                            <h1 className='text-white  text-2xl font-bold'>Sürdürülebilirlik:</h1>
                            <input type="checkbox" className='h-6 w-6 accent-green-300 ' />
                        </div>
                    </li>

                </div>

                <li>
                    <button type="submit" className=' mt-2 text-white border-2 border-green-300 p-3 rounded-xl'  >Kaydet</button>
                </li>

            </ul>


        </form>
    );
}

export default Dataisertaion;
