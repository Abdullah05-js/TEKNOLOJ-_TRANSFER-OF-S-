import { useState, useEffect } from 'react';
import { Input } from '@heroui/react';
import { Select, SelectItem } from "@heroui/react";
import { DateRangePicker } from "@heroui/react";
import { EthiopicAmeteAlemCalendar, parseDate } from "@internationalized/date";
import { Spinner } from '@heroui/react';
import { Button } from '@heroui/button';
import { NumberInput } from '@heroui/react';

const Dataisertaion = () => {

    const [formState, setFormState] = useState({
        Date: "",
        Contract: {
            isContractSigned: false,
            ContractType: "",
            startDate: "",
            endDate: "",
            Amount: 0
        },
        Teklif: {
            isTeklif: false,
            startDate: "",
            endDate: "",
        },
        Academics: {
            isAcademicJoined: false,
            AcademicNames: "",
        },
        isGelistirme: false,
        isProtocolSigned: false,
        CompanyNames: "",
        ConversationOwners: "",
        isArge: false,
        ConversationDetails: ""
    });
    const [isTUBİTAK, setTUBİTAK] = useState(false)
    const [isDiger, setisDiger] = useState(false)
    const [isNew, setisNew] = useState(false)
    const [isSuccees, setisSuccess] = useState("")
    const [selectorAna, setselectorAna] = useState("")
    const [UserNames, setUserNames] = useState([])
    const [SelectorsData, setSelectorsData] = useState({
        CompanyNames: [],
        Academics: [],
        ContractType: []
    })
    const [isSelectrosLoading, setisSelectrosLoading] = useState(true)

    const getAllUserN = async () => {
        try {
            const response = await window.electron.ipcRenderer.invoke("GetAllUserNames", "")
            setUserNames(response)
        } catch (error) {
            console.log("getAllUserN: \n", error);
            setUserNames([])
        }
    }

    const getAllComponeyNamesAndAcademics = async () => {
        try {
            setisSelectrosLoading(true)
            const response = await window.electron.ipcRenderer.invoke("getAllComponeyNamesAndAcademics", "")
            setSelectorsData(JSON.parse(response))
            setisSelectrosLoading(false)
        } catch (error) {
            console.log("error from getAllComponeyNamesAndAcademics");
        }
    }

    useEffect(() => {
        try {
            getAllUserN()
            getAllComponeyNamesAndAcademics()
        } catch (error) {
            console.log("use effect 1: ", error);
        }
    }, [])

    const handleAna = (e) => {
        setselectorAna(e.target.value)
        console.log(e.target.value);
        switch (e.target.value) {
            case "iş Geliştirme":

                setFormState({
                    ...formState, isGelistirme: true,
                    Teklif: {
                        isTeklif: false,
                        startDate: "",
                        endDate: "",
                    },
                    Contract: {
                        isContractSigned: false,
                        ContractType: "",
                        startDate: "",
                        endDate: "",
                        Amount: 0
                    },
                    isProtocolSigned: false
                })

                break

            case "Teklif":

                setFormState({
                    ...formState, Teklif: {
                        isTeklif: true,
                        startDate: "",
                        endDate: ""
                    },
                    isGelistirme: false,
                    Contract: {
                        isContractSigned: false,
                        ContractType: "",
                        startDate: "",
                        endDate: "",
                        Amount: 0
                    },
                    isProtocolSigned: false
                })
                break
            case "Sözleşme":

                setFormState({
                    ...formState, Teklif: {
                        isTeklif: false,
                        startDate: "",
                        endDate: ""
                    },
                    isGelistirme: false,
                    Contract: {
                        isContractSigned: true,
                        ContractType: "",
                        startDate: "",
                        endDate: "",
                        Amount: 0
                    },
                    isProtocolSigned: false
                })

                break

            case "Protokol":

                setFormState({
                    ...formState, Teklif: {
                        isTeklif: false,
                        startDate: "",
                        endDate: ""
                    },
                    isGelistirme: false,
                    Contract: {
                        isContractSigned: false,
                        ContractType: "",
                        startDate: "",
                        endDate: "",
                        Amount: 0
                    },
                    isProtocolSigned: true
                })
                break
            default:

                setFormState({
                    ...formState, Teklif: {
                        isTeklif: false,
                        startDate: "",
                        endDate: ""
                    },
                    isGelistirme: false,
                    Contract: {
                        isContractSigned: false,
                        ContractType: "",
                        startDate: "",
                        endDate: "",
                        Amount: 0
                    },
                    isProtocolSigned: false
                })


        }
    }

    const handleContractTpye = (e) => {
        setisDiger(false)
        setTUBİTAK(false)
        if (e.target.value === "Diğer") {
            setFormState({ ...formState, Contract: { ...formState.Contract, ContractType: "" } })
            setisDiger(true)
            return;
        } else if (e.target.value === "TÜBİTAK") {
            setFormState({ ...formState, Contract: { ...formState.Contract, ContractType: e.target.value.toUpperCase() + "," } })
            setTUBİTAK(true)
            return;
        }
        setFormState({ ...formState, Contract: { ...formState.Contract, ContractType: e.target.value.toUpperCase() } })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(formState);
        try {
            const response = await window.electron.ipcRenderer.invoke("SetConversation", { ...formState })
            console.log(response);
            if (response)
                setisSuccess(true)
            else
                setisSuccess(false)


            setTimeout(() => {
                setisSuccess("")
            }, 1500);

        } catch (error) {
            console.log("error from handleSubmit: ", error);
            setisSuccess(false)
            setTimeout(() => {
                setisSuccess("")
            }, 1500);
        }

    }
    console.log(formState);

    return (
        <form onSubmit={handleSubmit} className='w-full h-screen flex flex-col px-6 py-4 justify-center items-center'>
            <h1 className={`${isSuccees !== "" ? isSuccees ? "text-green-300" : "text-red-600" : "hidden"} text-xl font-bold`}>{isSuccees ? "KAYDEDİLDİ" : "HATA OLUŞTU"}</h1>
            <div className='flex  justify-center flex-wrap flex-row gap-2 border-2 border-green-400 px-5 py-3 rounded-lg'>
                <Button variant="solid" color='success' className='' onPress={() => setisNew((e) => !e)} >{isNew ? "Yeni Veri" : "Eski Veri"}</Button>
                <div className='flex flex-row w-full'>
                    <div className='flex flex-col items-stretch w-full p-2 gap-2'>
                        <h1 className='text-xl font-bold text-white'>Firma Bilgileri:</h1>
                        {isNew ? (
                            <Input
                                label="Firma"
                                isRequired
                                value={formState.CompanyNames}
                                onChange={(e) => setFormState({ ...formState, CompanyNames: e.target.value.toUpperCase().trim() })}
                                className="max-w-xs font-bold"
                                placeholder={"Firma Adı"}
                                type="text"
                                variant="flat"
                            />
                        ) :
                            isSelectrosLoading ? <Spinner color='warning' size='lg' /> : (
                                <Select
                                    isRequired
                                    className="max-w-xs"
                                    value={formState.CompanyNames}
                                    label="Firma"
                                    placeholder="Firma Adı Seçiniz"
                                    onChange={(e) => setFormState({ ...formState, CompanyNames: e.target.value })}
                                >
                                    {
                                        SelectorsData.CompanyNames.map((e) => {
                                            return <SelectItem key={e}>{e}</SelectItem>
                                        })
                                    }
                                </Select>
                            )
                        }
                        <Select
                            isRequired
                            className="max-w-xs"
                            value={formState.isArge}
                            label="Arge/Tasarım Merkezi"
                            placeholder="Arge/Tasarım Merkezi Seçiniz"
                            onChange={(e) => setFormState({ ...formState, isArge: e.target.value === "Var" ? true : false })}
                        >
                            {
                                ["Var", "Yok"].map((e) => {
                                    return <SelectItem key={e}>{e}</SelectItem>
                                })
                            }
                        </Select>
                    </div>
                    <div className='flex flex-col justify-start items-stretch w-full  p-2 gap-2 '>
                        <h1 className='text-xl font-bold text-white'>Katılımcıların Bilgileri:</h1>
                        {isSelectrosLoading ? <Spinner color='warning' size='lg' /> : (<Select
                            isRequired
                            selectionMode="multiple"
                            className="max-w-xs"
                            value={formState.ConversationOwners}
                            label="Katılımcılar"
                            placeholder="Katılımcı Seçiniz"
                            onChange={(e) => setFormState({ ...formState, ConversationOwners: e.target.value })}
                        >
                            {
                                UserNames.map((e) => {
                                    return <SelectItem key={e}>{e}</SelectItem>
                                })
                            }
                        </Select>)}
                        {isNew ? (
                            <Input
                                label="Akademisyenler"
                                value={formState.Academics.AcademicNames}
                                onChange={(e) => setFormState({ ...formState, Academics: { isAcademicJoined: e.target.value.toUpperCase().length > 0 ? true : false, AcademicNames: e.target.value.toUpperCase() } })}
                                className="max-w-xs font-bold"
                                placeholder={"DR. İRFAN KÖSESOY,PRO. DR. KEREM KÜÇÜK"}
                                type="text"
                                variant="flat"
                            />
                        ) :
                            isSelectrosLoading ? <Spinner color='warning' size='lg' /> : (
                                <Select
                                    selectionMode="multiple"
                                    className="max-w-xs"
                                    value={formState.Academics.AcademicNames}
                                    label="Akademisyenler"
                                    placeholder="Akademisyen Seçiniz"
                                    onChange={(e) => setFormState({ ...formState, Academics: { isAcademicJoined: e.target.value.toUpperCase().length > 0 ? true : false, AcademicNames: e.target.value.toUpperCase() } })}
                                >
                                    {
                                        SelectorsData.Academics.map((e) => {
                                            return <SelectItem key={e}>{e}</SelectItem>
                                        })
                                    }
                                </Select>
                            )
                        }
                        <input type="date" value={formState.Date} onChange={(e) => setFormState({ ...formState, Date: e.target.value })} className='p-2 border-3 w-4/5  bg-white border-green-400 focus:outline-none rounded-lg font-bold' />
                    </div>

                </div>

                <div className='flex flex-col items-center p-2 gap-2'>
                    <h1 className='text-xl font-bold text-white'>Ana Bilgileri:</h1>
                    <div className='flex flex-row justify-center items-center gap-1'>
                        <Select
                            isRequired
                            className=""
                            value={selectorAna}
                            label="Statu"
                            placeholder="Statü Seçiniz"
                            onChange={handleAna}
                        >
                            {
                                ["iş Geliştirme", "Teklif", "Sözleşme", "Protokol"].map((e) => {
                                    return <SelectItem key={e}>{e}</SelectItem>
                                })
                            }
                        </Select>
                    </div>

                    {formState.Teklif.isTeklif && (
                        <>
                            <label className='text-white'>Başlangıç</label>
                            <input
                                type="date"
                                value={formState.Teklif.startDate}
                                onChange={(e) =>
                                    setFormState({
                                        ...formState,
                                        Teklif: { ...formState.Teklif, startDate: e.target.value }
                                    })
                                }
                                className="p-2 border-3 w-4/5 bg-white border-green-400 focus:outline-none rounded-lg font-bold"
                            />
                            <label className='text-white'>Bitiş</label>
                            <input
                                type="date"
                                value={formState.Teklif.endDate}
                                onChange={(e) =>
                                    setFormState({
                                        ...formState,
                                        Teklif: { ...formState.Teklif, endDate: e.target.value }
                                    })
                                }
                                className="p-2 border-3 w-4/5 bg-white border-green-400 focus:outline-none rounded-lg font-bold"
                            />
                        </>
                    )}

                    {formState.Contract.isContractSigned && (
                        <div className='flex flex-row w-full gap-1'>
                            <div className='flex flex-col w-full justify-center items-center gap-2'>
                                <input
                                    type="date"
                                    value={formState.Contract.startDate}
                                    onChange={(e) =>
                                        setFormState({
                                            ...formState,
                                            Contract: { ...formState.Contract, startDate: e.target.value }
                                        })
                                    }
                                    className="p-2 border-3 w-4/5 bg-white border-green-400 focus:outline-none rounded-lg font-bold"
                                />
                                <input
                                    type="date"
                                    value={formState.Contract.endDate}
                                    onChange={(e) =>
                                        setFormState({
                                            ...formState,
                                            Contract: { ...formState.Contract, endDate: e.target.value }
                                        })
                                    }
                                    className="p-2 border-3 w-4/5 bg-white border-green-400 focus:outline-none rounded-lg font-bold"
                                />
                            </div>
                            <div className='flex flex-col w-full justify-center items-center gap-2'>
                                <input
                                    value={formState.Contract.Amount}
                                    onChange={(e) => setFormState({ ...formState, Contract: { ...formState.Contract, Amount: e.target.value.trim() } })}
                                    placeholder="0"
                                    type="number"
                                    className='rounded-lg p-2 w-full'
                                />
                                <Select
                                    isRequired
                                    className="min-w-32"
                                    value={formState.Contract.ContractType}
                                    label="Sözleşme Tipi"
                                    placeholder="Sözleşme Tipi Seçiniz"
                                    onChange={handleContractTpye}
                                >
                                    {
                                        ["TÜBİTAK", "ÖZKAYNAK", "PROJE YAZMA", "TEKNOPARK", "Diğer"].map((e) => {
                                            return <SelectItem key={e}>{e}</SelectItem>
                                        })
                                    }
                                </Select>
                                {isDiger && (
                                    <Input
                                        label="Diğer"
                                        value={formState.Contract.ContractType}
                                        onChange={(e) => setFormState({ ...formState, Contract: { ...formState.Contract, ContractType: e.target.value.toUpperCase() } })}
                                        className="max-w-xs font-bold"
                                        placeholder={"Diğer türler"}
                                        type="text"
                                        variant="flat"
                                    />
                                )}
                                {isTUBİTAK && (
                                    <Input
                                        label="KOD"
                                        value={formState.Contract.ContractType}
                                        onChange={(e) => setFormState({ ...formState, Contract: { ...formState.Contract, ContractType: e.target.value.toUpperCase().trim() } })}
                                        className="max-w-xs font-bold"
                                        placeholder={"TÜBİTAK Kodu"}
                                        type="text"
                                        variant="flat"
                                    />
                                )}
                            </div>
                        </div>
                    )}
                    <Input
                        label="Açıklama"
                        value={formState.ConversationDetails}
                        onChange={(e) => setFormState({ ...formState, ConversationDetails: e.target.value })}
                        className="max-w-xs font-bold"
                        type="text"
                        variant="flat"
                    />
                </div>
            </div>
            <Button type="submit" variant='solid' className='mt-2 text-black font-bold border-2 bg-white border-green-300 p-3 rounded-xl'>Kaydet</Button>

        </form>
    );
}

export default Dataisertaion;
