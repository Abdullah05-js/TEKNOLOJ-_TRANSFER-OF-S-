import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import tr from 'date-fns/locale/tr'; // Turkish locale
import { format } from 'date-fns';
import { useEffect } from 'react';
import { pdf, Document, Page, Text, StyleSheet,Image} from '@react-pdf/renderer';
import logo from "../assets/logo-beyaz.png"

// Register Turkish locale
registerLocale('tr', tr);

//todo burdaki tüm tarih girişlerin düzeltilmesi


const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        padding: 20,
    },
    title: {
        fontSize: 20,
        marginBottom: 10,
        marginTop:10,
        textAlign: 'center',
    },
    content: {
        fontSize: 14,
        marginTop:10,
        lineHeight: 1.5,
        margin:5,
        textAlign:"center",
        textOverflow:"warp"
    },
    img:{
        backgroundColor:"black",
        justifyContent:"center",
        alignItems:"center",
        borderRadius:10,
        padding:4
    }
});

//pdf




const Stats = () => {

    // State for selected values
    const [selectedAkademisyen, setSelectedAkademisyen] = useState('');
    const [selectedDate, setSelectedDate] = useState({ local: (new Date()).toLocaleDateString(), normal: new Date() });
    const [mockAkademisyenler, setmockAkademisyenler] = useState([])
    const [mockStats, setmockStats] = useState({
        akademisyenSozlesme: 0,
        totalSozlesme: 0,
        totalProtokol: 0,
        totalGorevlendirme: 0
    })
    const [PDFdata, setPDFdata] = useState({ totalProtokol: 0, totalSozlesme: 0, companys: [], name: "" ,date:""});

    const MyDocument = () => (
        <Document>
            <Page size="A4" style={styles.page}>
                <Image src={logo} style={styles.img} />
                <Text style={styles.title}>{selectedAkademisyen}-{`${PDFdata.date.split(".")[1]}-${PDFdata.date.split(".")[2]}`}</Text>
                
                    <Text style={styles.content}>Aylik Protokol:{PDFdata.totalProtokol}</Text>
                    <Text style={styles.content}>Aylik Sozlesme:{PDFdata.totalSozlesme}</Text>
                    <Text style={styles.content}>Sirketler:{PDFdata.companys.map((e,index) => `${index === 0 ? "" : "-"}${e}`)}</Text>
                
            </Page>
        </Document>
    );

    // Mock data for akademisyenler
    const GetAkademik = async () => {
        const Akademisyenler = await window.electron.ipcRenderer.invoke("GetAkademisyenler", "");
        setmockAkademisyenler(Akademisyenler);
    }

    const getFilterData = async () => {
        console.log(selectedDate);
        const Veriler = await window.electron.ipcRenderer.invoke("GetFilter", { AcademicName: selectedAkademisyen, year: selectedDate.local.split(".")[2], month: selectedDate.local.split(".")[1] });
        setmockStats(Veriler);
    }

    const PDFfilter = async () => {
        const data = await window.electron.ipcRenderer.invoke("Filter", { AcademicName: selectedAkademisyen })
        const arr = data.filter((e) => `${e.Date.split("-")[0]}-${e.Date.split("-")[1]}}` === `${selectedDate.local.split(".")[2]}-${selectedDate.local.split(".")[1]}}`)
        const totalP = arr.filter((e) => e.isProtocolSigned);
        const totalG = arr.filter((e) => e.isContractSigned);
        const companys = arr.map((e) => e.CompanyNames);

        setPDFdata({
            totalProtokol: totalP.length,
            totalSozlesme: totalG.length,
            companys: companys,
            name: selectedAkademisyen,
            date:selectedDate.local
        })
    }

    useEffect(() => {
        GetAkademik();
        getFilterData();
        console.log(selectedDate);
    }, []);


    useEffect(() => {
        getFilterData();
        PDFfilter();
    }, [selectedAkademisyen, selectedDate]);


    // Function to handle akademisyen change
    const handleAkademisyenChange = (e) => {
        setSelectedAkademisyen(e.target.value);
    };


    const handlePdf = async () => {
        const blob = await pdf(<MyDocument />).toBlob();
        const arrayBuffer = await blob.arrayBuffer();
        const status = await window.electron.ipcRenderer.invoke("PDF", { arrayBuffer, name: selectedAkademisyen });
        status ? alert("pdf oluşturuldu") : alert("Hatta oluştu");
    }

    // Custom styles for the date picker
    const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
        <button
            className="text-white bg-transparent hover:border-green-300 hover:border-2 rounded-xl border-white border-2 p-2 focus:border-green-300 focus:border-2 outline-none min-w-[200px] text-left"
            onClick={onClick}
            ref={ref}
        >
            {value}
        </button>
    ));

    return (
        <div className='w-screen h-screen overflow-hidden flex flex-col justify-center items-center gap-7 p-6'>
            <h1 className='text-3xl font-bold text-green-300'>İstatistikler</h1>

            {/* Selection Form */}
            <div className='w-full max-w-2xl flex flex-col gap-6'>
                <div className='flex gap-4 justify-between items-center'>
                    <select
                        value={selectedAkademisyen}
                        onChange={handleAkademisyenChange}
                        className='flex-1 text-white bg-transparent hover:border-green-300 hover:border-2 rounded-xl border-white border-2 p-2 focus:border-green-300 focus:border-2 outline-none'
                    >
                        <option value="" className='bg-black'>Akademisyen Seçin</option>
                        {mockAkademisyenler.map((akademisyen, index) => {
                            if (akademisyen !== undefined) {
                                return (
                                    <option key={index} value={akademisyen} className='bg-black'>
                                        {akademisyen}
                                    </option>
                                )
                            }

                        })}
                    </select>
                    <DatePicker
                        selected={selectedDate.normal}
                        onChange={date => setSelectedDate({ local: date.toLocaleDateString(), normal: date })}
                        dateFormat="MMMM yyyy"
                        showMonthYearPicker
                        locale="tr"
                        customInput={<CustomInput />}
                        className="react-datepicker-custom"
                    />
                </div>

                {/* Selected Akademisyen Stats */}
                {selectedAkademisyen && selectedDate && (
                    <div className='p-4 border-2 border-green-300 rounded-xl'>
                        <h2 className='text-white text-xl mb-2'>Seçilen Akademisyen İstatistikleri</h2>
                        <p className='text-green-300'>
                            {selectedAkademisyen} - {format(selectedDate.normal, 'MMMM yyyy', { locale: tr })}
                        </p>
                        <p className='text-white mt-2'>
                            Sözleşme Sayısı: <span className='text-green-300'>{mockStats.akademisyenSozlesme}</span>
                        </p>
                    </div>
                )}

                {/* Monthly Stats */}
                <div className='grid grid-cols-3 gap-4 mt-4'>
                    <div className='p-4 border-2 border-white rounded-xl hover:border-green-300 transition-colors'>
                        <h3 className='text-green-300 text-lg mb-2'>Aylık Sözleşme</h3>
                        <p className='text-4xl text-white font-bold'>{mockStats.totalSozlesme}</p>
                    </div>
                    <div className='p-4 border-2 border-white rounded-xl hover:border-green-300 transition-colors'>
                        <h3 className='text-green-300 text-lg mb-2'>Aylık Protokol</h3>
                        <p className='text-4xl text-white font-bold'>{mockStats.totalProtokol}</p>
                    </div>
                    <div className='p-4 border-2 border-white rounded-xl hover:border-green-300 transition-colors'>
                        <h3 className='text-green-300 text-lg mb-2'>Aylık Görevlendirme</h3>
                        <p className='text-4xl text-white font-bold'>{mockStats.totalGorevlendirme}</p>
                    </div>
                </div>







                <button
                    onClick={handlePdf}
                    className='px-6 py-2 bg-green-300 text-black rounded-xl font-bold hover:bg-green-400 transition-colors'
                >
                    Aylık Rapor Oluştur
                </button>








            </div>

            {/* Custom styles for the date picker */}
            <style>{`
                .react-datepicker {
                    background-color: black !important;
                    border: 2px solid #00ff88 !important;
                    border-radius: 0.75rem !important;
                    font-family: inherit !important;
                }
                .react-datepicker__header {
                    background-color: black !important;
                    border-bottom: 1px solid #00ff88 !important;
                }
                .react-datepicker__current-month {
                    color: #00ff88 !important;
                }
                .react-datepicker__month {
                    background-color: black !important;
                }
                .react-datepicker__month-text {
                    color: white !important;
                    padding: 0.5rem !important;
                }
                .react-datepicker__month-text:hover {
                    background-color: #00ff88 !important;
                    color: black !important;
                }
                .react-datepicker__month-text--selected {
                    background-color: #00ff88 !important;
                    color: black !important;
                }
                .react-datepicker__triangle {
                    display: none !important;
                }
                .react-datepicker-popper {
                    padding-top: 0 !important;
                }
            `}</style>
        </div>
    );
};



export default Stats; 