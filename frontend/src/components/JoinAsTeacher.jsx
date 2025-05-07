import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function JoinAsTeacher() {
  const navigate = useNavigate();

  const [accountInfo, setAccountInfo] = useState({
    username: '',
    email: '',
    password: '',
    role: 'teacher'
  });

  const handleAccountChange = (e) => {
    setAccountInfo({ ...accountInfo, [e.target.name]: e.target.value });
  };

  const handleAccountSubmit = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post('http://127.0.0.1:8000/register/', accountInfo);
      alert('Account created successfully!');
      const datas = response.data;
      navigate('/teacher-login', { state: { id: datas.id } });
    } catch (error) {
      console.error('Error creating account:', error.response?.data || error.message);
      alert('Error creating account. Please check the console.');
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        background: 'linear-gradient(to right, #0063a0, #e0f2ff)',
        fontFamily: 'Segoe UI, sans-serif'
      }}
    >
      <div
        className="p-5 rounded-4 shadow-lg"
        style={{
          backgroundColor: '#ffffff',
          width: '100%',
          maxWidth: '500px',
          border: '1px solid #dee2e6'
        }}
      >
        <h2 className="text-center mb-4" style={{ color: '#0063a0', fontWeight: '600' }}>
          Teacher Registration
        </h2>

        <form onSubmit={handleAccountSubmit}>
          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: '500', color: '#495057' }}>Username</label>
            <input
              type="text"
              name="username"
              value={accountInfo.username}
              onChange={handleAccountChange}
              className="form-control"
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label" style={{ fontWeight: '500', color: '#495057' }}>Email</label>
            <input
              type="email"
              name="email"
              value={accountInfo.email}
              onChange={handleAccountChange}
              className="form-control"
              placeholder="Enter your email"
              required
            />
          </div>

          <div className="mb-4">
            <label className="form-label" style={{ fontWeight: '500', color: '#495057' }}>Password</label>
            <input
              type="password"
              name="password"
              value={accountInfo.password}
              onChange={handleAccountChange}
              className="form-control"
              placeholder="Enter a strong password"
              required
            />
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="btn"
              style={{
                backgroundColor: '#0063a0',
                color: 'white',
                padding: '10px 30px',
                borderRadius: '25px',
                fontWeight: '500',
                border: 'none'
              }}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default JoinAsTeacher;
