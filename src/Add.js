import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Add() {
    const [inputData, setInputData] = useState({name:'', email:''})
    const Navigat = useNavigate()

    function handleSubmit(event){
        event.preventDefault()

        axios.post('https://pattyweb.com.br/react-api/api.php', inputData)
        .then(res => {
            alert("Data added Successfuly");
            Navigat('/');
        }).catch(err => console.log(err));

    }

  return (
    <div className='d-flex w-100 justify-content-center align-items-center mt-5'>
        <div className='w-50 border bg-light p-5'>
            <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor='name'>Name</label>
                <input type='text' name='name' className='form-control' onChange={e=>setInputData({...inputData, name: e.target.value})} required />
            </div>
            <div>
                <label htmlFor='email'>Email</label>
                <input type='email' name='email' className='form-control'onChange={e=>setInputData({...inputData, email: e.target.value})} required />
            </div> <br/>
            <button className='btn btn-info'>Submit</button>
            </form>
        </div>
    </div>
  )
}

export default Add