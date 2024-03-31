"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import CardCenter from '../utils/CardCenter/page';
import URL from '../utils/URL/page';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const dashboard = () => {
    const [token, setToken] = useState('');
    const [userData, setUserData] = useState(null);
    const [role, setRole] = useState("voter");
    const [formData, setFormData] = useState({
        name: '',
        age: '',
        party: ''
    });
    const [candidateId, setCandidateId] = useState('');
    const router = useRouter();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
            router.push('/signin');
        } else {
            setToken(storedToken);
        }
    }, []);

    useEffect(() => {
        if (token) {
            fetchProfile();
        }
    }, [token]);

    const fetchProfile = async () => {
        try {
            const res = await fetch('https://votebackend.vercel.app/api/users/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Access-Control-Allow-Origin': 'http://localhost:3000'
                }
            });
            if (!res.ok) {
                throw new Error('Failed to fetch user profile');
            }
            const data = await res.json();
            localStorage.setItem('profile.role', JSON.stringify(data.result[0].role));
            localStorage.setItem('profile.isVoted', JSON.stringify(data.result[0].isVoted));
            localStorage.setItem('profile.name', JSON.stringify(data.result[0].name));
            setRole(data.result[0].role);
            setUserData(data.result[0]);
        } catch (error) {
            console.error(error);
            // Handle error or redirect as needed
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch('https://votebackend.vercel.app/api/candidates/addcandidate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Access-Control-Allow-Origin': 'http://localhost:3000'
                },
                body: JSON.stringify(formData)
            });
            if (!res.ok) {
                throw new Error('Error registering candidate');
            }
            const data = await res.json();
            toast.success(data.message);
        } catch (error) {
            console.error(error);
            toast.error(error.message || 'Error registering candidate');
        }
    };

    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`https://votebackend.vercel.app/api/candidates/deletecandidate/${candidateId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Access-Control-Allow-Origin': 'http://localhost:3000'
                },
                body: JSON.stringify(formData)
            });
            if (!res.ok) {
                throw new Error('Error deleting candidate');
            }
            const data = await res.json();
            toast.success(data.message);
        } catch (error) {
            console.error(error);
            toast.error(error.message || 'Error deleting candidate');
        }
    };

    return (
        <CardCenter className='flex justify-between'>
                {userData &&
                    <div>
                        <span style={{ fontSize: "4rem" }}>👋</span>
                        <span style={{ color: "orange", fontSize: "4rem", textTransform: "capitalize" }}>{userData.name}</span>
                    </div>}
            <div className='flex justify-between w-10/12'>
            <URL href={"/"}>Go to Homepage</URL>

                {userData && role === "voter" &&
                    <h1 style={{ color: "red", fontSize: "2rem" }}>You have {userData.isVoted ? <span style={{ color: "green" }}>voted</span> : "not voted"}</h1>}
                {
                    userData && role === "admin" &&
                    <div>
                        <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-8 p-6 bg-white rounded shadow-md">
                            <h1 className='text-red-500 text-center m-3'>Add a New Candidate</h1>
                            <label className="block mb-4">
                                <span className="text-gray-700">Name:</span>
                                <input type="text" name="name" value={formData.name} onChange={handleChange} required className="form-input p-0.2 bg-green-500 mt-1 block w-full" />
                            </label>
                            <label className="block mb-4">
                                <span className="text-gray-700">Age:</span>
                                <input type="number" name="age" value={formData.age} onChange={handleChange} required className="form-input p-0.2 bg-green-500 mt-1 block w-full" />
                            </label>
                            <label className="block mb-4">
                                <span className="text-gray-700">Party</span>
                                <input type="text" name="party" value={formData.party} onChange={handleChange} required className="form-input p-0.2 bg-green-500 mt-1 block w-full" />
                            </label>
                            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Submit</button>
                        </form>

                        <form onSubmit={handleDelete} className="max-w-md mx-auto mb-2 mt-8 p-6 bg-white rounded shadow-md">
                            <label className="block mb-4">
                                <h1 className='text-red-500 text-center m-3'>Delete A Candidate</h1>
                                <input type="text" name="candidateId" value={candidateId} onChange={(e)=>setCandidateId(e.target.value)} placeholder='candidate id' required className="form-input p-0.2 bg-gray-500 mt-1 block w-full" />
                            </label>
                            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Submit</button>
                        </form>
                    </div>
                }
                <ToastContainer />
            </div>
        </CardCenter>
    );
};

export default dashboard;
