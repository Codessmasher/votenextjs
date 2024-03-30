"use client"
import { useEffect, useState } from "react"; 
import URL from "../../utils/URL/page";
import { ToastContainer,toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


export default function Candidate({ params }) {
    const [candidates, setCandidates] = useState([]);
    const candidateId = params.candidateId;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://votebackend.vercel.app/api/candidates/${candidateId}`);
                let data = await response.json();
                setCandidates(data.response[0]);
                console.log(data.response[0])
            } catch (error) {
                console.error('Error fetching candidates:', error);
            }
        };

        fetchData();
    }, []);

    const handleVote = async () => {
        const token = localStorage.getItem('token');
        if (!token) return toast.error('Please login to vote'); 
        try {
            const res = await fetch(`https://votebackend.vercel.app/api/vote/${candidateId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                    'Access-Control-Allow-Origin': 'http://localhost:3000'
                }
            }
            )
            const data = await res.json();
            if(res.ok) {
                localStorage.setItem("profile.isVoted",true);
                toast.success("Voted Successfully"); 
            }
            else toast.error(data.error);
            // console.log(data);
        } catch (error) {
            console.log(error);
            // toast.error(error.error);
        }

    }
    return (
        <>
            <div className="grid place-items-center align-items-center m-5">
            <URL href="/">Go to Homepage</URL>

                <h1>Following is the details of the Candidate</h1>
                <div className="m-5">
                    <h2>
                        <span className="text-yellow-500">
                            {candidates.name}
                        </span> is from&nbsp;
                        <span className="text-red-500">
                            {candidates.party}
                        </span>
                    </h2>
                </div>
                <button className="outline text-pink-500 p-1 pr-4 pl-4" onClick={handleVote}>VOTE</button>
            </div>
            <ToastContainer />
        </>

    );
}
