import React, { useEffect, useState } from 'react'
import './Home.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom';


function Home() {
    const [data, setData] = useState([]);
    useEffect(()=>{
        axios.get('http://localhost:6530')
        .then(res => setData(res.data))
        .catch(err => console.log(err));
    })
    const navigate = useNavigate();
    const handleDelete = (id) => {
        axios.delete('http://localhost:6530/delete/'+id)
        .then(res => navigate('/'))
        .catch(err => console.log(err));
    }

  return (
    <div className="d-flex justify-content-center align-items-center bg-dark vh-100">
        <div className="bg-white rounded w-50">
            <h2 align='center'>My Employee</h2>
            <Link to="/create" align='center' className='btn-add'>Add</Link>
            <table className="table" align='center'>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Department</th>
                    <th>Salary</th>
                    <th>Action</th>
                            
                    </tr>
                </thead>
                <tbody>
                    {data.map((d,i)=>(
                        <tr>
                            <td>{d.id}</td>
                             <td>{d.name}</td>
                             <td>{d.age}</td>
                             <td>{d.department_id}</td>
                             <td>{d.salary}</td>
                            <td>
                                <Link to={`/update/${d.id}`} className="btn btn-sm btn-primary" >Update</Link>
                                <button onClick={e=> handleDelete(d.id)} className="btn btn-sm btn-danger">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
      
    </div>
  )
}

export default Home
