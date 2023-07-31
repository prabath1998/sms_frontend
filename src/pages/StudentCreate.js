import axios from 'axios';
import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Loader from '../components/Loader';

const StudentCreate = () => {
  const [student, setStudent] = useState({
    name:'',
    email:'',
    phone:'',
    course:''
  });

  const [inputerrorList, setInputErrorList] = useState({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate();

  const handleInput = (e) => {
    e.persist();
    setStudent({...student,[e.target.name]: e.target.value});
  }

  const saveStudent = (e) => {
    e.preventDefault();
    setLoading(true)
    const data = {
      name: student.name,
      email: student.email,
      phone: student.phone,
      course: student.course
    }

    axios.post(`http://127.0.0.1:8000/api/students`,data).then(res => {
      alert(res.data.message);
      setLoading(false)
      navigate('/students');
    }).catch(function (error){
      if(error.response){
        if(error.response.status === 422){
          setInputErrorList(error.response.data.errors)
          setLoading(false)
        }
        if(error.response.status === 500){
          alert(error.response.data)
          setLoading(false)
        }
      }
    });
  }

  if (loading) {
    return (
      <Loader/>
    );
  }

  return (
    <div>
       <div className="container mt-3">
      <div className="row">
        <div className="col-md-12">
          <div className="card">
            <div className="card-header">
              <h4>
                Add student{" "}
                <Link to="/students" className="btn btn-warning float-end">
                  Back
                </Link>
              </h4>
            </div>
            <div className="card-body">
              <form onSubmit={saveStudent}>
                <div className='mb-3'>
                  <label>Name</label>
                  <input type='text' name='name' value={student.name} className='form-control' onChange={handleInput}/>
                  <span className='text-danger'>{inputerrorList.name}</span>
                  </div>
                
                <div className='mb-3'>
                  <label>Email</label>
                  <input type='email' name='email' value={student.email} className='form-control'  onChange={handleInput}/>
                  <span className='text-danger'>{inputerrorList.email}</span>
                
                </div>
                <div className='mb-3'>
                  <label>Phone</label>
                  <input type='number' name='phone' value={student.phone} className='form-control'  onChange={handleInput}/>
                  <span className='text-danger'>{inputerrorList.phone}</span>
               
                </div>
                <div className='mb-3'>
                  <label>Course</label>
                  <input type='text' name='course' value={student.course} className='form-control'  onChange={handleInput}/>
                  <span className='text-danger'>{inputerrorList.course}</span>
               
                </div>
                <div className='mb-3'>
                  <button type='submit' className='btn btn-primary'>Save</button>
                </div>
              </form>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
      
    
  )
}

export default StudentCreate
