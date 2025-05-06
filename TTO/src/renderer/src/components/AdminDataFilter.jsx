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
  const [users, setUsers] = useState(null);
  const [companies, setCompanies] = useState(null);
  const [customContractType, setCustomContractType] = useState(null);
  const [tubitakCode, setTubitakCode] = useState(null);
  const [updateConfirmWaiting, setUpdateConfirmWaiting] = useState(false);
  const [updatedConfirmed, setUpdateConfirmed] = useState(false);
  const [deleteConfirmWaiting, setDeleteConfirmWaiting] = useState(false);
  const [deleteConfirmed, setDeleteConfirmed] = useState(false);
  const [message, setMessage] = useState(null);

  const getAcademicsAndCompanies = async () => {
    try {
      const response = await window.electron.ipcRenderer.invoke("getAllComponeyNamesAndAcademics", "");
      setAkademiks(JSON.parse(response).Academics);
      setCompanies(JSON.parse(response).CompanyNames);
      console.log(JSON.parse(response));
    } catch (error) {
      console.log(error)
    }
  }

  const resetStates = () => {
    setData(null);
    setDataForm(null);
    setId(null);
    setIsDataFound(false);
    setIsSearched(false);
    setUpdate(false);
    setCustomContractType(null);
    setTubitakCode(null);
    setUpdateConfirmWaiting(false);
    setUpdateConfirmed(false);
    setDeleteConfirmWaiting(false);
    setDeleteConfirmed(false);
  };

  useEffect(() => {
    const fetchAllData = async () => {
      const response = await window.electron.ipcRenderer.invoke('GetSelectors', "");
      console.log(response);
      setUsers(response.Users);
      getAcademicsAndCompanies();
    };

    fetchAllData();
  }, []);

  useEffect(() => {
    if (updatedConfirmed) {
      handleSubmit();
    }
    return () => { };
  }, [updatedConfirmed])

  useEffect(() => {
    if (deleteConfirmed) {
      handleDelete();
    }
    return () => { };
  }, [deleteConfirmed]);

  const handleTubitakCode = (e) => {
    setTubitakCode(e.target.value);
  }

  const handleUpdateChange = () => {
    if (!update) {
      setUpdate(true);
      if (dataForm.Contract.ContractType.includes("TÜBİTAK")) {
        const code = dataForm.Contract.ContractType.split(",");
        setTubitakCode(parseInt(code[1].trim()));
      }

      if (dataForm.Contract.ContractType !== "ÖZKAYNAK" && dataForm.Contract.ContractType !== "PROJE YAZMA" && dataForm.Contract.ContractType !== "TEKNOPARK" && !dataForm.Contract.ContractType.includes("TÜBİTAK")) {
        setCustomContractType(dataForm.Contract.ContractType);
      }
    }
    else {
      setUpdate(false);
    }
  }

  const handleDelete = async () => {
    const response = await window.electron.ipcRenderer.invoke('deleteConversationById', {
      id: id
    });
    if(response){
      setMessage("Kayıt başarıyla silindi.");
      resetStates();
    }
  }

  const handleSubmit = async () => {
    console.log("girdi.");
    console.log(updatedConfirmed);
    if (!updatedConfirmed) {
      return;
    }
    console.log("giremedi:");
    let updatedForm = { ...dataForm };
    if (tubitakCode) {
      console.log("tübitak kodu var");
      updatedForm.Contract.ContractType = `TÜBİTAK, ${tubitakCode}`
    }

    if (customContractType) {
      console.log(customContractType);
      updatedForm.Contract.ContractType = customContractType;
    }

    setDataForm(updatedForm);

    const response = await window.electron.ipcRenderer.invoke('SetOneConversation', {
      data: dataForm,
      id: id
    });

    if(response){
      setMessage("Kayıt başarıyla güncellendi.");
      resetStates();
    }

  };

  const handleChange = (e) => {
    console.log(tubitakCode);
    console.log(e.target.name);
    console.log(e.target.value);
    console.log(typeof (e.target.value))



    let updatedForm = {
      ...dataForm,
      [e.target.name]: e.target.value === 'true' ? true : e.target.value === 'false' ? false : e.target.value
    };

    if (e.target.name === "AcademicNames") {
      updatedForm.Academics.AcademicNames = e.target.value;
    }

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
      setIsSearched(true);
      if (responseData) {
        console.log(responseData);
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
      {(!isSearched || !isDataFound) && (
        <div className='flex flex-col items-center gap-2 justify-center text-white'>
          <label htmlFor="dataId">Aramak istediğiniz kayıtın Id sini girin.</label>
          <div className="flex gap-2">
            <input onChange={(e) => setId(e.target.value)} className="text-black px-2 py-1 rounded-sm focus:outline-gray-100" type="text" name="dataId" id="dataId" placeholder='Kayıt Id' />
            <button className="rounded-sm bg-black border-1 border-white text-white font-medium px-5 hover:bg-white hover:text-black transition-colors duration-200 ease-in-out" onClick={()=> {
              handleSearch();
              setMessage(null);
            }}>Ara</button>
          </div>
        </div>
      )}

      {isSearched && isDataFound && !update && (
        <div className="flex flex-col gap-3 border-2 rounded-md border-gray-400 px-7 py-5 text-white shadow-white my-8 w-[600px]">
          <div>
            <h2 className='text-center'>Kayıt Id</h2>
            <p className='text-center'>{dataForm._id}</p>
          </div>
          <div className='grid grid-cols-3 gap-3'>
            <section>
              <p className='text-green-500'>Arge Merkezi</p>
              <p>{dataForm.isArge ? 'Var' : 'Yok'}</p>
            </section>
            <section>
              <p className='text-green-500'>Protokol</p>
              <p>{dataForm.isProtocolSigned ? 'Yapıldı' : 'Yapılmadı'}</p>
            </section>
            <section>
              <p className='text-green-500'>Akademisyenler</p>
              <ul>
                {dataForm.Academics.AcademicNames.split(",").map((item, index) => (
                  <li key={index}>
                    <span>{index + 1}</span> - {item}
                  </li>
                ))}
              </ul>
            </section>
            <section>
              <p className='text-green-500'>Firma</p>
              <p>{dataForm.CompanyNames}</p>
            </section>
            {dataForm.Contract.isContractSigned && (
              <>
                <section>
                  <h4 className='text-green-500'>Statü</h4>
                  <p>Sözleşme</p>
                </section>
                <section>
                  <h4 className='text-green-500'>Sözleşme Tipi</h4>
                  <p>{dataForm.Contract.ContractType}</p>
                </section>
                <section>
                  <h4 className='text-green-500'>Sözleşme Tutarı</h4>
                  <p>{dataForm.Contract.Amount}</p>
                </section>
                <section>
                  <h4 className='text-green-500'>Sözleşme Başlangıç</h4>
                  <p>{new Date(dataForm.Contract.startDate).toLocaleDateString()}</p>
                </section>
                <section>
                  <h4 className='text-green-500'>Sözleşme Bitiş</h4>
                  <p>{new Date(dataForm.Contract.endDate).toLocaleDateString()}</p>
                </section>
              </>
            )}
            {dataForm.Teklif.isTeklif && (
              <>
                <section>
                  <h4 className='text-green-500'>Teklif Başlangıç</h4>
                  <p>{dataForm.Teklif.startDate}</p>
                </section>
                <section>
                  <h4 className='text-green-500'>Teklif Bitiş</h4>
                  <p>{dataForm.Teklif.endDate}</p>
                </section>
              </>
            )}
            <section>
              <p className='text-green-500'>Tarih</p>
              <p>{dataForm.Date}</p>
            </section>
            <section>
              <p className='text-green-500'>Görüşmeyi Yapan Kişiler</p>
              <ul>{dataForm.ConversationOwners.split(",").map((gyk, index) => (
                <li key={index}>
                  <span className='text-green-400'>{index + 1}</span> - {gyk}
                </li>
              ))}</ul>
            </section>
            <section>
              <p className='text-green-500'>Görüşme Açıklaması</p>
              <p>{dataForm.ConversationDetails}</p>
            </section>
          </div>
          <div className='text-center'>
            <button onClick={handleUpdateChange} className='border-1 px-5 py-2 text-white rounded-md hover:bg-white hover:text-black duration-200 transition-colors ease-in-out'>{update ? 'Güncellemeyi Tamamla' : 'Güncelle'}</button>
          </div>
        </div>
      )}

      {!isSearched && message === null &&  (
        <p className='mt-10 text-white'>Herhangi bir kaydın detayı sorgulanmadı.</p>
      )}

      {!isDataFound && isSearched && (
        <p className='mt-10 text-white'>Kayıt Bulunamadı.</p>
      )}

      { message && (
        <p className='mt-10 text-white'>{message}</p>
      )}

      {update && (
        <div className="flex flex-col gap-3 border-2 rounded-md border-gray-400 px-7 py-5 text-white shadow-white my-8 w-[600px]">
          <div>
            <h2 className='text-center'>Kayıt Id</h2>
            <p className='text-center'>{dataForm._id}</p>
          </div>
          <div className='grid grid-cols-3 gap-3'>
            <section>
              <p className='text-green-500 mb-2'>Arge Merkezi</p>
              <select value={dataForm.isArge} onChange={handleChange} className='text-black w-40 px-2 py-1 rounded-md cursor-pointer outline-blue-400' name="isArge" id="isArge">
                <option value={true}>Var</option>
                <option value={false}>Yok</option>
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
                name='AcademicNames'
                className='px-2 py-1 relative right-2 placeholder-black'
                placeholder="Akademisyenler"
                selectionMode="multiple"
                selectedKeys={dataForm.Academics.AcademicNames && typeof dataForm.Academics.AcademicNames === 'string' ? dataForm.Academics.AcademicNames.split(",").map(owner => owner.trim()) : []}
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
              <p className='text-green-500 mb-2'>Görüşmeyi Yapan Kişiler</p>
              <Select
                size='sm'
                onChange={handleChange}
                className='px-1 py-0 w-40'
                name='ConversationOwners'
                placeholder="Görüşmeyi Y.K."
                selectionMode="multiple"
                selectedKeys={dataForm.ConversationOwners && typeof dataForm.ConversationOwners === 'string' ? dataForm.ConversationOwners.split(",").map(owner => owner.trim()) : []}
              >
                {users.map((user) => (
                  <SelectItem key={user}>{user}</SelectItem>
                ))}
              </Select>
            </section>

            {dataForm.Teklif.isTeklif && (
              <>
                <section>
                  <h4 className='text-green-500'>Teklif Başlangıç</h4>
                  <input onChange={(e) => setDataForm(prev => ({
                    ...prev,
                    Teklif: {
                      ...prev.Teklif,
                      startDate: e.target.value
                    }
                  }))} type="date" className='text-black w-[155px] px-2 py-1 rounded-md cursor-pointer outline-blue-400' value={dataForm.Teklif.startDate} />
                </section>
                <section>
                  <h4 className='text-green-500 mb-2'>Teklif Bitiş</h4>
                  <input onChange={(e) => setDataForm(prev => ({
                    ...prev,
                    Teklif: {
                      ...prev.Teklif,
                      endDate: e.target.value
                    }
                  }))} type="date" className='text-black w-[155px] px-2 py-1 rounded-md cursor-pointer outline-blue-400' value={dataForm.Teklif.endDate} />
                </section>
              </>
            )}

            {dataForm.Contract.isContractSigned && (
              <>
                <section>
                  <h4 className='text-green-500 mb-2'>Sözleşme Tipi</h4>
                  <select onChange={(e) => {
                    setDataForm(prev => ({
                      ...prev,
                      Contract: {
                        ...prev.Contract,
                        ContractType: e.target.value
                      }
                    }));
                    if (e.target.value !== "Diğer") {
                      setCustomContractType(null);
                      setTubitakCode(null);
                    };
                  }} value={customContractType ? "Diğer" : dataForm.Contract.ContractType} className='text-black w-[155px] px-2 py-1 rounded-md cursor-pointer outline-blue-400'>
                    {
                      ["TÜBİTAK", "ÖZKAYNAK", "PROJE YAZMA", "TEKNOPARK", "Diğer"].map((item) => (
                        <option value={item} key={item}>
                          {item}
                        </option>
                      ))
                    }
                  </select>
                </section>
                {dataForm.Contract.ContractType.includes("TÜBİTAK") && (
                  <section>
                    <h4 className='text-green-500 mb-2'>Kod</h4>
                    <input value={tubitakCode} placeholder='KOD' required onChange={(e) => handleTubitakCode(e)} type="number" className='text-black w-[155px] px-2 py-1 rounded-md cursor-pointer outline-blue-400' />
                  </section>
                )
                }

                {(customContractType || dataForm.Contract.ContractType === "Diğer") && (
                  <section>
                    <h4 className='text-green-500 mb-2'>Sözleşme Türü</h4>
                    <input value={customContractType} placeholder='Sözleşme Tipi' type="text" onChange={(e) => setCustomContractType(e.target.value)} className='text-black w-[155px] px-2 py-1 rounded-md cursor-pointer outline-blue-400' />
                  </section>
                )}
                <section>
                  <h4 className='text-green-500 mb-2'>Sözleşme Tutarı</h4>
                  <input onChange={(e) => setDataForm(prev => ({
                    ...prev,
                    Contract: {
                      ...prev.Contract,
                      Amount: e.target.value
                    }
                  }))} type="number" className='text-black w-[155px] px-2 py-1 rounded-md cursor-pointer outline-blue-400' value={dataForm.Contract.Amount} />
                </section>
                <section>
                  <h4 className='text-green-500 mb-2'>Sözleşme Başlangıç</h4>
                  <input onChange={(e) => setDataForm(prev => ({
                    ...prev,
                    Contract: {
                      ...prev.Contract,
                      startDate: e.target.value
                    }
                  }))} type="date" className='text-black w-[155px] px-2 py-1 rounded-md cursor-pointer outline-blue-400' value={dataForm.Contract.startDate} />
                </section>
                <section>
                  <h4 className='text-green-500 mb-2'>Sözleşme Bitiş</h4>
                  <input onChange={(e) => setDataForm(prev => ({
                    ...prev,
                    Contract: {
                      ...prev.Contract,
                      endDate: e.target.value
                    }
                  }))} type="date" className='text-black w-[155px] px-2 py-1 rounded-md cursor-pointer outline-blue-400' value={dataForm.Contract.endDate} />
                </section>
              </>
            )}

            <section>
              <p className='text-green-500'>Tarih</p>
              <p className='text-white'>{dataForm.Date}</p>
            </section>

            <section>
              <p className='text-green-500 mb-2'>Görüşme Detayları</p>
              <textarea type="text" onChange={(e) => setDataForm({ ...dataForm, ConversationDetails: e.target.value })} className='text-black w-[155px] px-2 py-1 rounded-md cursor-pointer outline-blue-400 scrollbar-hide' name='ConversationDetails' value={dataForm.ConversationDetails} />
            </section>

          </div>
          <div className='text-center mt-5'>
            <button onClick={() => {
              setUpdateConfirmWaiting(true);
            }} className='border-1 px-5 py-2 text-white rounded-md hover:bg-white hover:text-black duration-200 transition-colors ease-in-out'>Güncellemeyi Tamamla</button>
            <button onClick={() => setDeleteConfirmWaiting(true)} className=' ml-5 border-1 px-5 py-2 text-white rounded-md hover:bg-white hover:text-black duration-200 transition-colors ease-in-out'>Kaydı Sil</button>
          </div>
        </div>
      )}

      {updateConfirmWaiting && (
        <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                      <svg className="size-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h3 className="text-base font-semibold text-gray-900" id="modal-title">Dikkat!</h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">Kayıtı güncellemek istediğinizden emin misiniz?</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto" onClick={() => {
                    setUpdateConfirmed(true);
                    setUpdateConfirmWaiting(false);
                  }}>Güncelle</button>
                  <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={() => setUpdateConfirmWaiting(false)}>Vazgeç</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {deleteConfirmWaiting && (
        <div className="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                      <svg className="size-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                      </svg>
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                      <h3 className="text-base font-semibold text-gray-900" id="modal-title">Dikkat!</h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">Kaydı silmek istediğinizden emin misiniz?</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto" onClick={() => {
                    setDeleteConfirmed(true);
                    setDeleteConfirmWaiting(false);
                  }}>Sil</button>
                  <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={() => setDeleteConfirmWaiting(false)}>Vazgeç</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default AdminDataFilter