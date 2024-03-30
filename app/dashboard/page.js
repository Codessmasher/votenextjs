"use client"
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const Auth = () => {
    const [token, setToken] = useState('');
    const [userData, setUserData] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        if (!storedToken) {
            router.push('/signin'); // Redirect to signin if token is not found
        } else {
            setToken(storedToken);
        }
    }, []);

    useEffect(() => {
        if (token) {
            fetch('https://votebackend.vercel.app/api/users/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Access-Control-Allow-Origin': 'http://localhost:3000'
                }
            })
            .then(res => {
                if (!res.ok) {
                    throw new Error('Failed to fetch user profile');
                }
                return res.json();
            })
            .then(data => {
                localStorage.setItem('profile.role', JSON.stringify(data.result[0].role));
                localStorage.setItem('profile.isVoted', JSON.stringify(data.result[0].isVoted));
                localStorage.setItem('profile.name', JSON.stringify(data.result[0].name));
                setUserData(data.result[0]); // Set user data to state
            })
            .catch(error => {
                console.error(error);
                // Handle error or redirect as needed
            });
        }
    }, [token]);

    return (
        <div>
            {userData && <h1>Hello {userData.name}</h1>} 
            {userData && <h1>You are {userData.role}</h1>} 
            {userData && <h1>You have {userData.isVoted?"voted":"not voted"}</h1>} 
        </div>
    );
};

export default Auth; 
