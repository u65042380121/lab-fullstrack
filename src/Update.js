import React,{ useEffect, useState } from 'react'
import axios from 'axios'
import {useNavigate, useParams} from 'react-router-dom'


function Update() {

    const [name, setname] = useState('')
    const [age, setage] = useState('')
    const [department_id, setdepartment_id] = useState('')
    const [salary, setsalary] = useState('')
    const [department, setdepartment] = useState([])
    const nav = useNavigate();
    const {id} = useParams();

    useEffect(()=> {
        axios.get('http://localhost:6530/department/').then(res => setdepartment(res.data)).catch(err => console.log(err));
    })

    const handledata=(event)=>{
        event.preventDefault();
        axios.put('http://localhost:6530/update/'+id, {name,age,department_id,salary}).then(
            res =>{
                nav('/');

            }
        ).catch(err=> console.log(err))
    }

  return (
    <div className="d-flex vh-100 bg-success justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <form onSubmit={handledata}>
            <h2>Update Employee</h2>
        <div className="mb-2">
            <label htmlFor="">Name</label>
            <input type="text" name="" id="" placeholder='Enter name' className="form-control"
            onChange={e=> setname(e.target.value)}/> 
            {/* onChange={e=> setName(e.target.value)} */}
        </div>

        <div className="mb-2">
            <label htmlFor="">Age</label>
            <input type="text" name="" id="" placeholder='Enter age' className="form-control"
            onChange={e=> setage(e.target.value)}/> 
            {/* onChange={e=> setName(e.target.value)} */}
        </div>
    
        <div className="mb-2">
            <label htmlFor="">salary</label>
            <input type="text" name="" id="" placeholder='Enter salary' className="form-control"
            onChange={e=> setsalary(e.target.value)}/>
        </div>

        <select className='from-select' onChange={e => setdepartment_id(e.target.value)}>
            {department.map((d) => (
               <option className='option' key={d.department_id} value={d.department_id}>{d.department_name}</option>
            ))}
        </select>

        <button className="btn btn-warning">Update</button>
        </form>
      </div>
    </div>
  )
}

export default Update
