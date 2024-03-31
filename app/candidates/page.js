"use client"
import { useEffect, useState } from "react"; 
import URL from "../utils/URL/page";
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
      <URL href={"/"}>Go to Homepage</URL>
      <h1 className="text-xl text-green-500">Following are the list of candidates</h1>
      {candidates && candidates.map((cand, key) => {
        return (
          <div className="m-5" key={key}>
            <h2>{key + 1})  <span className="text-yellow-500">{cand.name}</span> is from <span className="text-red-500">{cand.party}     :</span>
              <URL href={`/candidates/${cand._id}`} color={"orange"} width={"60px"}>VIEW</URL>
            </h2>
          </div>
        )
      }
      )
      }
    </div>
  );
}
