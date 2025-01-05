import React, { useState } from 'react';
import Input from './Uİ/Input';
import { useEffect } from 'react';

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


    const [Data, setData] = useState([]);
    const [formState, setFormState] = useState({
        isArge: false,
        isArgeBackStatus: false,
        isSurdurulebilirlik: false,
        isProtocolSigned: false,
        AcademicName: false,
        CompanyNames: false,
        ContractType: false,
        Date: false,
        ConversationOwner: false,
        Sector: false,
    });

    const [formStateData, setFormStateData] = useState({
        isArge: false,
        isArgeBackStatus: false,
        isSurdurulebilirlik: false,
        isProtocolSigned: false,
        AcademicName: "",
        CompanyNames: "",
        ContractType: "",
        Date: "",
        ConversationOwner: "",
        Sector: "",
    });

    const [FilterData, setFilterData] = useState({});
    const [Filter, setFilter] = useState({});
    const [Akademiks, setAkademiks] = useState([]);
    const [Companies, setCompanies] = useState([]);
    const [DealType, setDealType] = useState([]);
    const [Users, setUsers] = useState([]);
    const [Sektor, setSektor] = useState([]);

    const FetchData = async () => {
        const response = await window.electron.ipcRenderer.invoke("Filter", FilterData);
        setData(response);
    }
    const FetchSelectors = async () => {
        const response = await window.electron.ipcRenderer.invoke("GetSelectors", "");
        setAkademiks(response.Akademiks)
        setCompanies(response.Companies)
        setDealType(response.DealType)
        setUsers(response.Users)
        setSektor(response.Sektor)
    }

    useEffect(() => {
        FetchSelectors();
        FetchData();
    }, []);

    useEffect(() => {
        FetchData();
    },[formStateData])





    const ReturnList = Data.map((e, index) => {
        return (
            <tr key={index}>

                <td className='w-9'>{index + 1}</td>
                {
                    Object.keys(Filter).map(key => {
                        return <td >{e[key] === true ? "var" : e[key] === false ? "yok" : e[key]}</td>
                    })
                }
            </tr>
        )
    })


    const handleChange = (e) => {
        const newFormState = { ...formState };
        newFormState[e.target.name] = e.target.checked;
        if (e.target.checked) {
            Filter[e.target.name] = e.target.checked
        }
        else {
            let newFilter = { ...Filter }
            delete newFilter[e.target.name]
            setFilter(newFilter)
        }
        setFormState(newFormState);
    }

    const handleData = (e) => {
        const newFormState = { ...formStateData };

        if (["isArge", 'isArgeBackStatus', 'isSurdurulebilirlik', 'isProtocolSigned'].includes(e.target.name)) {
            newFormState[e.target.name] = e.target.checked;
            if (e.target.checked) {
                FilterData[e.target.name] = e.target.checked
            }
            else {
                let newFilter = { ...FilterData }
                delete newFilter[e.target.name]
                setFilterData(newFilter)
            }
        }
        else {

            newFormState[e.target.name] = e.target.value

            if (e.target.value !== "") {
                FilterData[e.target.name] = e.target.value
            }
            else {
                let newFilter = { ...FilterData }
                delete newFilter[e.target.name]
                setFilterData(newFilter)
            }
        }
        setFormStateData(newFormState);
    }

    console.log(Data[0]);

    return (
        <div className='w-screen h-screen overflow-hidden  flex flex-col  justify-start items-start gap-3'>

            <div className='flex flex-row gap-3 ml-2 mt-6 '>

                <div className='flex flex-row gap-3 pr-3  border-r-2 border-green-300 ' >



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





                    <div className='flex flex-col gap-2'>
                        <div className='flex justify-between items-center gap-2 '>
                            <h1 className='text-white  font-bold'>Akademisyen:</h1>
                            <input type="checkbox" onChange={handleChange} name='AcademicName' value={formState.AcademicName} className='h-6 w-6 accent-green-300 ' />
                        </div>


                        <div className='flex justify-between items-center gap-2 '>
                            <h1 className='text-white  font-bold'>Firma:</h1>
                            <input type="checkbox" onChange={handleChange} value={formState.CompanyNames} name='CompanyNames' className='h-6 w-6 accent-green-300 ' />
                        </div>



                        <div className='flex justify-between items-center gap-2 '>
                            <h1 className='text-white   font-bold'>Sözleşme:</h1>
                            <input type="checkbox" onChange={handleChange} name='ContractType' value={formState.ContractType} className='h-6 w-6 accent-green-300 ' />
                        </div>


                        <div className='flex justify-between items-center gap-2 '>
                            <h1 className='text-white   font-bold'>Tarih:</h1>
                            <input type="checkbox" onChange={handleChange} name={"Date"} value={formState.Date} className='h-6 w-6 accent-green-300 ' />
                        </div>
                    </div>


                    <div className='flex flex-col gap-2'>
                        <div className='flex justify-between items-center gap-2 '>
                            <h1 className='text-white  font-bold'>Görüşmeyi Yapan Kişi:</h1>
                            <input type="checkbox" onChange={handleChange} name='ConversationOwner' value={formState.ConversationOwner} className='h-6 w-6 accent-green-300 ' />
                        </div>


                        <div className='flex justify-between items-center gap-2 '>
                            <h1 className='text-white  font-bold'>Sektör:</h1>
                            <input type="checkbox" onChange={handleChange} name='Sector' value={formState.Sector} className='h-6 w-6 accent-green-300 ' />
                        </div>



                    </div>

                </div>


                <div className='flex flex-col gap-2  '>
                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white  font-bold'>Arge Merkezi:</h1>
                        <input type="checkbox" onChange={handleData} name='isArge' value={formStateData.isArge} className='h-6 w-6 accent-green-300 ' />
                    </div>


                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white  font-bold'>Arge Back:</h1>
                        <input type="checkbox" onChange={handleData} name='isArgeBackStatus' value={formStateData.isArgeBackStatus} className='h-6 w-6 accent-green-300 ' />
                    </div>



                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white   font-bold'>Sürdürülebilirlik:</h1>
                        <input type="checkbox" onChange={handleData} name='isSurdurulebilirlik' value={formStateData.isSurdurulebilirlik} className='h-6 w-6 accent-green-300 ' />
                    </div>


                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white   font-bold'>Protokol:</h1>
                        <input type="checkbox" onChange={handleData} name='isProtocolSigned' value={formStateData.isProtocolSigned} className='h-6 w-6 accent-green-300 ' />
                    </div>
                </div>

                <div className='flex flex-col gap-1'>

                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white  font-bold'>Akademisyen:</h1>
                        <select onChange={handleData} name='AcademicName' value={formStateData.AcademicName} className='min-w-28 p-2 border-2 border-white rounded-lg outline-none focus:border-2 focus:border-green-300 bg-black text-white'>
                            <option value="">Hepsi</option>
                            {Akademiks.map((e, index) => {
                                let elements = [];
                                for (let index1 = 0; index1 < index; index1++) {
                                    elements.push(Akademiks[index1])
                                }
                                console.log(elements);
                                if (!elements.includes(e)) {
                                    return <option value={e} key={index}>{e}</option>
                                }
                            })}
                        </select>
                    </div>

                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white  font-bold'>Firma:</h1>
                        <select onChange={handleData} value={formStateData.CompanyNames} name='CompanyNames' className='min-w-28 p-2 border-2 border-white rounded-lg outline-none focus:border-2 focus:border-green-300 bg-black text-white'>
                            <option value="">Hepsi</option>
                            {Companies.map((e, index) => {
                                let elements = [];
                                for (let index1 = 0; index1 < index; index1++) {
                                    elements.push(Companies[index1])
                                }
                                console.log(elements);
                                if (!elements.includes(e)) {
                                    return <option value={e} key={index}>{e}</option>
                                }
                            })}

                        </select>
                    </div>

                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white  font-bold'>Sözleşme:</h1>
                        <select onChange={handleData} name='ContractType' value={formStateData.ContractType} className='min-w-28 p-2 border-2 border-white rounded-lg outline-none focus:border-2 focus:border-green-300 bg-black text-white'>
                            <option value="">Hepsi</option>
                            {DealType.map((e, index) => {
                                let elements = [];
                                for (let index1 = 0; index1 < index; index1++) {
                                    elements.push(DealType[index1])
                                }
                                if (!elements.includes(e)) {
                                    return <option value={e} key={index}>{e}</option>
                                }
                            })}
                        </select>
                    </div>

                </div>


                <div className='flex flex-col gap-1 '>

                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white   font-bold'>Tarih:</h1>
                        <Input type={"date"} onchange={handleData} name={"Date"} value={formStateData.Date} placeholder={"tarih"} />
                    </div>

                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white  font-bold'>Görüşmeyi Yapan Kişi:</h1>
                        <select onChange={handleData} name='ConversationOwner' value={formStateData.ConversationOwner} className='min-w-28 p-2 border-2 border-white rounded-lg outline-none focus:border-2 focus:border-green-300 bg-black text-white'>
                            <option value="">Hepsi</option>
                            {Users.map((e, index) => {
                                let elements = [];
                                for (let index1 = 0; index1 < index; index1++) {
                                    elements.push(Users[index1])
                                }
                                console.log(elements);
                                if (!elements.includes(e)) {
                                    return <option value={e.toUpperCase()} key={index}>{e.toUpperCase()}</option>
                                }
                            })}
                        </select>
                    </div>

                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white  font-bold'>Sektör:</h1>
                        <select onChange={handleData} name='Sector' value={formStateData.Sector} className='min-w-28 p-2 border-2 border-white rounded-lg outline-none focus:border-2 focus:border-green-300 bg-black text-white'>
                            <option value="">Hepsi</option>
                            {Sektor.map((e, index) => {
                                let elements = [];
                                for (let index1 = 0; index1 < index; index1++) {
                                    elements.push(Sektor[index1])
                                }
                                console.log(elements);
                                if (!elements.includes(e)) {
                                    return <option value={e} key={index}>{e}</option>
                                }
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
                            <th className=' w-9 '>No</th>
                            {
                                Object.keys(Filter).map((e) => {
                                    return <th className='break-words'>{e}</th>
                                })
                            }
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
