import React, { useState } from 'react'
import axios from '../api/axios';
import toast from 'react-hot-toast';

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("employee");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(name, email, password, role);
        try {
            const response = await axios.post("/api/auth/register", { name, email, password, role });
            if(response.data.success) {
                toast.success(response.data.message);
            } else {
                toast.error(response.data.error);
            }
        } catch (error) {
            console.error(error);
        }
    }
  return (
    <div>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" id="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
            <label htmlFor="email">Email</label>
            <input type="email" id="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
            <label htmlFor="role">Role</label>
            <select id="role" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="employee">Employee</option>
                <option value="admin">Admin</option>
                <option value="delivery">Delivery</option>
            </select>
            <button type="submit">Register</button>
        </form>
    </div>
  )
}

export default Register