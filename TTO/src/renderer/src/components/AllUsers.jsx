import { Pagination } from '@heroui/pagination';
import React, { useEffect, useState } from 'react'
import { FaPencil, FaTrash } from 'react-icons/fa6';

const AllUsers = () => {

    const [totalPage, setTotalPage] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [allUsers, setAllUsers] = useState(null);
    const [currentUsers, setCurrentUsers] = useState(null);

    useEffect(async () => {
        // Burada kullanıcılar getirilecek.
        const response = await window.electron.ipcRenderer.invoke();
        setAllUsers(users);
    }, []);

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

    const handleDelete = (userId)=> {
        const foundUser = allUsers.find(item => {
          return item.userId === userId;
        });
        // burada kullanıcı var apiden deletee işlemi yapılacak.
      }

    return (
        <div>
            <table className="text-white h-[90%]">
                <thead>
                    <tr>
                        <th>Kullanıcı Id</th>
                        <th>Kullanıcı Adı</th>
                        <th>Admin Mi</th>
                        <th>Geçici Parola</th>
                        <th>Sil</th>
                    </tr>
                </thead>
                <tbody>
                    {currentUsers && currentUsers.map((user, index) => (
                        <tr className='py-3' key={index}>
                            <td>{user.userId}</td>
                            <td>{user.username}</td>
                            <td>{user.isAdmin ? 'Evet' : 'Hayır'}</td>
                            <td>
                                <button className='py-2'>Oluştur</button>
                            </td>
                            <td>
                                <button className='cursor-pointer' onClick={()=> {
                                    handleDelete(user.userId);
                                }}><FaTrash /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className={`${allUsers ? '' : 'hidden'} flex justify-center items-center mt-5`}>
                <Pagination isCompact color='success' onChange={setCurrentPage} showControls initialPage={currentPage} total={totalPage} />
            </div>
            <h2 className={`${allUsers ? 'hidden': ''} flex justify-center items-center mt-8 text-white`}>Herhangi bir kullanıcı bulunmamaktadır.</h2>
        </div>
    )
}

export default AllUsers;