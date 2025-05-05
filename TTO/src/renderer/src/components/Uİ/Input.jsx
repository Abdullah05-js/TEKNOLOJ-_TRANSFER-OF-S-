import React from 'react';

const Input = ({onchange,value,placeholder,type,name}) => {
    return (
        <input  onChange={onchange} name={name} value={value} className='text-white bg-transparent hover:border-green-300 hover:border-1 rounded-xl border-white border-1 px-2 py-1 focus:border-green-300 focus:border-1 outline-none' aria-label='input' placeholder={placeholder} type={type}/>
    );
}

export default Input;
