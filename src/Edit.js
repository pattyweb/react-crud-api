import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Edit() {
    const { id } = useParams();
    const [data, setData] = useState({ id: '', name: '', email: '' });  // Initialize data state with default values
    const Navigat = useNavigate()

    useEffect(() => {
        axios.get(`https://pattyweb.com.br/react-api/api.php?id=${id}`)
            .then(res => {
                // Assuming the API returns an array of objects
                const userData = res.data.find(item => item.id === id);
                if (userData) {
                    setData(userData);
                } else {
                    console.log(`No data found for ID: ${id}`);
                }
            })
            .catch(err => console.log(err));
    }, [id]);
    

    function handleSubmit(event){
        event.preventDefault()
        axios.put(`https://pattyweb.com.br/react-api/api.php?id=${id}`, data)
        .then(res => {
            alert("Data updated Successfuly");
            Navigat('/');
        }).catch(err => console.log(err));
        
    }

    return (
        <div className='d-flex w-100 justify-content-center align-items-center mt-5'>
            <div className='w-50 border bg-light p-5'>
                <form onSubmit={handleSubmit}>
                <div>
                        <label htmlFor='id'>ID</label>
                        <input type='text' disabled name='id' value={data.id} className='form-control' />
                    </div>
                    <div>
                        <label htmlFor='name'>Name</label>
                        <input type='text' name='name' value={data.name} className='form-control' onChange={e =>setData({...data, name: e.target.value})} required />
                    </div>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input type='email' name='email' value={data.email} className='form-control'  onChange={e =>setData({...data, email: e.target.value})} required />
                    </div>
                    <br />
                    <button className='btn btn-info'>Update</button>
                </form>
            </div>
        </div>
    );
}

export default Edit;
