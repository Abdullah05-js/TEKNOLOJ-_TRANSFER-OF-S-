import { useEffect, useState } from 'react';
import { Select, SelectItem } from "@heroui/react";

const AdminDataFilter = () => {
  const [data, setData] = useState(null);
  const [dataForm, setDataForm] = useState(null);
  const [id, setId] = useState(null);
  const [isDataFound, setIsDataFound] = useState(false);
  const [isSearched, setIsSearched] = useState(false);
  const [update, setUpdate] = useState(false);
  const [akademiks, setAkademiks] = useState(null);
  const [sectors, setSectors] = useState(null);
  const [users, setUsers] = useState(null);
  const [companies, setCompanies] = useState(null);
  const [dealTypes, setDealTypes] = useState(null)

  const createAkademics = () => {
    let elements = [];
    akademiks.map((array) => {
      array.map((e) => {
        if (!elements.includes(e)) {
          elements.push(e)
        }
      })
    })
    setAkademiks(elements);
  }

  const createSectors = () => {
    let elements = [];
    sectors.map((sector) => {
      if (!elements.includes(sector)) {
        elements.push(sector)
      }
    })
    setSectors(elements);
  }

  const createCompanies = () => {
    let elements = [];
    companies.map((company) => {
      if (!elements.includes(company)) {
        elements.push(company)
      }
    })
    setCompanies(elements);
  }

  const createDealTypes = () => {
    let elements = [];
    dealTypes.map((DealType) => {
      if (!elements.includes(DealType)) {
        elements.push(DealType)
      }
    })
    setDealTypes(elements);
  }

  useEffect(() => {
    const fetchAllData = async () => {
      const response = await window.electron.ipcRenderer.invoke('GetSelectors', "")
      console.log(response);
      setAkademiks(response.Akademiks);
      setSectors(response.Sektor);
      setUsers(response.Users);
      setCompanies(response.Companies);
      setDealTypes(response.DealType);
    };

    fetchAllData();
  }, [])

  const handleUpdateChange = () => {
    if (!update) {
      setUpdate(true);
      createAkademics();
      createSectors();
      createCompanies();
      createDealTypes();
    }
  }

  const handleSubmit = async () => {
    console.log(data);
    console.log(dataForm);

    const response = await window.electron.ipcRenderer.invoke('SetOneConversation', {
      data: dataForm,
      id: id
    });
  };

  const handleChange = (e) => {
    console.log(e.target.name == 'ContractType' && e.target.value != "Anlaşma yok");

    let updatedForm = {
      ...dataForm,
      [e.target.name]: e.target.value.includes(",") ? e.target.value.split(",") : e.target.value === 'true' ? true : e.target.value === 'false' ? false : e.target.value
    };

    if (e.target.name == 'ContractType') {
      if (e.target.value != "Anlaşma yok") {
        updatedForm.isContractSigned = true;
      } else {
        updatedForm.isContractSigned = false;
      }
    }

    setDataForm(updatedForm);


  }

  const handleSearch = async () => {
    if (id) {
      const response = await window.electron.ipcRenderer.invoke('GetOneConversation', id);
      const responseData = JSON.parse(response);
      console.log(responseData);
      setIsSearched(true);
      if (responseData) {
        setData(responseData);
        setDataForm(responseData);
        setIsDataFound(true);
      }
      else {
        setIsDataFound(false);
      }
    }
  }

  return (
    <div className='flex flex-col items-center gap-6s overflow-y-auto scrollbar-hide'>
      <div className='flex flex-col items-center gap-2 justify-center text-white'>
        <label htmlFor="dataId">Aramak istediğiniz kayıtın Id sini girin.</label>
        <div className="flex gap-2">
          <input onChange={(e) => setId(e.target.value)} className="text-black px-2 rounded-sm" type="text" name="dataId" id="dataId" placeholder='Kayıt Id' />
          <button className="rounded-sm bg-black border-1 border-white text-white font-medium px-3 hover:bg-white hover:text-black transition-colors duration-200 ease-in-out" onClick={handleSearch}>Ara</button>
        </div>
      </div>
      {isSearched && isDataFound && !update && (
        <div className="flex flex-col gap-3 border-2 rounded-md border-gray-400 px-7 py-5 text-white shadow-white my-8 w-[600px]">
          <div>
            <h2 className='text-center'>Kayıt Id</h2>
            <p className='text-center'>{dataForm._id}</p>
          </div>
          <div className='grid grid-cols-3 gap-3'>
            <section>
              <p className='text-green-500'>Arge</p>
              <p>{dataForm.isArge ? 'Var' : 'Yok'}</p>
            </section>
            <section>
              <p className='text-green-500'>Arge Back DO.</p>
              <p>{dataForm.isArgeBackStatus ? 'Var' : 'Yok'}</p>
            </section>
            <section>
              <p className='text-green-500'>Sürdürülebilirlik</p>
              <p>{dataForm.isSurdurulebilirlik ? 'Var' : 'Yok'}</p>
            </section>
            <section>
              <p className='text-green-500'>Protokol</p>
              <p>{dataForm.isProtocolSigned ? 'Var' : 'Yok'}</p>
            </section>
            <section>
              <p className='text-green-500'>Akademisyenler</p>
              <ul>{dataForm.AcademicName.map((akademisyen, index) => (
                <li key={index}>
                  <span className='text-green-400'>{index + 1}</span> - {akademisyen}
                </li>
              ))}</ul>
            </section>
            <section>
              <p className='text-green-500'>Firma</p>
              <p>{dataForm.CompanyNames}</p>
            </section>
            <section>
              <p className='text-green-500'>Sözleşme</p>
              <p>{dataForm.ContractType}</p>
            </section>
            <section>
              <p className='text-green-500'>Tarih</p>
              <p>{dataForm.Date}</p>
            </section>
            <section>
              <p className='text-green-500'>Görüşmeyi Yapan Kişiler</p>
              <ul>{dataForm.ConversationOwner.map((gyk, index) => (
                <li key={index}>
                  <span className='text-green-400'>{index + 1}</span> - {gyk}
                </li>
              ))}</ul>
            </section>
            <section>
              <p className='text-green-500'>Sektör</p>
              <p>{dataForm.Sector}</p>
            </section>
          </div>
          <div className='text-center'>
            <button onClick={handleUpdateChange} className='border-1 px-5 py-2 text-white rounded-md hover:bg-white hover:text-black duration-200 transition-colors ease-in-out'>{update ? 'Güncellemeyi Tamamla' : 'Güncelle'}</button>
          </div>
        </div>
      )}

      {!isSearched && (
        <p className='mt-10 text-white'>Herhangi bir kayıdın detayı sorgulanmadı.</p>
      )}

      {!isDataFound && isSearched && (
        <p className='mt-10 text-white'>Kayıt Bulunamadı.</p>
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
              <select value={dataForm.isArge} onChange={handleChange} className='text-black w-40 px-2 py-1 rounded-md cursor-pointer outline-blue-400' name="isArge" id="isArge">
                <option value={true}>Yapıldı</option>
                <option value={false}>Yapılmadı</option>
              </select>
            </section>
            <section>
              <p className='text-green-500 mb-2'>Arge Back DO.</p>
              <select value={dataForm.isArgeBackStatus} onChange={handleChange} className='text-black w-[155px] px-2 py-1 rounded-md cursor-pointer outline-blue-400' name="isArgeBackStatus" id="isArgeBackStatus">
                <option value={true}>Yapıldı</option>
                <option value={false}>Yapılmadı</option>
              </select>
            </section>
            <section>
              <p className='text-green-500 mb-2'>Sürdürülebilirlik</p>
              <select value={dataForm.isSurdurulebilirlik} onChange={handleChange} className='text-black w-[155px] px-2 py-1 rounded-md cursor-pointer outline-blue-400' name="isSurdurulebilirlik" id="isSurdurulebilirlik">
                <option value={true}>Yapıldı</option>
                <option value={false}>Yapılmadı</option>
              </select>
            </section>
            <section>
              <p className='text-green-500 mb-2'>Protokol</p>
              <select value={dataForm.isProtocolSigned} onChange={handleChange} className='text-black w-[155px] px-2 py-1 rounded-md cursor-pointer outline-blue-400' name="isProtocolSigned" id="isProtocolSigned">
                <option value={true}>Yapıldı</option>
                <option value={false}>Yapılmadı</option>
              </select>
            </section>
            <section>
              <p className='text-green-500 mb-[3px]'>Akademisyenler</p>
              <Select
                size='sm'
                radius='sm'
                onChange={handleChange}
                name='AcademicName'
                className='px-2 py-1 relative right-2 placeholder-black'
                placeholder="Akademisyenler"
                selectionMode="multiple"
                selectedKeys={dataForm.AcademicName}
              >
                {akademiks.map((akademiks) => (
                  <SelectItem key={akademiks}>{akademiks}</SelectItem>
                ))}
              </Select>
            </section>
            <section>
              <p className='text-green-500 mb-2'>Firma</p>
              <select value={dataForm.CompanyNames} onChange={handleChange} className='text-black w-[155px] px-2 py-1 rounded-md cursor-pointer outline-blue-400' name="CompanyNames" id="CompanyNames">
                {companies.map((company) => (
                  <option value={company}>{company}</option>
                ))}
              </select>
            </section>
            <section>
              <p className='text-green-500 mb-2'>Sözleşme</p>
              <select value={dataForm.ContractType} onChange={handleChange} className='text-black w-[155px] px-2 py-1 rounded-md cursor-pointer outline-blue-400' name="ContractType" id="ContractType">
                {dealTypes.map((DealType) => (
                  <option value={DealType}>{DealType}</option>
                ))}
              </select>
            </section>
            <section>
              <p className='text-green-500'>Tarih</p>
              <p className='text-white'>{dataForm.Date}</p>
            </section>
            <section>
              <p className='text-green-500'>Görüşmeyi Yapan Kişiler</p>
              <Select
                size='sm'
                onChange={handleChange}
                className='px-1 py-0 w-40'
                name='ConversationOwner'
                placeholder="Görüşmeyi Y.K."
                selectionMode="multiple"
                selectedKeys={dataForm.ConversationOwner}
              >
                {users.map((user) => (
                  <SelectItem key={user.toUpperCase()}>{user.toUpperCase()}</SelectItem>
                ))}
              </Select>
            </section>
            <section>
              <p className='text-green-500 mb-2'>Sektör</p>
              <select onChange={handleChange} value={dataForm.Sector} className='text-black w-[155px] px-2 py-1 rounded-md cursor-pointer outline-blue-400' name="Sector" id="Sector">
                {sectors.map((sector) => (
                  <option value={sector}>{sector}</option>
                ))}
              </select>
            </section>
          </div>
          <div className='text-center mt-5'>
            <button onClick={handleSubmit} className='border-1 px-5 py-2 text-white rounded-md hover:bg-white hover:text-black duration-200 transition-colors ease-in-out'>{update ? 'Güncellemeyi Tamamla' : 'Güncelle'}</button>
            <button className=' ml-5 border-1 px-5 py-2 text-white rounded-md hover:bg-white hover:text-black duration-200 transition-colors ease-in-out'>Kaydı Sil</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDataFilter