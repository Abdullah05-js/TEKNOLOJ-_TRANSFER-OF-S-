import React, { useState, useEffect } from 'react';
import Input from './Uİ/Input';



const Dataisertaion = () => {

    const [formState, setFormState] = useState({
        isArge: false,
        isContractSigned: false,
        isArgeBackStatus: false,
        isSurdurulebilirlik: false,
        isProtocolSigned: false,
        isAcademicJoined: false,
        AcademicName: '',
        CompanyNames: '',
        ContractType: '',
        Date: '',
        ConversationOwner: '',
        Sector: '',
    });

    const [isNew, setisNew] = useState(false);

    const [Akademiks, setAkademiks] = useState([]);
    const [Companies, setCompanies] = useState([]);
    const [Users, setUsers] = useState([]);
    const [Sektor, setSektor] = useState([]);
    const [isSuccess, setisSuccess] = useState("");


    const FetchSelectors = async () => {
        const response = await window.electron.ipcRenderer.invoke("GetSelectors", "");
        setAkademiks(response.Akademiks)
        setCompanies(response.Companies)
        setUsers(response.Users)
        setSektor(response.Sektor)
    }

    useEffect(() => {
        console.log("fetching");
        FetchSelectors();

    }, []);


    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const FormstateData = { ...formState }

            if (FormstateData.ContractType === "") {
                FormstateData.ContractType = "Sözlemşesi olmayan"
            }
            const response = await window.electron.ipcRenderer.invoke("SetConversation", FormstateData);
            if (response) {
                setisSuccess(true)
            } else {
                setisSuccess(false)
            }
            setTimeout(() => {
                setisSuccess("")
            }, 1000);
        } catch (error) {
            console.log("error from form:", error);
        } finally {
            FetchSelectors();
        }
    }


    const handleAcademic = (e) => {
        e.target.value.length > 0 ? setFormState({ ...formState, AcademicName: e.target.value.toUpperCase(), isAcademicJoined: true }) : setFormState({ ...formState, AcademicName: e.target.value.toUpperCase(), isAcademicJoined: false })
    }

    console.log(Users);
    return (
        <form onSubmit={handleSubmit} className='w-screen h-screen flex flex-col  justify-center items-center'>

            <ul className='flex justify-center items-start flex-col gap-5'>
                <li>
                    <div className='flex justify-between items-center gap-2'>
                        {isSuccess === "" ? "" : isSuccess ? <h1 className='text-green-300  text-2xl font-bold'>Bilgiler Kaydedildi</h1> : <h1 className='text-red-600  text-2xl font-bold'>Bilgiler Kaydedilemedi</h1>}
                    </div>
                </li>

                <li>
                    <div className='flex justify-between items-center gap-2'>
                        <h1 className='text-white  text-2xl font-bold'>Firma Adı:</h1>
                        <button type="button" onClick={() => setisNew((e) => !e)} className=' mt-2 text-white border-2 border-green-300 p-3 rounded-xl'  >{!isNew ? "Yeni Kayıt" : "Eski kayıt"}</button>
                    </div>
                </li>


                <li>
                    <div className='flex justify-between items-center gap-2'>
                        <h1 className='text-white  text-2xl font-bold'>Firma Adı:</h1>
                        {
                            isNew ? <Input value={formState.CompanyNames} onchange={(e) => setFormState({ ...formState, CompanyNames: e.target.value.toUpperCase() })} type={"text"} placeholder={"Firma Adını Giriniz"} />
                                :
                                (
                                    <select value={formState.CompanyNames} onChange={(e) => setFormState({ ...formState, CompanyNames: e.target.value })} className='min-w-28 p-2 border-2 border-white rounded-lg outline-none focus:border-2 focus:border-green-300 bg-black text-white'>
                                        <option value="">Firma Adı Seçiniz</option>
                                        {
                                            Companies.length > 0 && Companies.map((e) => {
                                                return <option value={e}>{e}</option>
                                            })
                                        }
                                    </select>
                                )
                        }
                    </div>
                </li>

                <li>
                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white  text-2xl font-bold'>Sektör:</h1>
                        {
                            isNew ? <Input value={formState.Sector} onchange={(e) => { setFormState({ ...formState, Sector: e.target.value.toUpperCase() }) }} type={"text"} placeholder={"Sektör Adını Giriniz"} />
                                :
                                (
                                    <select value={formState.Sector} onChange={(e) => setFormState({ ...formState, Sector: e.target.value.toUpperCase() })} className='min-w-28 p-2 border-2 border-white rounded-lg outline-none focus:border-2 focus:border-green-300 bg-black text-white'>
                                        <option value="">Sektör Seçiniz</option>
                                        {
                                            Sektor.length > 0 && Sektor.map((e) => {
                                                return <option value={e}>{e}</option>
                                            })
                                        }
                                    </select>
                                )
                        }

                    </div>
                </li>

                <li>
                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white  text-2xl font-bold'>Tarih:</h1>
                        <Input value={formState.Date} onchange={(e) => { setFormState({ ...formState, Date: e.target.value.toUpperCase() }) }} type={"date"} placeholder={"tarih"} />
                    </div>
                </li>


                <li>
                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white  text-2xl font-bold'>Görüşmeyi Yapan Kişi:</h1>
                        <select onChange={(e) => { setFormState({ ...formState, ConversationOwner: e.target.value.toUpperCase() }) }} value={formState.ConversationOwner} className='min-w-28 p-2 border-2 border-white rounded-lg outline-none focus:border-2 focus:border-green-300 bg-black text-white'>
                            <option value="">Görüşmeyi Yapan Kişi</option>
                            {
                                Users.length > 0 && Users.map((e) => {
                                    return <option value={e.toUpperCase()}>{e.toUpperCase()}</option>
                                })
                            }
                        </select>
                    </div>
                </li>

                <li>
                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white  text-2xl font-bold'>Akademisyen Katılımı:</h1>
                        {
                            isNew ? <Input onchange={handleAcademic} value={formState.AcademicName} type={"text"} placeholder={"Akademisyen Adını Giriniz"} />
                                :
                                (
                                    <select value={formState.AcademicName} onChange={handleAcademic} className='min-w-28 p-2 border-2 border-white rounded-lg outline-none focus:border-2 focus:border-green-300 bg-black text-white'>
                                        <option value="">Akademisyen Seçiniz</option>
                                        {
                                            Akademiks.length > 0 && Akademiks.map((e) => {
                                                return <option value={e}>{e}</option>
                                            })
                                        }
                                    </select>
                                )
                        }
                    </div>
                </li>

                <li>
                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white  text-2xl font-bold'>Protokol:</h1>
                        <input onChange={(e) => { setFormState({ ...formState, isProtocolSigned: e.target.checked }) }} checked={formState.isProtocolSigned} type="checkbox" className='h-6 w-6 accent-green-300 ' />
                    </div>
                </li>

                <li>
                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white  text-2xl font-bold'>Sözleşme:</h1>
                        <input onChange={(e) => { setFormState({ ...formState, isContractSigned: e.target.checked }) }} checked={formState.isContractSigned} type="checkbox" className='h-6 w-6 accent-green-300 ' />

                        <select disabled={!formState.isContractSigned} onChange={(e) => { setFormState({ ...formState, ContractType: e.target.value.toUpperCase() }) }} value={formState.ContractType} className='min-w-28 p-2 border-2 border-white rounded-lg outline-none focus:border-2 focus:border-green-300 bg-black text-white'>
                            <option value="">Sözleşme Türü Seçiniz</option>
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
                            <input onChange={(e) => { setFormState({ ...formState, isArge: e.target.checked }) }} checked={formState.isArge} type="checkbox" className='h-6 w-6 accent-green-300 ' />
                        </div>
                    </li>
                    <li>
                        <div className='flex justify-between items-center gap-2 '>
                            <h1 className='text-white  text-2xl font-bold'>Arge Back Ofis Danışmanlığı:</h1>
                            <input onChange={(e) => { setFormState({ ...formState, isArgeBackStatus: e.target.checked }) }} checked={formState.isArgeBackStatus} type="checkbox" className='h-6 w-6 accent-green-300 ' />
                        </div>
                    </li>

                    <li>
                        <div className='flex justify-between items-center gap-2 '>
                            <h1 className='text-white  text-2xl font-bold'>Sürdürülebilirlik:</h1>
                            <input onChange={(e) => { setFormState({ ...formState, isSurdurulebilirlik: e.target.checked }) }} checked={formState.isSurdurulebilirlik} type="checkbox" className='h-6 w-6 accent-green-300 ' />
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
