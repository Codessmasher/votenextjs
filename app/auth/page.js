"use client"
import { useEffect,useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import 'react-toastify/dist/ReactToastify.css';
const Auth =() => {
    const [token,setToken]=useState();
    useEffect(() => {
        setToken(localStorage.getItem('token'));
    },[])
    const router = useRouter();
    if(!token)return router.push('/signin');
    try {
         fetch('https://votebackend.vercel.app/api/users/profile', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
                'Access-Control-Allow-Origin': "http://localhost:3000"
            }
        }).then(res => res.json()).then(data => {
            // console.log(data);
            localStorage.setItem('profile.role', JSON.stringify(data.result[0].role));
            localStorage.setItem('profile.isVoted', JSON.stringify(data.result[0].isVoted));
            localStorage.setItem('profile.name', JSON.stringify(data.result[0].name));
            router.push('/');
        }).catch(error => console.log(error));
    } catch (error) {
        // console.error(error);
        toast.error(error);
    }
    return (
        <div>
            <ToastContainer />
        </div>
    )
};



export default Auth;
