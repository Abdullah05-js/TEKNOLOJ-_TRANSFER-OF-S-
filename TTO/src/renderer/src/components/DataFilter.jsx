import React, { useState } from 'react';
import Input from './Uİ/Input';
import { useEffect } from 'react';
import { Select, SelectItem } from '@heroui/select';
import { Pagination } from '@heroui/pagination';
import Toast from './Uİ/Toast';
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
        isArge: true,
        isArgeBackStatus: true,
        isSurdurulebilirlik: true,
        isProtocolSigned: true,
        AcademicName: true,
        CompanyNames: true,
        ContractType: true,
        Date: true,
        ConversationOwner: true,
        Sector: true,
    });
    const [totalPages, setToatalPages] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
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
    const [Filter, setFilter] = useState({
        isArge: true,
        isArgeBackStatus: true,
        isSurdurulebilirlik: true,
        isProtocolSigned: true,
        AcademicName: true,
        CompanyNames: true,
        ContractType: true,
        Date: true,
        ConversationOwner: true,
        Sector: true,
    });
    const [Akademiks, setAkademiks] = useState([]);
    const [Companies, setCompanies] = useState([]);
    const [DealType, setDealType] = useState([]);
    const [Users, setUsers] = useState([]);
    const [Sektor, setSektor] = useState([]);
    const [isAllChacked, setisAllChacked] = useState(true)
    const [isVisible, setisVisible] = useState(false)
    const [HoveredText, setHoveredText] = useState("")
    const FetchData = async () => {
        const response = await window.electron.ipcRenderer.invoke("Filter", {...FilterData,page:currentPage});
        setData(response);
        console.log(FilterData);
    }
    const FetchSelectors = async () => {
        const response = await window.electron.ipcRenderer.invoke('GetSelectors', "");
        setAkademiks(response.Akademiks)
        setCompanies(response.Companies)
        setDealType(response.DealType)
        setUsers(response.Users)
        setSektor(response.Sektor)
    }
    const fetchPaginition = async () => {
        const resposne = await window.electron.ipcRenderer.invoke("getPaginition", "")
        setToatalPages(resposne)
    }

    useEffect(() => {
        FetchSelectors();
        FetchData();
        fetchPaginition()
    }, []);

    useEffect(() => {
        FetchData();
    }, [formStateData,currentPage])

    const handleHover = (e) => {
        setHoveredText(e.target.querySelectorAll("span")[0].innerHTML)
        setisVisible(true)
    }
    const handleHoverLeave = () => {
        setisVisible(false)
    }
    const handleHoverTD = (e, data) => {

        setHoveredText(`${data.startDate.split("-")[0] === "2005" ? "Anlaşma yok" : data.startDate} ${data.startDate.split("-")[0] === "2005" ? "" : data.endDate}`)
        setisVisible(true)
    }


    const ReturnList = Data?.map((e, index) => {
        return (
            <tr key={index}>

                <td className='w-9'>{index + 1}</td>
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


    const handleChange = (e) => {
        const newFormState = { ...formState };
        newFormState[e.target.name] = e.target.checked;
        setisAllChacked(false)
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

    const handleAll = (e) => {
        setisAllChacked(e.target.checked)
        if (e.target.checked) {
            setFormState({
                isArge: true,
                isArgeBackStatus: true,
                isSurdurulebilirlik: true,
                isProtocolSigned: true,
                AcademicName: true,
                CompanyNames: true,
                ContractType: true,
                Date: true,
                ConversationOwner: true,
                Sector: true,
            })
            setFilter({
                isArge: true,
                isArgeBackStatus: true,
                isSurdurulebilirlik: true,
                isProtocolSigned: true,
                AcademicName: true,
                CompanyNames: true,
                ContractType: true,
                Date: true,
                ConversationOwner: true,
                Sector: true,
            })
        }
        else {
            setFormState({
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
            })
            setFilter({})
        }
    }

    const ReturnAkademiks = () => {
        let uniqueAkademiks = [];
        Akademiks.map((e) => {
            e.map((Akademik) => {
                if (!uniqueAkademiks.includes(Akademik)) {
                    uniqueAkademiks.push(Akademik)
                    return;
                }
            })
        })
        return uniqueAkademiks
    }

    return (
        <div className='w-screen h-screen overflow-hidden  flex flex-col  justify-start items-start gap-3'>
            <Toast text={HoveredText} isVisible={isVisible} />
            <div className='flex flex-row gap-3 ml-2 mt-6 '>

                <div className='flex flex-row gap-3 pr-3  border-r-2 border-green-300 ' >



                    <div className='flex flex-col gap-2'>
                        <div className='flex justify-between items-center gap-2 '>
                            <h1 className='text-white  font-bold'>Arge Merkezi:</h1>
                            <input type="checkbox" onChange={handleChange} name='isArge' checked={formState.isArge} className='h-6 w-6 accent-green-300 ' />
                        </div>


                        <div className='flex justify-between items-center gap-2 '>
                            <h1 className='text-white  font-bold'>Arge Back:</h1>
                            <input type="checkbox" onChange={handleChange} name='isArgeBackStatus' checked={formState.isArgeBackStatus} className='h-6 w-6 accent-green-300 ' />
                        </div>



                        <div className='flex justify-between items-center gap-2 '>
                            <h1 className='text-white   font-bold'>Sürdürülebilirlik:</h1>
                            <input type="checkbox" onChange={handleChange} name='isSurdurulebilirlik' checked={formState.isSurdurulebilirlik} className='h-6 w-6 accent-green-300 ' />
                        </div>


                        <div className='flex justify-between items-center gap-2 '>
                            <h1 className='text-white   font-bold'>Protokol:</h1>
                            <input type="checkbox" onChange={handleChange} name='isProtocolSigned' checked={formState.isProtocolSigned} className='h-6 w-6 accent-green-300 ' />
                        </div>
                    </div>





                    <div className='flex flex-col gap-2'>
                        <div className='flex justify-between items-center gap-2 '>
                            <h1 className='text-white  font-bold'>Akademisyen:</h1>
                            <input type="checkbox" onChange={handleChange} name='AcademicName' checked={formState.AcademicName} className='h-6 w-6 accent-green-300 ' />
                        </div>


                        <div className='flex justify-between items-center gap-2 '>
                            <h1 className='text-white  font-bold'>Firma:</h1>
                            <input type="checkbox" onChange={handleChange} checked={formState.CompanyNames} name='CompanyNames' className='h-6 w-6 accent-green-300 ' />
                        </div>



                        <div className='flex justify-between items-center gap-2 '>
                            <h1 className='text-white   font-bold'>Sözleşme:</h1>
                            <input type="checkbox" onChange={handleChange} name='ContractType' checked={formState.ContractType} className='h-6 w-6 accent-green-300 ' />
                        </div>


                        <div className='flex justify-between items-center gap-2 '>
                            <h1 className='text-white   font-bold'>Tarih:</h1>
                            <input type="checkbox" onChange={handleChange} name={"Date"} checked={formState.Date} className='h-6 w-6 accent-green-300 ' />
                        </div>

                    </div>


                    <div className='flex flex-col gap-2'>
                        <div className='flex justify-between items-center gap-2 '>
                            <h1 className='text-white  font-bold'>Görüşmeyi Yapan Kişi:</h1>
                            <input type="checkbox" onChange={handleChange} name='ConversationOwner' checked={formState.ConversationOwner} className='h-6 w-6 accent-green-300 ' />
                        </div>


                        <div className='flex justify-between items-center gap-2 '>
                            <h1 className='text-white  font-bold'>Sektör:</h1>
                            <input type="checkbox" onChange={handleChange} name='Sector' checked={formState.Sector} className='h-6 w-6 accent-green-300 ' />
                        </div>

                        <div className='flex justify-between items-center gap-2 '>
                            <h1 className='text-white   font-bold'>Hepsi:</h1>
                            <input type="checkbox" onChange={handleAll} checked={isAllChacked} className='h-6 w-6 accent-green-300 ' />
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
                            {ReturnAkademiks().map((e, index) => {
                                return <option value={e} key={index}>{e}</option>
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
                                if (!elements.includes(e)) {
                                    return <option value={e} key={index}>{e}</option>
                                }
                            })}
                        </select>
                    </div>

                </div>

            </div>




            {/* table */}
            <div className='flex flex-col justify-start items-center flex-1  border-t-2  border-green-300'>


                <table className=' text-white p-2 '>

                    <thead className='border-b-2 border-white relative'>
                        <tr >
                            <th className=' w-9 '>No</th>
                            {
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
                            }
                        </tr>
                    </thead>

                    <tbody>
                        {ReturnList}
                    </tbody>

                </table>

                <Pagination className='m-2' color='success' onChange={setCurrentPage} variant='flat'  page={currentPage} total={totalPages} />
            </div>

        </div>
    );
}

export default DataFilter;
