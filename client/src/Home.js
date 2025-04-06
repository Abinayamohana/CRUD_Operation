import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [data, setData] = useState([]);
  useEffect(() => {
    axios.get("http://localhost:5000/students").then( res => setData(res.data));

},[]);

const handleDelete = (id) => {
  axios.delete(`http://localhost:5000/students/${id}`).then(() => {
    setData(data.filter(student => student.id !==id));
  });
};
  return(
    <div className="d-flex justify-content-center align-items-center bg-primary vh-100">
      <div className="rounded p-3 bg-white w-50">
        <h1>Student List</h1>
        <div className="d-flex justify-content-end">
          <Link to="/create" className="btn btn-success">Create +</Link>
        </div>
        <table className="Table w-100">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {data.map((student, index) => (
              <tr key={index}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>
                  <Link to= {`/edit/${student.id}`} className="btn btn-primary btn-sm">Edit</Link>
                </td>
                <td>
                  <button onClick={() => handleDelete(student.id)} className="btn btn-danger">Delete</button>
                </td>

              </tr>
            ))}
            
          </tbody>
        </table>
      </div>
    </div>

  )
}
export default Home;
