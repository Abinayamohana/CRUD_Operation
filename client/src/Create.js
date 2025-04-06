import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Create() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    axios.post("http://localhost:5000/students", { name, email }).then(() => {
      navigate("/");
    });
  };  

  return (
    <div className="d-flex vh-100 bg-primary justify-content-center align-items-center">
      <div className="w-50 bg-white rounded p-3">
        <h2>Add Student</h2>
        <input type="text" placeholder="Name" className="form-control" onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" className="form-control my-2" onChange={(e) => setEmail(e.target.value)} />
        <div className="d-flex justify-content-center">
        <button className="btn btn-success" onClick={handleSubmit}>Add</button>
        <button className="btn btn-success ms-5" onClick={()=>navigate('/')}>Back</button>
        </div>
      </div>
    </div> 
  );
}

export default Create;
