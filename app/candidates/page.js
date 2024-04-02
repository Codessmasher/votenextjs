"use client"
import { useEffect, useState } from "react";
import URL from "../utils/URL/page";

export default function Candidates() {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true); // State variable to track loading

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://votebackend.vercel.app/api/candidates');
        let data = await response.json();
        setCandidates(data.response);
        setLoading(false); // Once data is fetched, set loading to false
      } catch (error) {
        console.error('Error fetching candidates:', error);
        setLoading(false); // In case of error, still set loading to false
      }
    };

    fetchData();
  }, []);

  return (
    <div className="grid place-items-center align-items-center m-5">
      <URL href={"/"}>Go to Homepage</URL>
      <h1 className="text-xl text-green-500">Following are the list of candidates</h1>
      {loading ? ( // Check loading state
        <h1 className="p-4 text-xl">Loading...</h1>
      ) : (
        
        <table className="m-5 table-auto border-collapse border">
          <thead>
            <tr className="border sm:p-2">
              <th className="border sm:p-2">Party</th>
              <th className="border sm:p-2">Candidate Name</th>
              <th className="border sm:p-2 sm:grid hidden">Candidate ID</th>
              <th className="border sm:p-2">View Details</th>
            </tr>
          </thead>
          <tbody>
            {candidates.map((cand, key) => (
              <tr key={key}>
                <td className="border sm:p-2 text-red-500">{cand.party}</td>
                <td className="border sm:p-2 text-green-500">{cand.name}</td>
                <td className="border sm:p-2 text-pink-500 sm:grid hidden">{cand._id}</td>
                <td className="border sm:p-2">
                  <URL href={`/candidates/${cand._id}`} color={"orange"} width={"60px"}>VIEW</URL>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
