import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/profile/login', form);
      console.log('Login response:', res.data);
      localStorage.setItem('email', form.email);
      localStorage.setItem('profileUuid', res.data.profileUuid);
      alert(res.data.message);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <div style={styles.container}>
      <h1>🏥 MedQR - Login</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input name="email" placeholder="Email" type="email" onChange={handleChange} required style={styles.input} />
        <input name="password" placeholder="Password" type="password" onChange={handleChange} required style={styles.input} />
        <button type="submit" style={styles.button}>Login</button>
      </form>
      <p>New user? <Link to="/register">Register here</Link></p>
    </div>
  );
}

const styles = {
  container: { maxWidth: '500px', margin: '50px auto', textAlign: 'center', fontFamily: 'Arial' },
  form: { display: 'flex', flexDirection: 'column', gap: '10px' },
  input: { padding: '12px', fontSize: '16px', borderRadius: '8px', border: '1px solid #ccc' },
  button: { padding: '12px', fontSize: '18px', backgroundColor: '#2196F3', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }
};

export default Login;