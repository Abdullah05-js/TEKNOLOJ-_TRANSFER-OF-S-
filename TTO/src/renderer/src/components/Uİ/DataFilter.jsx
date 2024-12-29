import React from 'react';
import Input from './Input';


const DataFilter = () => {
    return (
        <div className='w-screen h-screen overflow-hidden  flex flex-col  justify-start items-center gap-7'>

            <div className='flex flex-row gap-3 mt-6'>

                <div className='flex flex-col gap-2'>
                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white  font-bold'>Arge Merkezi:</h1>
                        <input type="checkbox" className='h-6 w-6 accent-green-300 ' />
                    </div>


                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white  font-bold'>Arge Back:</h1>
                        <input type="checkbox" className='h-6 w-6 accent-green-300 ' />
                    </div>



                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white   font-bold'>Sürdürülebilirlik:</h1>
                        <input type="checkbox" className='h-6 w-6 accent-green-300 ' />
                    </div>


                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white   font-bold'>Protokol:</h1>
                        <input type="checkbox" className='h-6 w-6 accent-green-300 ' />
                    </div>
                </div>

                <div className='flex flex-col gap-1'>

                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white  font-bold'>Akademisyen:</h1>
                        <select className='min-w-28 p-2 border-2 border-white rounded-lg outline-none focus:border-2 focus:border-green-300 bg-black text-white'>
                            <option value="">Hepsi</option>
                            <option value="ÖZKAYNAK">ÖZKAYNAK</option>
                            <option value="TÜBİTAK">TÜBİTAK</option>
                            <option value="PROJE YAZMA">PROJE YAZMA</option>
                            <option value="TEKNOPARK">ÖZKAYNAK</option>
                        </select>
                    </div>

                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white  font-bold'>Firma:</h1>
                        <select className='min-w-28 p-2 border-2 border-white rounded-lg outline-none focus:border-2 focus:border-green-300 bg-black text-white'>
                            <option value="">Hepsi</option>
                            <option value="ÖZKAYNAK">ÖZKAYNAK</option>
                            <option value="TÜBİTAK">TÜBİTAK</option>
                            <option value="PROJE YAZMA">PROJE YAZMA</option>
                            <option value="TEKNOPARK">ÖZKAYNAK</option>
                        </select>
                    </div>

                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white  font-bold'>Sözleşme:</h1>
                        <select className='min-w-28 p-2 border-2 border-white rounded-lg outline-none focus:border-2 focus:border-green-300 bg-black text-white'>
                            <option value="">Hepsi</option>
                            <option value="ÖZKAYNAK">ÖZKAYNAK</option>
                            <option value="TÜBİTAK">TÜBİTAK</option>
                            <option value="PROJE YAZMA">PROJE YAZMA</option>
                            <option value="TEKNOPARK">ÖZKAYNAK</option>
                        </select>
                    </div>

                </div>


                <div className='flex flex-col gap-1 '>

                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white   font-bold'>Tarih:</h1>
                        <Input type={"date"} placeholder={"tarih"} />
                    </div>

                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white  font-bold'>Görüşmeyi Yapan Kişi:</h1>
                        <select className='min-w-28 p-2 border-2 border-white rounded-lg outline-none focus:border-2 focus:border-green-300 bg-black text-white'>
                            <option value="">Hepsi</option>
                            <option value="ÖZKAYNAK">ÖZKAYNAK</option>
                            <option value="TÜBİTAK">TÜBİTAK</option>
                            <option value="PROJE YAZMA">PROJE YAZMA</option>
                            <option value="TEKNOPARK">ÖZKAYNAK</option>
                        </select>
                    </div>

                    <div className='flex justify-between items-center gap-2 '>
                        <h1 className='text-white  font-bold'>Sektör:</h1>
                        <select className='min-w-28 p-2 border-2 border-white rounded-lg outline-none focus:border-2 focus:border-green-300 bg-black text-white'>
                            <option value="">Hepsi</option>
                            <option value="ÖZKAYNAK">ÖZKAYNAK</option>
                            <option value="TÜBİTAK">TÜBİTAK</option>
                            <option value="PROJE YAZMA">PROJE YAZMA</option>
                            <option value="TEKNOPARK">ÖZKAYNAK</option>
                        </select>
                    </div>

                </div>

            </div>




            {/* table */}
        <div className='flex flex-col justify-center items-center overflow-auto w-11/12 border-t-2  border-green-300'>

      
            <table className=' text-white p-2 mt-8'>

                <thead className='border-b-2 border-white'>
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
            
                <tbody className='bg-white'>
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




                </tbody>

            </table>

  </div>

        </div>
    );
}

export default DataFilter;
