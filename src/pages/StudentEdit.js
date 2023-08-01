import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { Oval } from "react-loader-spinner";

const StudentEdit = () => {
  let { id } = useParams();
  const [student, setStudent] = useState({});

  const [inputerrorList, setInputErrorList] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/students/${id}/edit`).then((res) => {
      setStudent(res.data.student);
      setLoading(false);
    }).catch(function (error) {
        if (error.response) {
          
          if (error.response.status === 500) {
            alert(error.response.data);
            setLoading(false);
          }
          if (error.response.status === 404) {
            // alert(error.response.data.message);
            toast.error(error.response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            setLoading(false);
            // navigate(`/students`)
          }
        }
      });;
  }, [id]);

  const handleInput = (e) => {
    e.persist();
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const updateStudent = (e) => {
    e.preventDefault();
    setLoading(true);
    const data = {
      name: student.name,
      email: student.email,
      phone: student.phone,
      course: student.course,
    };

    axios
      .put(`http://127.0.0.1:8000/api/students/${id}/edit`, data)
      .then((res) => {
        // alert(res.data.message);
        toast.success(res.data.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setLoading(false);
        // navigate("/students");
      })
      .catch(function (error) {
        if (error.response) {
          if (error.response.status === 422) {
            setInputErrorList(error.response.data.errors);
            setLoading(false);
          }
          if (error.response.status === 500) {
            alert(error.response.data);
            setLoading(false);
          }
          if (error.response.status === 404) {
            // alert(error.response.data.message);
            toast.error(error.response.data.message, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            setLoading(false);
          }
        }
      });
  };

  if (loading) {
    return <Loader />;
//     return <Oval
//     height={80}
//     width={80}
//     color="#4fa94d"
//     wrapperStyle={{}}
//     wrapperClass=""
//     visible={true}
//     ariaLabel='oval-loading'
//     secondaryColor="#4fa94d"
//     strokeWidth={2}
//     strokeWidthSecondary={2}
  
//   />;
  }

  if(Object.keys(student).length === 0){
    return (
        <div className="container">
            <ToastContainer />
            <h4>No such student found!! </h4>
        </div>
    )
  }
  return (
    <div>
      <ToastContainer />
      <div className="container mt-3">
        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-header">
                <h4>
                  Edit student{" "}
                  <Link to="/students" className="btn btn-warning float-end">
                    Back
                  </Link>
                </h4>
              </div>
              <div className="card-body">
                <form onSubmit={updateStudent}>
                  <div className="mb-3">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={student.name}
                      className="form-control"
                      onChange={handleInput}
                    />
                    <span className="text-danger">{inputerrorList.name}</span>
                  </div>

                  <div className="mb-3">
                    <label>Email</label>
                    <input
                      type="email"
                      name="email"
                      value={student.email}
                      className="form-control"
                      onChange={handleInput}
                    />
                    <span className="text-danger">{inputerrorList.email}</span>
                  </div>
                  <div className="mb-3">
                    <label>Phone</label>
                    <input
                      type="number"
                      name="phone"
                      value={student.phone}
                      className="form-control"
                      onChange={handleInput}
                    />
                    <span className="text-danger">{inputerrorList.phone}</span>
                  </div>
                  <div className="mb-3">
                    <label>Course</label>
                    <input
                      type="text"
                      name="course"
                      value={student.course}
                      className="form-control"
                      onChange={handleInput}
                    />
                    <span className="text-danger">{inputerrorList.course}</span>
                  </div>
                  <div className="mb-3">
                    <button type="submit" className="btn btn-primary">
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentEdit;
