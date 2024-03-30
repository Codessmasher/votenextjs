"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
// import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signin = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        adhaarNumber: '',
        password: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('https://votebackend.vercel.app/api/users/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': "http://localhost:3000"
                },
                body: JSON.stringify(formData)
            })
            if (res.ok) {
                const data = await res.json();
                console.log(data);
                localStorage.setItem('token', data.token);
                
                toast.success(data.message);
                return router.push('/dashboard');
            } else {
                toast.error(data.error); 
            }
        } catch (error) {
            // console.error(error);
            toast.error(error);
        }

        // Reset form fields
        setFormData({
            adhaarNumber: '',
            password: ''
        });
    };

    return (
        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
            <label className="block mb-4">
                <span className="text-gray-700">Aadhaar Number:</span>
                <input type="number" name="adhaarNumber" value={formData.adhaarNumber} onChange={handleChange} required className="form-input p-0.2 bg-green-500 mt-1 block w-full" />
            </label>
            <label className="block mb-4">
                <span className="text-gray-700">Password:</span>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required className="form-input p-0.2 bg-green-500 mt-1 block w-full" />
            </label>
            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Submit</button>
            <ToastContainer />
        </form>
    );
};

export default Signin;
