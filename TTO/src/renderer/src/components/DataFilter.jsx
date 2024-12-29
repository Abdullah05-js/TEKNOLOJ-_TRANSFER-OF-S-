import React, { useState } from 'react';
import Input from './Uİ/Input';
import { useEffect } from 'react';


const DataFilter = () => {

    const [Data, setData] = useState([]);
    const [formState, setFormState] = useState({
        isArge: false,
        isArgeBackStatus: false,
        isSurdurulebilirlik: false,
        isProtocolSigned: false,
        AcademicName: '',
        CompanyNames: '',
        ContractType: '',
        Date: '',
        ConversationOwner: '',
        Sector: '',
    });
    const [Filter, setFilter] = useState({});
    const [Akademiks, setAkademiks] = useState([]);
    const [Companies, setCompanies] = useState([]);
    const [Deals, setDeals] = useState([]);
    const [Users, setUsers] = useState([]);
    const [Sektor, setSektor] = useState([]);

    const FetchData = async () => {
        const response = await window.electron.ipcRenderer.invoke("Filter", Filter)
        setData(response);
    }

    useEffect(() => {

        FetchData();

    }, [Filter])



    const ReturnList = Data.map((e, index) => {
        return (
            <tr key={index}>
                {
                    Object.keys(e).map(key => {
                        return <td>{e[key]}</td>
                    })
                }
            </tr>
        )
    })


    const handleChange = (e) => {
        const newFormState = { ...formState };
        if (["isArge", 'isArgeBackStatus', 'isSurdurulebilirlik', 'isProtocolSigned', 'isProtocolSigned'].includes(e.target.name)) {
            newFormState[e.target.name] = e.target.checked;
            if(e.target.checked)
            {
                Filter[e.target.name] = e.target.checked
            }
            else
            {
                let newFilter = {...Filter}
                delete newFilter[e.target.name]
                setFilter(newFilter)
            }
        }
        else {
            newFormState[e.target.name] = e.target.value

            if(e.target.value !== "")
                {
                    Filter[e.target.name] = e.target.value
                }
                else
                {
                    let newFilter = {...Filter}
                    delete newFilter[e.target.name]
                    setFilter(newFilter)
                }
        }
        setFormState(newFormState);
    }



    return (
        <div className='w-screen h-screen overflow-hidden  flex flex-col  justify-start items-center gap-7'>

            <div className='flex flex-row gap-3 mt-6'>

                <div className='flex flex-col gap-2'>
                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white  font-bold'>Arge Merkezi:</h1>
                        <input type="checkbox" onChange={handleChange} name='isArge' value={formState.isArge} className='h-6 w-6 accent-green-300 ' />
                    </div>


                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white  font-bold'>Arge Back:</h1>
                        <input type="checkbox" onChange={handleChange} name='isArgeBackStatus' value={formState.isArgeBackStatus} className='h-6 w-6 accent-green-300 ' />
                    </div>



                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white   font-bold'>Sürdürülebilirlik:</h1>
                        <input type="checkbox" onChange={handleChange} name='isSurdurulebilirlik' value={formState.isSurdurulebilirlik} className='h-6 w-6 accent-green-300 ' />
                    </div>


                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white   font-bold'>Protokol:</h1>
                        <input type="checkbox" onChange={handleChange} name='isProtocolSigned' value={formState.isProtocolSigned} className='h-6 w-6 accent-green-300 ' />
                    </div>
                </div>

                <div className='flex flex-col gap-1'>

                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white  font-bold'>Akademisyen:</h1>
                        <select onchange={handleChange} name='AcademicName' value={formState.akademisyen} className='min-w-28 p-2 border-2 border-white rounded-lg outline-none focus:border-2 focus:border-green-300 bg-black text-white'>
                            <option value="">Hepsi</option>
                            {Akademiks.map((e, index) => {
                                return <option value={e} key={index}>{e}</option>
                            })}
                        </select>
                    </div>

                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white  font-bold'>Firma:</h1>
                        <select onchange={handleChange} value={formState.firma} name='CompanyNames' className='min-w-28 p-2 border-2 border-white rounded-lg outline-none focus:border-2 focus:border-green-300 bg-black text-white'>
                            <option value="">Hepsi</option>
                            {Companies.map((e, index) => {
                                return <option value={e} key={index}>{e}</option>
                            })}

                        </select>
                    </div>

                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white  font-bold'>Sözleşme:</h1>
                        <select onchange={handleChange} name='ContractType' value={formState.sozlesme} className='min-w-28 p-2 border-2 border-white rounded-lg outline-none focus:border-2 focus:border-green-300 bg-black text-white'>
                            <option value="">Hepsi</option>
                            {Deals.map((e, index) => {
                                return <option value={e} key={index}>{e}</option>
                            })}
                        </select>
                    </div>

                </div>


                <div className='flex flex-col gap-1 '>

                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white   font-bold'>Tarih:</h1>
                        <Input type={"date"} onchange={handleChange} name={"Date"} value={formState.tarih} placeholder={"tarih"} />
                    </div>

                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white  font-bold'>Görüşmeyi Yapan Kişi:</h1>
                        <select onchange={handleChange} name='ConversationOwner' value={formState.gorusmeyiYapanKisi} className='min-w-28 p-2 border-2 border-white rounded-lg outline-none focus:border-2 focus:border-green-300 bg-black text-white'>
                            <option value="">Hepsi</option>
                            {Users.map((e, index) => {
                                return <option value={e} key={index}>{e}</option>
                            })}
                        </select>
                    </div>

                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white  font-bold'>Sektör:</h1>
                        <select onchange={handleChange} name='Sector' value={formState.sektor} className='min-w-28 p-2 border-2 border-white rounded-lg outline-none focus:border-2 focus:border-green-300 bg-black text-white'>
                            <option value="">Hepsi</option>
                            {Sektor.map((e, index) => {
                                return <option value={e} key={index}>{e}</option>
                            })}
                        </select>
                    </div>

                </div>

            </div>




            {/* table */}
            <div className='flex flex-col justify-center items-center  border-t-2  border-green-300'>


                <table className=' text-white p-2 '>

                    <thead className='border-b-2 border-white relative'>
                        <tr >
                            <th>SATIR</th>
                            <th>TARİH</th>
                            <th>FİRMA ADI</th>
                            <th>SEKTÖR</th>
                            <th>GÖRÜŞMEYİ YAPAN KİŞİ</th>
                            <th>AKADEMİSYEN</th>
                            <th>PROTOKOL</th>
                            <th>SÖZLEŞME</th>
                            <th>ARGE MERKEZİ</th>
                            <th>Arge Back Ofis Danışmalığı</th>
                            <th>Sürdürilebilirlik</th>
                        </tr>
                    </thead>

                    <tbody>
                        {ReturnList}
                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default DataFilter;
