import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import tr from 'date-fns/locale/tr'; // Turkish locale
import { format } from 'date-fns';
import { useEffect } from 'react';
import { pdf, Document, Page, Text, StyleSheet } from '@react-pdf/renderer';


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
        textAlign: 'center',
    },
    content: {
        fontSize: 14,
        lineHeight: 1.5,
        marginBottom: 10,
    },
});

//pdf
const MyDocument = () => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.title}>Merhaba, React-PDF!</Text>
            <Text style={styles.content}>
                iyimiş kıral
            </Text>
        </Page>
    </Document>
);



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

    useEffect(() => {
        GetAkademik();
        getFilterData();
        console.log(selectedDate);
    }, []);



    useEffect(() => {
        getFilterData();
    }, [selectedAkademisyen, selectedDate]);


    // Function to handle akademisyen change
    const handleAkademisyenChange = (e) => {
        setSelectedAkademisyen(e.target.value);
    };


    const handlePdf = async () => {
        //this is the prompt for the ai
        //You are tasked to analyze provided data related to academic collaborations and return a structured array containing data summaries for each academic name. Your goals are as follows:

        // 1. **Create a summary object for each unique `AcademicName`.**
        // 2. **In each object, include the following fields:**
        //    - `AcademicName`: The name of the academic.
        //    - `TotalContractsSignedByMonth`: An object where the keys are month names and the values are the total number of `ContractSigned` entries for that month.
        //    - `TotalProtocolsSignedByMonth`: An object where the keys are month names and the values are the total number of `ProtocolSigned` entries for that month.
        //    - `CompaniesWorkedWith`: An array of unique company names (`CompanyNames`) with which the academic has engaged.
        // 3. **Ensure the summary is accurate and concise**, accounting for cases with zero entries for protocols or contracts signed.

        // # Steps
        // - Parse the input array of objects to extract a list of unique `AcademicNames`.
        // - For each `AcademicName`, calculate totals for `ProtocolSigned` and `ContractSigned` grouped by month.
        // - Gather a list of unique `CompanyNames` relevant to each academic.
        // - Structure the output as an array of summary objects for each academic.

        // # Output Format
        // - A structured array in the following format:
        // ```json
        // [
        //   {
        //     "AcademicName": "[Name]",
        //     "TotalContractsSignedByMonth": {"January": [value], "February": [value], ...},
        //     "TotalProtocolsSignedByMonth": {"January": [value], "February": [value], ...},
        //     "CompaniesWorkedWith": ["[Company1]", "[Company2]", ...]
        //   },
        //   ...
        // ]
        // ```  

        // # Example
        // Given the input array:
        // ```json
        // [
        //   {"_id": "1", "Date": "2025-02-21", "CompanyNames": "KOUBOOK", "isProtocolSigned": true, "isContractSigned": false, "AcademicName": "IRFAN"},
        //   {"_id": "2", "Date": "2025-02-21", "CompanyNames": "KOUBOOK", "isProtocolSigned": false, "isContractSigned": true, "AcademicName": "IRFAN"},
        //   {"_id": "3", "Date": "2025-02-22", "CompanyNames": "TECHCORP", "isProtocolSigned": true, "isContractSigned": false, "AcademicName": "ALICE"}
        // ]
        // ```
        // The output should resemble:
        // ```json
        // [
        //   {
        //     "AcademicName": "IRFAN",
        //     "TotalContractsSignedByMonth": {"January": 0, "February": 1},
        //     "TotalProtocolsSignedByMonth": {"January": 0, "February": 1},
        //     "CompaniesWorkedWith": ["KOUBOOK"]
        //   },
        //   {
        //     "AcademicName": "ALICE",
        //     "TotalContractsSignedByMonth": {"January": 0, "February": 0},
        //     "TotalProtocolsSignedByMonth": {"January": 0, "February": 1},
        //     "CompaniesWorkedWith": ["TECHCORP"]
        //   }
        // ]
        // ```

        // # Notes
        // - Handle cases where there are no contracts or protocols signed in a particular month by ensuring the corresponding value is `0` or appropriately mentioned.


        //--------------------------------Creating the PDF
        const blob = await pdf(<MyDocument />).toBlob();
        const arrayBuffer = await blob.arrayBuffer();
        const status = await window.electron.ipcRenderer.invoke("PDF", arrayBuffer);
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
                    Yapay Zeka ile Aylık Rapor Oluştur
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