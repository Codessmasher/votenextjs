"use client"
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Candidates() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://votebackend.vercel.app/api/candidates');
        let data = await response.json();
        setCandidates(data.response);
        console.log(data.response)
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid place-items-center align-items-center m-5">
      <h1 className="text-xl text-green-500">Following are the list of candidates</h1>
      {candidates && candidates.map((cand, key) => {
        return (
          <div className="m-5" key={key}>
            <h2>{key + 1})  <span className="text-yellow-500">{cand.name}</span> is from <span className="text-red-500">{cand.party}     :</span>
            <Link href={`/candidates/${cand._id}`} className="bg-orange-500 m-1 p-1 w-3/12 text-s">VIEW</Link>
            </h2>
          </div>
        )
      }
      ) 
      }
    </div>
  );
}
