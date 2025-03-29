import React, { useState } from 'react';
import Input from './Uİ/Input';
import { useEffect } from 'react';
import { Popover, PopoverContent, PopoverTrigger, table } from '@heroui/react';
import { Pagination } from '@heroui/pagination';
import Toast from './Uİ/Toast';
import { Button } from '@heroui/react';
import logo from '../assets/logo-beyaz.png'
import execl, { Workbook } from "exceljs"
import saveAs from "file-saver"


const DataFilter = () => {
    const [TableHeaders, setTableHeaders] = useState({
        Date: true,
        Contract: true,
        Teklif: true,
        Academics: true,
        isGelistirme: true,
        isProtocolSigned: true,
        CompanyNames: true,
        ConversationOwners: true,
        isArge: true,
        ConversationDetails: true
    })

    const [FormState, setFormState] = useState({
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
    })

    const [Filter, setFilter] = useState({ page: 1 })

    const [Data, setData] = useState({
        List: [],
        TotalPages: 1
    })

    const [isAll, setisAll] = useState(true)
    const [ToastState, setToastState] = useState({ status: false, text: "" })
    const [SelectorsData, setSelectorsData] = useState({
        Academics: [],
        CompanyNames: [],
        ContractType: [],
    })
    const [Users, setUsers] = useState([])
    const [isPdf, setisPdf] = useState(false)

    useEffect(() => {

        getSelectorsData()
        GetAllUsers()

    }, []);

    useEffect(() => {
        console.log("am here");
        getFilter()
    }, [Filter])



    const ReturnList = Data?.List.map((e, index) => {

        return (
            <tr className={`${index % 2 === 0 ? "text-white" : "text-black"}`} key={index}>

                <td className='w-9'><button onClick={() => {
                    navigator.clipboard.writeText(e._id)
                    alert("kopyalandı")
                }}>{index + 1 + (Filter.page * 15 - 15)}
                </button>
                </td>
                <td className={`${TableHeaders.Date || "hidden"}`}>{e.Date}</td>
                {
                    Object.keys(e).map((name) => {
                        if (name === "isGelistirme" || name === "isProtocolSigned" || name === "isArge") {
                            return (<td className={`${TableHeaders[name] || "hidden"}`}>
                                {
                                    e[name] ? "Var" : "Yok"
                                }
                            </td>)
                        } else if (name === "ConversationOwners" || name === "Academics" || name === "CompanyNames" || name === "ConversationDetails") {
                            return (<td className={`${TableHeaders[name] || "hidden"} text-wrap break-words`} onMouseEnter={() => handleMouseEnter(name, e)} onMouseLeave={() => handleMouseLeave()}>
                                {
                                    name !== "Academics" ? (e[name].length > 100 ? e[name].slice(0, 10) + "..." : e[name]) : e[name].AcademicNames.length > 150 ? e[name].AcademicNames.slice(0, 15) + "..." : e[name].AcademicNames
                                }
                            </td>)
                        } else if (name === "Teklif" || name === "Contract") {
                            return (<td className={`${TableHeaders[name] || "hidden"}`} onMouseEnter={() => handleMouseEnter(name, e)} onMouseLeave={() => handleMouseLeave()}>
                                {
                                    name === "Contract" ? e[name].isContractSigned ? e[name].ContractType : "Yok" : e[name].isTeklif ? "Var" : "Yok"
                                }
                            </td>)
                        }
                    })
                }
            </tr>
        )
    })

    const createPdfWithPagination = async (tableName) => {
        const html2pdf = (await import('html2pdf.js')).default
        //Table
        const logoElement = document.createElement('div');
        const logoImg = document.createElement('img');
        const Table = document.createElement("table")
        const Thead = document.createElement("thead")
        const Tbody = document.createElement("tbody")
        const TheadRow = document.createElement("tr")
        //styling
        Table.style.width = '100%';
        Table.style.maxWidth = '100%';
        Table.style.tableLayout = 'fixed';
        Table.style.fontSize = '8px';
        logoImg.src = logo;
        logoImg.style.width = '50%';
        logoImg.style.maxWidth = '300px';
        logoElement.style.textAlign = 'center';
        logoElement.className = "bg-black"
        //thNO
        const thNo = document.createElement("th")
        thNo.innerHTML = "No"
        TheadRow.appendChild(thNo)

        Object.keys(TableHeaders).forEach((e) => {
            if (TableHeaders[e]) {
                const th = document.createElement("th")
                th.className = "break-words text-wrap"
                th.innerHTML = {
                    isArge: "Arge Merkezi",
                    Teklif: "Teklif",
                    isGelistirme: "İş Geliştirme",
                    isProtocolSigned: "Protokol",
                    Academics: "Akademisyen",
                    CompanyNames: "Firma",
                    Contract: "Sözleşme",
                    Date: "Tarih",
                    ConversationOwners: "Görüşmeyi YK.",
                    ConversationDetails: "Detay",
                }[e]
                TheadRow.appendChild(th)
            }
        })
        Thead.appendChild(TheadRow)

        Data.List.map((Conversation, index) => {
            const tr = document.createElement("tr")
            const tdNO = document.createElement("td")
            tdNO.innerHTML = index + 1 + (Filter.page * 15 - 15)
            tr.appendChild(tdNO)
            tr.className = index % 2 === 0 ? "text-white border-0" : "text-black  border-0"
            // tr.style.pageBreakAfter = index % 5 == 0 ? 'always' : 'avoid';
            if (TableHeaders["Date"]) {
                const tdDate = document.createElement("td")
                tdDate.innerHTML = Conversation["Date"]
                tr.appendChild(tdDate)
            }
            Object.keys(Conversation).map((name) => {
                if (TableHeaders[name] && name !== "Date") {
                    const td = document.createElement("td")
                    if (name === "isGelistirme" || name === "isProtocolSigned" || name === "isArge") {
                        td.innerHTML = Conversation[name] ? "Var" : "Yok"
                    } else if (name === "ConversationOwners" || name === "Academics" || name === "CompanyNames" || name === "ConversationDetails") {
                        console.log(Conversation, name);
                        td.innerHTML = name !== "Academics" ? (Conversation[name].length > 100 ? Conversation[name].slice(0, 50) + "..." : Conversation[name]) : Conversation[name].AcademicNames.length > 100 ? Conversation[name].AcademicNames.slice(0, 50) + "..." : Conversation[name].AcademicNames
                    } else if (name === "Teklif" || name === "Contract") {
                        td.innerHTML = name === "Contract" ? Conversation[name].isContractSigned ? Conversation[name].ContractType : "Yok" : Conversation[name].isTeklif ? "Var" : "Yok"
                    }
                    tr.appendChild(td)
                }
            })
            Tbody.appendChild(tr)
        })
        logoElement.appendChild(logoImg)
        Table.appendChild(logoElement)
        Table.appendChild(Thead)
        Table.appendChild(Tbody)
        // pdf.appendChild(Table)


        const opt = {
            margin: 1,
            filename: `${tableName}_${new Date().toISOString().split('T')[0]}.pdf`,
            html2canvas: {
                scale: 3,
                logging: false,
                useCORS: true,
                allowTaint: true,
            },
            image: { type: 'png', quality: 1 },
            jsPDF: {
                unit: "mm",
                format: "a4",
                orientation: "landscape"
            },
            pagebreak: { mode: ['css', 'legacy'] }
        };

        return new Promise((resolve, reject) => {
            try {
                html2pdf()
                    .set(opt)
                    .from(Table)
                    .save()
                    .then(() => resolve())
                    .catch(reject);
            } catch (error) {
                console.error('PDF generation error:', error);
                reject(error);
            }
        });
    };

    const useExecl = async () => {
        try {
            const workbook = new execl.Workbook()
            const targetFile = workbook.addWorksheet("Filtre")
            const Header = []

            Object.keys(TableHeaders).map((e) => {
                TableHeaders[e] && Header.push({
                    isArge: "Arge Merkezi",
                    Teklif: "Teklif",
                    isGelistirme: "İş Geliştirme",
                    isProtocolSigned: "Protokol",
                    Academics: "Akademisyen",
                    CompanyNames: "Firma",
                    Contract: "Sözleşme",
                    Date: "Tarih",
                    ConversationOwners: "Görüşmeyi YK.",
                    ConversationDetails: "Detay",
                }[e])
            })

            targetFile.addRow(Header)

            const headerStyle = {
                font: {
                    bold: true,
                    size: 12,
                    color: { argb: 'FFFFFF' },
                },
                alignment: {
                    horizontal: 'center',
                    vertical: 'middle',
                },
                fill: {
                    type: 'pattern',
                    pattern: 'solid',
                    fgColor: { argb: '4F81BD' },
                },
            };


            const header = targetFile.getRow(1)

            header.eachCell((e) => {
                e.style = headerStyle
            })


            let Body = []

            Data.AllList.map((Conv) => {

                Object.keys(TableHeaders).map((e) => {
                    if (TableHeaders[e]) {
                        switch (e) {
                            case "Contract":
                                const isContract = Conv[e].isContractSigned
                                if (!isContract) {
                                    Body.push("Boş")
                                    break
                                }
                                const Amount = Conv[e].Amount.toLocaleString() + "TL";
                                const ContractType = Conv[e].ContractType
                                const StartDate = Conv[e].startDate
                                const endDate = Conv[e].endDate
                                console.log(Conv, ContractType, StartDate, Amount);
                                const merge = `${ContractType} -- ${StartDate}/${endDate} -- ${Amount}`
                                Body.push(merge)
                                break;
                            case "Teklif":
                                const isTeklif = Conv[e].isTeklif
                                if (!isTeklif) {
                                    Body.push("Boş")
                                    break;
                                }
                                const StartDateT = Conv[e].startDate
                                const endDateT = Conv[e].endDate
                                const mergeT = `${StartDateT}/${endDateT}`
                                Body.push(mergeT)
                                break;
                            case "Academics":
                                const Academic = Conv[e].AcademicNames
                                Body.push(Academic)
                                break;
                            default:
                                Body.push(Conv[e])
                                break;
                        }
                    }
                })
                targetFile.addRow(Body,)
                Body = [];
            })

            targetFile.columns.forEach(column => {
                let maxLength = 0;
                column.eachCell({ includeEmpty: true }, (cell) => {
                    if (cell.value) {
                        maxLength = Math.max(maxLength, cell.value.toString().length);
                    }
                });
                column.width = maxLength + 2;
            });

            const buffer = await workbook.xlsx.writeBuffer()
            const blob = new Blob([buffer], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            })
            saveAs(blob, "testxls")
        } catch (error) {
            console.log("useExecl: ", error);
        }
    }

    const UsePdf = async () => {
        await createPdfWithPagination("tablo")
    }

    const handleMouseEnter = (name, data) => {
        if (name === "Teklif") {
            setToastState({ status: true, text: `Başlangıç:${data[name].startDate} \n Bitiş:${data[name].endDate}` })
        } else if (name === "Contract") {
            setToastState({ status: true, text: `Başlangıç:${data[name].startDate} \n Bitiş:${data[name].endDate} \n Tutar:${data[name].Amount}` })
        }
        else if (name === "ConversationOwners" || name === "Academics") {
            const text = name === "Academics" ? data[name].AcademicNames : data[name]
            setToastState({ status: true, text })
        }
        else {
            setToastState({ status: true, text: data[name] })
        }
    }

    const handleMouseLeave = () => {
        setToastState({ status: false, text: "" })
    }

    const GetAllUsers = async () => {
        try {
            const users = await window.electron.ipcRenderer.invoke("GetAllUserNames", "");
            setUsers(users);
        } catch (error) {
            console.log("GetAllUsers: ", error);
        }
    }

    const getFilter = async () => {
        try {
            const newFilter = await window.electron.ipcRenderer.invoke("Filter", Filter)
            const Data = JSON.parse(newFilter)
            console.log(Data);
            setData(Data)
        } catch (error) {
            console.log("getFilter: ", error);
        }
    }

    const handleisAll = (e) => {

        if (e.target.checked) {
            setisAll(true)
            setTableHeaders({
                Date: true,
                Contract: true,
                Teklif: true,
                Academics: true,
                isGelistirme: true,
                isProtocolSigned: true,
                CompanyNames: true,
                ConversationOwners: true,
                isArge: true,
                ConversationDetails: true
            })
        }
        else {
            setisAll(false)
            setTableHeaders({
                Date: false,
                Contract: false,
                Teklif: false,
                Academics: false,
                isGelistirme: false,
                isProtocolSigned: false,
                CompanyNames: false,
                ConversationOwners: false,
                isArge: false,
                ConversationDetails: false
            })
        }
    }

    const getSelectorsData = async () => {
        try {
            const data = await window.electron.ipcRenderer.invoke("getAllComponeyNamesAndAcademics", "")
            setSelectorsData(JSON.parse(data))
        } catch (error) {
            console.log("getSelectorsData:", error);
        }
    }

    const handleFilter = (e) => {
        console.log(e.target.name);
        const target = e.target.name
        const newData = { ...FormState }
        const newFilter = { ...Filter }
        if (target === "isArge" || target === "isProtocolSigned" || target === "isGelistirme") {
            newData[target] = e.target.checked
            e.target.checked ? newFilter[target] = e.target.checked : delete newFilter[target];
        }
        else if (target === "Date" || target === "ConversationOwners" || target === "CompanyNames") {
            newData[target] = e.target.value
            e.target.value ? newFilter[target] = e.target.value : delete newFilter[target];
        }
        else if (target === "Academics") {
            newData[target].AcademicNames = e.target.value
            newData[target].isAcademicJoined = e.target.value === "" ? false : true
            e.target.value ? newFilter[target] = { AcademicNames: e.target.value, isAcademicJoined: true } : delete newFilter[target];
        }
        else {
            newData[target] = target === "Teklif" ? { ...FormState.Teklif, isTeklif: e.target.checked } : { ...FormState.Contract, isContractSigned: e.target.value === "" ? false : true, ContractType: e.target.value }
            if (target === "Teklif") {
                e.target.checked ? newFilter[target] = { isTeklif: e.target.checked } : delete newFilter[target];
            }
            else {
                e.target.value ? newFilter[target] = { isContractSigned: true, ContractType: e.target.value } : delete newFilter[target];
            }
        }
        console.log(newData, newFilter);
        setFormState(newData)
        setFilter(newFilter)
    }


    return (
        <div className='w-screen h-full overflow-auto flex flex-col  justify-start items-start '>
            <Toast text={ToastState.text} isVisible={ToastState.status} />

            <div className='flex flex-row gap-3 ml-2 mt-6 mb-2'>

                <div className='flex flex-row gap-3 pr-3  border-r-2 border-green-300 ' >

                    <div className='flex flex-col gap-2'>
                        <div className='flex justify-between items-center gap-2 '>
                            <h1 className='text-white   font-bold'>Sözleşme:</h1>
                            <input type="checkbox" name='Contract' checked={TableHeaders.Contract} onChange={(e) => setTableHeaders({ ...TableHeaders, Contract: e.target.checked })} className='h-6 w-6 accent-green-300 ' />
                        </div>

                        <div className='flex justify-between items-center gap-2 '>
                            <h1 className='text-white  font-bold'>Arge Merkezi:</h1>
                            <input type="checkbox" name='isArge' checked={TableHeaders.isArge} onChange={(e) => setTableHeaders({ ...TableHeaders, isArge: e.target.checked })} className='h-6 w-6 accent-green-300 ' />
                        </div>

                        <div className='flex justify-between items-center gap-2 '>
                            <h1 className='text-white   font-bold'>Protokol:</h1>
                            <input type="checkbox" name='isProtocolSigned' checked={TableHeaders.isProtocolSigned} onChange={(e) => setTableHeaders({ ...TableHeaders, isProtocolSigned: e.target.checked })} className='h-6 w-6 accent-green-300 ' />
                        </div>
                    </div>

                    <div className='flex flex-col gap-2'>
                        <div className='flex justify-between items-center gap-2 '>
                            <h1 className='text-white  font-bold'>Akademisyen:</h1>
                            <input type="checkbox" name='AcademicName' checked={TableHeaders.Academics} onChange={(e) => setTableHeaders({ ...TableHeaders, Academics: e.target.checked })} className='h-6 w-6 accent-green-300 ' />
                        </div>

                        <div className='flex justify-between items-center gap-2 '>
                            <h1 className='text-white  font-bold'>Firma:</h1>
                            <input type="checkbox" name='CompanyNames' checked={TableHeaders.CompanyNames} onChange={(e) => setTableHeaders({ ...TableHeaders, CompanyNames: e.target.checked })} className='h-6 w-6 accent-green-300 ' />
                        </div>

                        <div className='flex justify-between items-center gap-2 '>
                            <h1 className='text-white   font-bold'>Tarih:</h1>
                            <input type="checkbox" name={"Date"} checked={TableHeaders.Date} onChange={(e) => setTableHeaders({ ...TableHeaders, Date: e.target.checked })} className='h-6 w-6 accent-green-300 ' />
                        </div>

                    </div>

                    <div className='flex flex-col gap-2'>
                        <div className='flex justify-between items-center gap-2 '>
                            <h1 className='text-white  font-bold'>Görüşmeyi Yapan Kişi:</h1>
                            <input type="checkbox" name='ConversationOwner' checked={TableHeaders.ConversationOwners} onChange={(e) => setTableHeaders({ ...TableHeaders, ConversationOwners: e.target.checked })} className='h-6 w-6 accent-green-300 ' />
                        </div>

                        <div className='flex justify-between items-center gap-2 '>
                            <h1 className='text-white  font-bold'>Teklif:</h1>
                            <input type="checkbox" name='Teklif' checked={TableHeaders.Teklif} onChange={(e) => setTableHeaders({ ...TableHeaders, Teklif: e.target.checked })} className='h-6 w-6 accent-green-300 ' />
                        </div>

                        <div className='flex justify-between items-center gap-2 '>
                            <h1 className='text-white   font-bold'>iş Geliştirme:</h1>
                            <input type="checkbox" name='isGelistirme' checked={TableHeaders.isGelistirme} onChange={(e) => setTableHeaders({ ...TableHeaders, isGelistirme: e.target.checked })} className='h-6 w-6 accent-green-300 ' />
                        </div>

                    </div>

                    <div className='flex flex-col gap-2'>

                        <div className='flex justify-between items-center gap-2 '>
                            <h1 className='text-white  font-bold'>Detay:</h1>
                            <input type="checkbox" name='ConversationDetails' checked={TableHeaders.ConversationDetails} onChange={(e) => setTableHeaders({ ...TableHeaders, ConversationDetails: e.target.checked })} className='h-6 w-6 accent-green-300 ' />
                        </div>

                        <div className='flex justify-between items-center gap-2 '>
                            <h1 className='text-white   font-bold'>Hepsi:</h1>
                            <input type="checkbox" checked={isAll} onChange={handleisAll} className='h-6 w-6 accent-green-300 ' />
                        </div>

                    </div>

                </div>

                <div className='flex flex-col gap-1'>

                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white  font-bold'>Akademisyen:</h1>
                        <select name='Academics' value={FormState.Academics.AcademicNames} onChange={handleFilter} className='min-w-28 p-2 border-2 border-white rounded-lg outline-none focus:border-2 focus:border-green-300 bg-black text-white'>
                            <option value="">Hepsi</option>
                            {SelectorsData.Academics.map((e, index) => {
                                return <option value={e} key={index}>{e}</option>
                            })}
                        </select>
                    </div>

                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white  font-bold'>Firma:</h1>
                        <select name='CompanyNames' value={FormState.CompanyNames} onChange={handleFilter} className='min-w-28 p-2 border-2 border-white rounded-lg outline-none focus:border-2 focus:border-green-300 bg-black text-white'>
                            <option value="">Hepsi</option>
                            {SelectorsData.CompanyNames.map((e, index) => {
                                return <option value={e} key={index}>{e}</option>
                            })}
                        </select>
                    </div>

                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white  font-bold'>Sözleşme:</h1>
                        <select name='Contract' value={FormState.Contract.ContractType} onChange={handleFilter} className='min-w-28 p-2 border-2 border-white rounded-lg outline-none focus:border-2 focus:border-green-300 bg-black text-white'>
                            <option value="">Hepsi</option>
                            {SelectorsData.ContractType.map((e, index) => {
                                return <option value={e} key={index}>{e}</option>
                            })}
                        </select>
                    </div>

                </div>


                <div className='flex flex-col gap-1 '>

                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white   font-bold'>Tarih:</h1>
                        <Input type={"date"} name={"Date"} value={FormState.Date} onchange={handleFilter} placeholder={"tarih"} />
                    </div>

                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white  font-bold'>Görüşenler:</h1>
                        <select name='ConversationOwners' value={FormState.ConversationOwners} onChange={handleFilter} className='min-w-28 p-2 border-2 border-white rounded-lg outline-none focus:border-2 focus:border-green-300 bg-black text-white'>
                            <option value="">Hepsi</option>
                            {Users.map((e, index) => {
                                return <option value={e} key={index}>{e}</option>
                            })}
                        </select>
                    </div>


                </div>

                <div className='flex flex-col gap-2  '>
                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white  font-bold'>Arge Merkezi:</h1>
                        <input type="checkbox" name='isArge' checked={FormState.isArge} onChange={handleFilter} className='h-6 w-6 accent-green-300 ' />
                    </div>


                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white   font-bold'>Protokol:</h1>
                        <input type="checkbox" name='isProtocolSigned' checked={FormState.isProtocolSigned} onChange={handleFilter} className='h-6 w-6 accent-green-300 ' />
                    </div>



                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white   font-bold'>iş Geliştirme:</h1>
                        <input type="checkbox" name='isGelistirme' checked={FormState.isGelistirme} onChange={handleFilter} className='h-6 w-6 accent-green-300 ' />
                    </div>

                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white   font-bold'>Teklif:</h1>
                        <input type="checkbox" name='Teklif' checked={FormState.Teklif.isTeklif} onChange={handleFilter} className='h-6 w-6 accent-green-300 ' />
                    </div>
                </div>

            </div>

            {/* table */}
            <div className="flex flex-col  flex-1 border-t-2 border-green-300">
                <table className="w-full border-collapse flex flex-col flex-1">
                    <thead className="border-b-2 border-white bg-black">
                        <tr>
                            <th className="w-9">No</th>
                            {Object.keys(TableHeaders).map((e) =>
                                TableHeaders[e] ? (
                                    <th key={e} className="break-words text-wrap">
                                        {{
                                            isArge: "Arge Merkezi",
                                            Teklif: "Teklif",
                                            isGelistirme: "İş Geliştirme",
                                            isProtocolSigned: "Protokol",
                                            Academics: "Akademisyen",
                                            CompanyNames: "Firma",
                                            Contract: "Sözleşme",
                                            Date: "Tarih",
                                            ConversationOwners: "Görüşmeyi YK.",
                                            ConversationDetails: "Detay",
                                        }[e]}
                                    </th>
                                ) : null
                            )}
                        </tr>
                    </thead>
                    <tbody className="bg-black flex-1">{ReturnList}</tbody>
                </table>
            </div>
            <div className='flex flex-row gap-2 justify-center items-center w-full h-min'>
                <Button variant="shadow" color='primary' onPress={UsePdf}>PDF</Button>
                <Pagination className='m-2' color='success' onChange={(e) => setFilter({ ...Filter, page: e })} variant='flat' page={Filter.page} total={Data.TotalPages} showControls />
                <Button variant="shadow" color='danger' onPress={useExecl}>EXECL</Button>
            </div>



        </div>
    );
}
export default DataFilter;
