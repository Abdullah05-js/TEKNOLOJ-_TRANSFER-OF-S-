import React, { useState } from 'react';
import Input from './Uİ/Input';
import { useEffect } from 'react';
import { Select, SelectItem } from '@heroui/select';
import { Pagination } from '@heroui/pagination';
import Toast from './Uİ/Toast';
import { Button } from '@heroui/react';
const categories = [
    'isArge',
    'isArgeBackStatus',
    'isSurdurulebilirlik',
    'isProtocolSigned',
    'AcademicName',
    'CompanyNames',
    'ContractType',
    'Date',
    'ConversationOwner',
    'Sector'
];

const DataFilter = () => {


    const Data = []


    const ReturnList = Data?.map((e, index) => {
        console.log(e);
        return (
            <tr key={index}>

                <td className='w-9'><button onClick={() => {
                    navigator.clipboard.writeText(e._id)
                    alert("kopyalandı")
                }}>{index + 1}</button></td>
                {
                    Object.keys(Filter).map(key => {
                        if (key === "AcademicName") {
                            return <td>
                                <Select radius='none' placeholder='Akademisyenler' color='success' variant='bordered' classNames={{ value: `${index % 2 === 0 ? "text-white group-data-[has-value=true]:text-white" : "text-black group-data-[has-value=true]:text-black"}` }}>
                                    {e[key].map((e) => {
                                        return <SelectItem onMouseEnter={handleHover} onMouseLeave={handleHoverLeave} className='min-w-52' textValue={e} key={e}>
                                            {e}
                                        </SelectItem>
                                    })}
                                </Select>
                            </td>
                        }
                        else if (key === "CompanyNames") {
                            return <td onMouseEnter={(target) => handleHoverTD(target, e)} onMouseLeave={handleHoverLeave} className='overflow-auto'>{e[key] === true ? "var" : e[key] === false ? "yok" : e[key]}</td>
                        } else if (key === "ConversationOwner") {
                            return <td>
                                <Select radius='none' placeholder='Görüşmeyi YK.' color='success' variant='bordered' classNames={{ value: `${index % 2 === 0 ? "text-white group-data-[has-value=true]:text-white" : "text-black group-data-[has-value=true]:text-black"}` }}>
                                    {e[key].map((e) => {
                                        return <SelectItem onMouseEnter={handleHover} onMouseLeave={handleHoverLeave} className='min-w-52' textValue={e} key={e}>
                                            {e}
                                        </SelectItem>
                                    })}
                                </Select>
                            </td>
                        }
                        return <td className='break-words'>{e[key] === true ? "var" : e[key] === false ? "yok" : e[key]}</td>
                    })
                }
            </tr>
        )
    })


    return (
        <div className='w-screen h-screen overflow-hidden  flex flex-col  justify-start items-start gap-3'>
            <Toast text={""} isVisible={""} />
            <div className='flex flex-row gap-3 ml-2 mt-6 '>

                <div className='flex flex-row gap-3 pr-3  border-r-2 border-green-300 ' >



                    <div className='flex flex-col gap-2'>
                        <div className='flex justify-between items-center gap-2 '>
                            <h1 className='text-white   font-bold'>Sözleşme:</h1>
                            <input type="checkbox" name='ContractType' className='h-6 w-6 accent-green-300 ' />
                        </div>

                        <div className='flex justify-between items-center gap-2 '>
                            <h1 className='text-white  font-bold'>Arge Merkezi:</h1>
                            <input type="checkbox" name='isArge' className='h-6 w-6 accent-green-300 ' />
                        </div>

                        <div className='flex justify-between items-center gap-2 '>
                            <h1 className='text-white   font-bold'>Protokol:</h1>
                            <input type="checkbox" name='isProtocolSigned' className='h-6 w-6 accent-green-300 ' />
                        </div>
                    </div>


                    <div className='flex flex-col gap-2'>
                        <div className='flex justify-between items-center gap-2 '>
                            <h1 className='text-white  font-bold'>Akademisyen:</h1>
                            <input type="checkbox" name='AcademicName' className='h-6 w-6 accent-green-300 ' />
                        </div>


                        <div className='flex justify-between items-center gap-2 '>
                            <h1 className='text-white  font-bold'>Firma:</h1>
                            <input type="checkbox" name='CompanyNames' className='h-6 w-6 accent-green-300 ' />
                        </div>



                        <div className='flex justify-between items-center gap-2 '>
                            <h1 className='text-white   font-bold'>Tarih:</h1>
                            <input type="checkbox" name={"Date"} className='h-6 w-6 accent-green-300 ' />
                        </div>

                    </div>


                    <div className='flex flex-col gap-2'>
                        <div className='flex justify-between items-center gap-2 '>
                            <h1 className='text-white  font-bold'>Görüşmeyi Yapan Kişi:</h1>
                            <input type="checkbox" name='ConversationOwner' className='h-6 w-6 accent-green-300 ' />
                        </div>


                        <div className='flex justify-between items-center gap-2 '>
                            <h1 className='text-white  font-bold'>Teklif:</h1>
                            <input type="checkbox" name='Teklif' className='h-6 w-6 accent-green-300 ' />
                        </div>

                        <div className='flex justify-between items-center gap-2 '>
                            <h1 className='text-white   font-bold'>iş Geliştirme:</h1>
                            <input type="checkbox" name='isGelistirme' className='h-6 w-6 accent-green-300 ' />
                        </div>

                    </div>


                    <div className='flex flex-col gap-2'>

                        <div className='flex justify-between items-center gap-2 '>
                            <h1 className='text-white  font-bold'>Detay:</h1>
                            <input type="checkbox" name='ConversationDetails' className='h-6 w-6 accent-green-300 ' />
                        </div>

                        <div className='flex justify-between items-center gap-2 '>
                            <h1 className='text-white   font-bold'>Hepsi:</h1>
                            <input type="checkbox" className='h-6 w-6 accent-green-300 ' />
                        </div>


                    </div>

                </div>

                <div className='flex flex-col gap-1'>

                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white  font-bold'>Akademisyen:</h1>
                        <select name='AcademicName' className='min-w-28 p-2 border-2 border-white rounded-lg outline-none focus:border-2 focus:border-green-300 bg-black text-white'>
                            <option value="">Hepsi</option>
                            {/* {ReturnAkademiks().map((e, index) => {
                                return <option value={e} key={index}>{e}</option>
                            })} */}
                        </select>
                    </div>

                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white  font-bold'>Firma:</h1>
                        <select name='CompanyNames' className='min-w-28 p-2 border-2 border-white rounded-lg outline-none focus:border-2 focus:border-green-300 bg-black text-white'>
                            <option value="">Hepsi</option>
                            {/* {Companies.map((e, index) => {
                                let elements = [];
                                for (let index1 = 0; index1 < index; index1++) {
                                    elements.push(Companies[index1])
                                }
                                if (!elements.includes(e)) {
                                    return <option value={e} key={index}>{e}</option>
                                }
                            })} */}

                        </select>
                    </div>

                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white  font-bold'>Sözleşme:</h1>
                        <select name='ContractType' className='min-w-28 p-2 border-2 border-white rounded-lg outline-none focus:border-2 focus:border-green-300 bg-black text-white'>
                            <option value="">Hepsi</option>
                            {/* {DealType.map((e, index) => {
                                let elements = [];
                                for (let index1 = 0; index1 < index; index1++) {
                                    elements.push(DealType[index1])
                                }
                                if (!elements.includes(e)) {
                                    return <option value={e} key={index}>{e}</option>
                                }
                            })} */}
                        </select>
                    </div>

                </div>


                <div className='flex flex-col gap-1 '>

                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white   font-bold'>Tarih:</h1>
                        <Input type={"date"} name={"Date"} placeholder={"tarih"} />
                    </div>

                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white  font-bold'>Görüşenler:</h1>
                        <select name='ConversationOwner' className='min-w-28 p-2 border-2 border-white rounded-lg outline-none focus:border-2 focus:border-green-300 bg-black text-white'>
                            {/* <option value="">Hepsi</option>
                            {Users.map((e, index) => {
                                let elements = [];
                                for (let index1 = 0; index1 < index; index1++) {
                                    elements.push(Users[index1])
                                }
                                if (!elements.includes(e)) {
                                    return <option value={e.toUpperCase()} key={index}>{e.toUpperCase()}</option>
                                }
                            })} */}
                        </select>
                    </div>

                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white  font-bold'>Teklif:</h1>
                        <select name='ContractType' className='min-w-28 p-2 border-2 border-white rounded-lg outline-none focus:border-2 focus:border-green-300 bg-black text-white'>
                            <option value="">Hepsi</option>
                            {/* {DealType.map((e, index) => {
                                let elements = [];
                                for (let index1 = 0; index1 < index; index1++) {
                                    elements.push(DealType[index1])
                                }
                                if (!elements.includes(e)) {
                                    return <option value={e} key={index}>{e}</option>
                                }
                            })} */}
                        </select>
                    </div>


                </div>



                <div className='flex flex-col gap-2  '>
                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white  font-bold'>Arge Merkezi:</h1>
                        <input type="checkbox" name='isArge' className='h-6 w-6 accent-green-300 ' />
                    </div>


                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white   font-bold'>Protokol:</h1>
                        <input type="checkbox" name='isProtocolSigned' className='h-6 w-6 accent-green-300 ' />
                    </div>



                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white   font-bold'>iş Geliştirme:</h1>
                        <input type="checkbox" name='isGelistirme' className='h-6 w-6 accent-green-300 ' />
                    </div>
                </div>

            </div>




            {/* table */}
            <div className='flex flex-col justify-start items-center flex-1  border-t-2  border-green-300'>


                <table className=' text-white p-2 '>

                    <thead className='border-b-2 border-white relative'>
                        <tr >
                            <th className=' w-9 '>No</th>
                            {/* {
                                Object.keys(Filter).map((e) => {
                                    if (e === "isArge")
                                        return <th className='break-words'>Arge Merkezi</th>
                                    else if (e === "isArgeBackStatus")
                                        return <th className='break-words'>Arge Back OD.</th>
                                    else if (e === "isSurdurulebilirlik")
                                        return <th className='break-words'>Sürdürülebilirlik</th>
                                    else if (e === "isProtocolSigned")
                                        return <th className='break-words'>Protokol</th>
                                    else if (e === "AcademicName")
                                        return <th className='break-words'>Akademisyen</th>
                                    else if (e === "CompanyNames")
                                        return <th className='break-words'>Firma</th>
                                    else if (e === "ContractType")
                                        return <th className='break-words'>Sözleşme</th>
                                    else if (e === "Date")
                                        return <th className='break-words'>Tarih</th>
                                    else if (e === "ConversationOwner")
                                        return <th className='break-words'>Görüşmeyi YK.</th>
                                    else if (e === "Sector")
                                        return <th className='break-words'>Sektör</th>
                                })
                            } */}
                        </tr>
                    </thead>

                    <tbody>
                        {/* {ReturnList} */}
                    </tbody>

                </table>

                <Pagination className='m-2' color='success' onChange={"setCurrentPage"} variant='flat' page={"currentPage"} total={"totalPages"} />
            </div>

        </div>
    );
}

export default DataFilter;
