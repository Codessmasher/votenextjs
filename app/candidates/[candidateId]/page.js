"use client"
import { useEffect, useState } from "react";
import URL from "../../utils/URL/page";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Button from "../../utils/Button/page";

export default function Candidate({ params }) {
    const [candidates, setCandidates] = useState([]);
    const [loading, setLoading] = useState(true);
    const candidateId = params.candidateId;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://votebackend.vercel.app/api/candidates/${candidateId}`);
                const data = await response.json();
                setCandidates(data.response[0]);
                setLoading(false);
                console.log(data.response[0]);
            } catch (error) {
                console.error('Error fetching candidates:', error);
                setLoading(false);
            }
        };

        fetchData();
    }, [candidateId]);

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
            });
            const data = await res.json();
            if (res.ok) {
                localStorage.setItem("profile.isVoted", true);
                toast.success("Voted Successfully");
            } else {
                toast.error(data.error);
            }
        } catch (error) {
            console.log(error);
            toast.error("Error occurred while voting");
        }
    };

    return (
        <>
            <div className="grid place-items-center align-items-center m-5">
                <URL href={"/"}>Go to Homepage</URL>
                <h1 className="text-green-500">Following is the details of the Candidate</h1>
                {loading ? (
                        <h1 className="p-4 text-xl">Loading...</h1>
                ) : (
                    <div className="grid place-items-center">
                        <div className="m-5">
                            <h2>
                                <span className="text-yellow-500 text-xl">
                                    {candidates.name}
                                </span> is from&nbsp;
                                <span className="text-red-500 text-xl">
                                    {candidates.party}
                                </span>
                            </h2>
                        </div>
                        <Button onClick={handleVote} color={"blue"}>VOTE</Button>
                    </div>
                )}
            </div>
            <ToastContainer />
        </>
    );
}
