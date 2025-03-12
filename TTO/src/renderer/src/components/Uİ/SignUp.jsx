import React from 'react';
import { useState, useEffect } from 'react'
import { WebsiteIcon } from '../../assets/icons';

const SignUp = ({ setShow }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        isAdmin: false
    });

    const [usernameError, setUsernameError] = useState(null);
    const [passwordError, setPasswordError] = useState(null);
    const [passwordConfirmError, setPasswordConfirmError] = useState(null);
    const [passwordDontMatchError, setPasswordDontMatchError] = useState(null);


    useEffect(() => {
        if (formData.password && formData.confirmPassword) {
          if (formData.password !== formData.confirmPassword) {
            setPasswordDontMatchError('Şifreler uyuşmuyor.');
          } else {
            setPasswordDontMatchError(null);
          }
        }
      }, [formData.password, formData.confirmPassword]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(formData.username.trim() === '' ){
            setUsernameError('Kullanıcı adı boş olamaz.');
        }
        if(formData.password.trim() === ''){
            setPasswordError('Şifre alanı boş geçilemez.');
        }      
        if(formData.confirmPassword.trim() === ''){
            setPasswordConfirmError('Şifre onay alanı boş geçilemez.');
        }
        if(formData.password !== formData.confirmPassword){
            setPasswordDontMatchError('Şifreler uyuşmuyor.');
        }

        const data = {
            UserName: formData.username,
            PassWord: formData.password,
            isAdmin: formData.isAdmin
        }

        console.log(formData);

        console.log(data);

        const response = await window.electron.ipcRenderer.invoke('signup', data );
        
    }

    const handleChange = (e) => {
        console.log(e.target.name);
        console.log(e.target.value);
        setFormData({
          ...formData,
          [e.target.name]: e.target.value === 'true' ? true : e.target.value === 'false' ? false : e.target.value,
        });

        if(formData.username.trim() !== '' ){
            setUsernameError(null);
        }
        if(formData.password.trim() !== ''){
            setPasswordError(null);
        }      
        if(formData.confirmPassword.trim() !== ''){
            setPasswordConfirmError(null);
        }
        if(formData.password == formData.confirmPassword){
            setPasswordDontMatchError(null);
        }
        
    }

    return (
        <div className='w-[80%] flex flex-col items-center gap-6 overflow-y-auto scrollbar-hide'>
            <div className='flex flex-col w-[60%] max-w-[350px] px-5 py-3'>
                <div className='flex justify-center'>
                    <WebsiteIcon />
                </div>
                <h1 className='text-white flex justify-center text-3xl mb-4'>Kayıt Ol</h1>
                <form className='flex flex-col gap-3'>
                    <div className='flex flex-col text-white gap-2'>
                        <label htmlFor="username">Kullanıcı Adı</label>
                        <input onChange={handleChange} className='placeholder-gray-600 px-3 py-2 outline-blue-300 text-black' type="text" name="username" id='username' placeholder='Lütfen kullanıcı adınızı giriniz.' />
                        {usernameError && (<p className='text-white text-sm'>{usernameError}</p>)}
                    </div>
                    <div className='flex flex-col text-white gap-2'>
                        <label htmlFor="password">Şifre</label>
                        <input onChange={handleChange} className='placeholder-gray-600 px-3 py-2 outline-blue-300 text-gray-800' type="password" name="password" id="password" placeholder='Lütfen şifre oluşturunuz.' />
                        {passwordError && (<p className='text-white text-sm'>{passwordError}</p>)}
                    </div>
                    <div className='flex flex-col text-white gap-2'>
                        <label htmlFor="confirmPassword">Şifre Tekrar</label>
                        <input onChange={handleChange} className='placeholder-gray-600 px-3 py-2 outline-blue-300 text-gray-800' type="password" name='confirmPassword' id='confirmPassword' placeholder='Lütfen şifrenizi tekrardan giriniz.'/>
                        {passwordConfirmError && (<p className='text-white text-sm'>{passwordConfirmError}</p>)}
                        {passwordDontMatchError && (<p className='text-white text-sm'>{passwordDontMatchError}</p>)}
                    </div>
                    <div className='flex flex-col text-white gap-2'>
                        <label htmlFor="isAdmin">Admin Yetkisi Verilecek Mi?</label>
                        <select value={formData.isAdmin} onChange={handleChange} className='placeholder-gray-600 px-3 py-2 outline-blue-300 text-gray-800' name="isAdmin" id='isAdmin'>
                            <option value={true}>Evet</option>
                            <option value={false}>Hayır</option>
                        </select>
                    </div>

                    <button type='button' onClick={handleSubmit} className='text-white border border-white w-[50%] text-lg font-semibold mx-auto mt-5 px-3 py-2 hover:bg-white hover:text-black transition-colors ease-in-out duration-300'>Kayıt Ol</button>
                </form>
            </div>
        </div>
    )
}

export default SignUp