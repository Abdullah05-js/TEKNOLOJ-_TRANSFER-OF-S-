import React, { useState } from 'react';
import DatePicker, { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import tr from 'date-fns/locale/tr'; // Turkish locale
import { format } from 'date-fns';
import { useEffect } from 'react';
// Register Turkish locale
registerLocale('tr', tr);

//todo burdaki tüm tarih girişlerin düzeltilmesi

const Stats = () => {

    // State for selected values
    const [selectedAkademisyen, setSelectedAkademisyen] = useState('');
    const [selectedDate, setSelectedDate] = useState((new Date()).toISOString());
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
        const Veriler = await window.electron.ipcRenderer.invoke("GetFilter", { AcademicName: selectedAkademisyen, year: selectedDate.split("-")[0], month: selectedDate.split("-")[1] });
        setmockStats(Veriler);
    }

    useEffect(() => {
        GetAkademik();
        getFilterData
    }, []);



    useEffect(() => {
        getFilterData();
    }, [selectedAkademisyen, selectedDate]);


    // Function to handle akademisyen change
    const handleAkademisyenChange = (e) => {
        setSelectedAkademisyen(e.target.value);
    };

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
        <div className='w-screen h-screen overflow-hidden flex flex-col justify-start items-center gap-7 p-6'>
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
                        selected={selectedDate}
                        onChange={date => setSelectedDate(date.toISOString())}
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
                            {selectedAkademisyen} - {format(selectedDate, 'MMMM yyyy', { locale: tr })}
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