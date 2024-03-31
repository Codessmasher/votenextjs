"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import URL from '../utils/URL/page';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        mobile: '',
        address: '',
        adhaarNumber: '',
        password: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('https://votebackend.vercel.app/api/users/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'http://localhost:3000'
                },
                body: JSON.stringify(formData)
            });
            if (res.ok) {
                const data = await res.json();
                toast.success(data.message);
                router.push('/signin');
            } else {
                throw new Error(data.error);
            }
        } catch (error) {
            // console.error(error);
            toast.error('Error registering user');
        }
    };


    return (
        <>
            <div className="grid place-items-center align-items-center m-5">
                <URL href={"/"}>Go to Homepage</URL>
            </div>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
                <label className="block mb-4">
                    <span className="text-gray-700">Name:</span>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="form-input p-0.2 bg-green-500 mt-1 block w-full" />
                </label>
                <label className="block mb-4">
                    <span className="text-gray-700">Age:</span>
                    <input type="number" name="age" value={formData.age} onChange={handleChange} required className="form-input p-0.2 bg-green-500 mt-1 block w-full" />
                </label>
                <label className="block mb-4">
                    <span className="text-gray-700">Mobile:</span>
                    <input type="tel" name="mobile" value={formData.mobile} onChange={handleChange} required className="form-input p-0.2 bg-green-500 mt-1 block w-full" />
                </label>
                <label className="block mb-4">
                    <span className="text-gray-700">Address:</span>
                    <input type="text" name="address" value={formData.address} onChange={handleChange} required className="form-input p-0.2 bg-green-500 mt-1 block w-full" />
                </label>
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
        </>

    );
};

export default Signup;
