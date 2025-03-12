import { Pagination } from '@heroui/pagination';
import React, { useEffect, useState, useRef } from 'react'
import { FaPencil, FaTrash } from 'react-icons/fa6';

const AllUsers = () => {

    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [allUsers, setAllUsers] = useState(null);
    const [usersChanged, setUserChanged] = useState(false);
    const [currentUsers, setCurrentUsers] = useState(null);
    const [selectedDeleteUserId, setDeleteSelectedUserId] = useState(null);
    const [deleteWaiting, setDeleteWaiting] = useState(false);
    const [deleteConfirmed, setDeleteConfirmed] = useState(false);
    const [createPasswordWaiting, setCreatePasswordWaiting] = useState(false);
    const [createPasswordConfirmed, setCreatePasswordConfirmed] = useState(false);
    const [selectedCreatePasswordUserId, setCreatePasswordSelectedUserId] = useState(null);
    const [createdPassword, setCreatedPassword] = useState(null);

    const fetchUsers = async () => {
        const response = await window.electron.ipcRenderer.invoke('GetAllUser');
        const data = JSON.parse(response);
        setAllUsers(data);
        setUserChanged(false);
    }

    useEffect(() => {
        const generateRandomString = () => Math.random().toString(36).substring(2, 10);
        setCreatedPassword(generateRandomString);
    }, [selectedCreatePasswordUserId])

    useEffect(() => {
        handleCreatePassword();
    }, [createPasswordWaiting, selectedCreatePasswordUserId])

    useEffect(() => {
        fetchUsers();
    }, [usersChanged]);

    useEffect(() => {
        if (allUsers) {
            setTotalPage(Math.ceil(allUsers.length / 10));
        }
    }, [allUsers])

    useEffect(() => {
        const startIndex = (currentPage - 1) * 10;
        const endIndex = (currentPage * 10);
        if (allUsers) {
            setCurrentUsers(allUsers.slice(startIndex, endIndex));
        }
    }, [currentPage, allUsers]);

    useEffect(() => {
        handleDelete(selectedDeleteUserId);
    }, [deleteWaiting, selectedDeleteUserId])

    const handleDelete = async () => {
        if (!deleteWaiting && deleteConfirmed) {
            const foundUser = allUsers.find(item => {
                return item._id === selectedDeleteUserId;
            });

            const response = await window.electron.ipcRenderer.invoke('DeleteUser', foundUser);
            setUserChanged(true);
        }
    }

    const handleCreatePassword = async () => {
        if (!createPasswordWaiting && createPasswordConfirmed) {
            const response = await window.electron.ipcRenderer.invoke('UpdatePassword', {
                id: selectedCreatePasswordUserId,
                newPassWord: createdPassword
            });
        }
    }

    return (
        <div>
            <table className="sm:table-auto table-auto text-white h-[90%]">
                <thead>
                    <tr>
                        <th className='w-[25%]'>Kullanıcı Id</th>
                        <th>Kullanıcı Adı</th>
                        <th>Admin Mi</th>
                        <th>Geçici Parola</th>
                        <th>Sil</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers && currentUsers.map((user, index) => (
                        <tr className='py-3' key={index}>
                            <td className='w-[25%]'>{user._id}</td>
                            <td>{user.UserName}</td>
                            <td>{user.isAdmin ? 'Evet' : 'Hayır'}</td>
                            <td>
                                <button onClick={() => {
                                    setCreatePasswordWaiting(true);
                                    setCreatePasswordSelectedUserId(user._id);
                                }} className='py-2'>Oluştur</button>
                            </td>
                            <td>
                                <button className='cursor-pointer' onClick={() => {
                                    setDeleteWaiting(true);
                                    setDeleteSelectedUserId(user._id);
                                }}><FaTrash /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={`${allUsers ? '' : 'hidden'} flex justify-center items-center mt-5`}>
                <Pagination isCompact color='success' onChange={setCurrentPage} showControls initialPage={currentPage} total={totalPage} />
            </div>
            <h2 className={`${allUsers ? 'hidden' : ''} flex justify-center items-center mt-8 text-white`}>Herhangi bir kullanıcı bulunmamaktadır.</h2>
            {deleteWaiting && (
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
                                                <p className="text-sm text-gray-500">Kullanıcıyı silmek istediğinizden emin misiniz?</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto" onClick={() => {
                                        setDeleteConfirmed(true);
                                        setDeleteWaiting(false);
                                    }}>Sil</button>
                                    <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={() => setDeleteWaiting(false)}>Vazgeç</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {createPasswordWaiting && (
                <div class="relative z-50" aria-labelledby="modal-title" role="dialog" aria-modal="true">
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
                                            <h3 className="text-base font-semibold text-gray-900" id="modal-title">Kullanıcı için oluşturulan geçici şifre:</h3>
                                            <div className="mt-2">
                                                <p className="text-medium text-gray-500">{createdPassword}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                    <button type="button" className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto" onClick={() => {
                                        setCreatePasswordConfirmed(true);
                                        setCreatePasswordWaiting(false);
                                    }}>Oluştur</button>
                                    <button type="button" className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto" onClick={() => {
                                        setCreatePasswordWaiting(false)
                                        setCreatePasswordConfirmed(false);
                                    }}>Vazgeç</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AllUsers;