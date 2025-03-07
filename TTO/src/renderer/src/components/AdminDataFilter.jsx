import { useState } from 'react';
import { Select, SelectItem } from "@heroui/react";

const AdminDataFilter = () => {
  const [data, setData] = useState({
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "argeMerkezi": "Var",
    "argeBackOd": "yok",
    "surdurulebilirlik": "yok",
    "protokol": "yok",
    "akademisyen": ['Abdullah Han', 'Arif Can Güneş', 'Selçuk Öz'],
    "firma": "Baykar",
    "sozlesme": "TEKNOPARK",
    "tarih": "2025-12-12",
    "gorusmeyiYk": ['Abdullah Han', 'Arif Can Güneş', 'Selçuk Öz'],
    "sektor": "EĞİTİM"
  });


  const [dataForm, setDataForm] = useState({
    isArge: true,
    isArgeBackStatus: true,
    isSurdurulebilirlik: false,
    isProtocolSigned: true,
    akademisyenler: ['Arif Can Güneş'],
    companyName: 'Baykar',
    contractType: '',
    date: "2025-25-12",
    conversationOwner: ['arifcanGüneş', 'selcukOz'],
    Sector: "Eğitim",
  });

  const [update, setUpdate] = useState(false);

  const handleSubmit = () => {
    if (!update) {
      setUpdate(true);
    }
    else {
      console.log(dataForm);
    }
  };

  const handleChange = (e) => {
    console.log(e.target.value);
    setDataForm({
      ...dataForm,
      [e.target.name]: e.target.value.includes(",") ? e.target.value.split(",") : e.target.value
    })
  }

  return (
    <div className='flex flex-col items-center gap-6s overflow-y-auto scrollbar-hide'>
      <div className='flex flex-col items-center gap-2 justify-center text-white'>
        <label htmlFor="dataId">Aramak istediğiniz kayıtın Id sini girin.</label>
        <div className="flex gap-2">
          <input className="outline-blue-300 px-2 rounded-sm" type="text" name="dataId" id="dataId" placeholder='Kayıt Id'/>
          <button className="rounded-sm bg-black border-1 border-white text-white font-medium px-3 hover:bg-white hover:text-black transition-colors duration-200 ease-in-out">Ara</button>
        </div>
      </div>
      {data && !update && (
        <div className="flex flex-col gap-3 border-2 rounded-md border-gray-400 px-7 py-5 text-white shadow-white my-8 w-[600px]">
          <div>
            <h2 className='text-center'>Kayıt Id</h2>
            <p className='text-center'>{data.id}</p>
          </div>
          <div className='grid grid-cols-3 gap-3'>
            <section>
              <p className='text-green-500'>Arge Merkezi</p>
              <p>{data.argeMerkezi}</p>
            </section>
            <section>
              <p className='text-green-500'>Arge Back DO.</p>
              <p>{data.argeBackOd}</p>
            </section>
            <section>
              <p className='text-green-500'>Sürdürülebilirlik</p>
              <p>{data.surdurulebilirlik}</p>
            </section>
            <section>
              <p className='text-green-500'>Protokol</p>
              <p>{data.protokol}</p>
            </section>
            <section>
              <p className='text-green-500'>Akademisyenler</p>
              <ul>{data.akademisyen.map((akademisyen, index) => (
                <li key={index}>
                  <span className='text-green-400'>{index + 1}</span> - {akademisyen}
                </li>
              ))}</ul>
            </section>
            <section>
              <p className='text-green-500'>Firma</p>
              <p>{data.firma}</p>
            </section>
            <section>
              <p className='text-green-500'>Sözleşme</p>
              <p>{data.sozlesme}</p>
            </section>
            <section>
              <p className='text-green-500'>Tarih</p>
              <p>{data.tarih}</p>
            </section>
            <section>
              <p className='text-green-500'>Görüşmeyi Yapan Kişiler</p>
              <ul>{data.gorusmeyiYk.map((gyk, index) => (
                <li key={index}>
                  <span className='text-green-400'>{index + 1}</span> - {gyk}
                </li>
              ))}</ul>
            </section>
            <section>
              <p className='text-green-500'>Sektör</p>
              <p>{data.sektor}</p>
            </section>
          </div>
          <div className='text-center'>
            <button onClick={handleSubmit} className='border-1 px-5 py-2 text-white rounded-md hover:bg-white hover:text-black duration-200 transition-colors ease-in-out'>{update ? 'Güncellemeyi Tamamla' : 'Güncelle'}</button>
          </div>
        </div>
      )}

      {data === null && (
        <p className='mt-10 text-white'>Herhangi bir kayıdın detayı sorgulanmadı.</p>
      )}

      {update && (
        <div className="flex flex-col gap-3 border-2 rounded-md border-gray-400 px-7 py-5 text-white shadow-white my-8 w-[600px]">
          <div>
            <h2 className='text-center'>Kayıt Id</h2>
            <p className='text-center'>{data.id}</p>
          </div>
          <div className='grid grid-cols-3 gap-3'>
            <section>
              <p className='text-green-500 mb-2'>Arge Merkezi</p>
              <select onChange={handleChange} className='text-black w-40 px-2 py-1 rounded-md cursor-pointer outline-blue-400' name="isArge" id="isArge">
                <option value="true">Yapıldı</option>
                <option value="false">Yapılmadı</option>
              </select>
            </section>
            <section>
              <p className='text-green-500 mb-2'>Arge Back DO.</p>
              <select onChange={handleChange} className='text-black w-[155px] px-2 py-1 rounded-md cursor-pointer outline-blue-400' name="isArgeBackStatus" id="isArgeBackStatus">
                <option value="true">Yapıldı</option>
                <option value="false">Yapılmadı</option>
              </select>
            </section>
            <section>
              <p className='text-green-500 mb-2'>Sürdürülebilirlik</p>
              <select value={dataForm.isSurdurulebilirlik ? "true" : "false"} onChange={handleChange} className='text-black w-[155px] px-2 py-1 rounded-md cursor-pointer outline-blue-400' name="isSurdurulebilirlik" id="isSurdurulebilirlik">
                <option value="true">Yapıldı</option>
                <option value="false">Yapılmadı</option>
              </select>
            </section>
            <section>
              <p className='text-green-500 mb-2'>Protokol</p>
              <select onChange={handleChange} className='text-black w-[155px] px-2 py-1 rounded-md cursor-pointer outline-blue-400' name="isProtocolSigned" id="isProtocolSigned">
                <option value="true">Yapıldı</option>
                <option value="false">Yapılmadı</option>
              </select>
            </section>
            <section>
              <p className='text-green-500 mb-[3px]'>Akademisyenler</p>
              <Select
                size='sm'
                radius='sm'
                onChange={handleChange}
                name='akademisyenler'
                className='px-2 py-1 relative right-2 placeholder-black'
                x placeholder="Akademisyenler"
                selectionMode="multiple"
              >
                <SelectItem key={'abdullahHan'}>Abdullah Han</SelectItem>
                <SelectItem key={'selcukOz'}>Selçuk Öz</SelectItem>
                <SelectItem key={'arifcanGüneş'}>Arif Can Güneş</SelectItem>
              </Select>
            </section>
            <section>
              <p className='text-green-500 mb-2'>Firma</p>
              <select value={dataForm.companyName} className='text-black w-[155px] px-2 py-1 rounded-md cursor-pointer outline-blue-400' name="companyName" id="companyName">
                <option value="baykar">Kou</option>
                <option value="baykar">Baykar</option>
              </select>
            </section>
            <section>
              <p className='text-green-500 mb-2'>Sözleşme</p>
              <select className='text-black w-[155px] px-2 py-1 rounded-md cursor-pointer outline-blue-400' name="sozlesme" id="sozlesme">
                <option value="true">Yapıldı</option>
                <option value="false">Yapılmadı</option>
              </select>
            </section>
            <section>
              <p className='text-green-500'>Tarih</p>
              <p>{data.tarih}</p>
            </section>
            <section>
              <p className='text-green-500'>Görüşmeyi Yapan Kişiler</p>
              <Select
                size='sm'
                onChange={handleChange}
                className='px-1 py-0 w-40'
                name='conversationOwner'
                placeholder="Görüşmeyi Y.K."
                selectionMode="multiple"
                selectedKeys={dataForm.conversationOwner}
              >
                <SelectItem key={'abdullahHan'}>Abdullah Han</SelectItem>
                <SelectItem key={'selcukOz'}>Selçuk Öz</SelectItem>
                <SelectItem key={'arifcanGüneş'}>Arif Can Güneş</SelectItem>
              </Select>
            </section>
            <section>
              <p className='text-green-500 mb-2'>Sektör</p>
              <select className='text-black w-[155px] px-2 py-1 rounded-md cursor-pointer outline-blue-400' name="sektor" id="sektor">
                <option value="egitim">Eğitim</option>
                <option value="sanayi">Sanayi</option>
              </select>
            </section>
          </div>
          <div className='text-center'>
            <button onClick={handleSubmit} className='border-1 px-5 py-2 text-white rounded-md hover:bg-white hover:text-black duration-200 transition-colors ease-in-out'>{update ? 'Güncellemeyi Tamamla' : 'Güncelle'}</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDataFilter