import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function Edit() {
  const {id} = useParams();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(()=> {
    axios.get(`http://localhost:5000/students/${id}`).then(res => {
      setName(res.data.name);
      setEmail(res.data.email);
    });
  },[id]);

  const handleUpdate = () => {
    axios.put(`http://localhost:5000/students/${id}`, {name, email}).then(() => {
      navigate("/");
    });
  };
  return(
    <div className="d-flex bg-primary d-flex vh-100 justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <h1>Update Student</h1>
        <input type="text" value={name} className="form-control" onChange={(e) => setName(e.target.value)} />
        <input type="email" value={email} className="form-control my-2" onChange={(e) => setEmail(e.target.value)} />
        <button className="btn btn-success" onClick={handleUpdate}>Update</button>
      </div>
    </div>
  )

}
export default Edit;
