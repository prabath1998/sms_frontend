import React from 'react'
import { Link } from 'react-router-dom'

const Student = () => {
  return (
    <div className='container'>
      <div className='row'>
        <div className='col-md-12'>
            <div className='card'>
                <div className='card-header'>
                    <h4>Students List <Link to="/">Add New</Link></h4>
                </div>
                <div className='card-body'>
                    <table className='table table-striped'>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Course</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default Student
