"use client";
import { useState, useEffect } from 'react';
import URL from './utils/URL/page';
import Image from 'next/image';
import Button from './utils/Button/page';


export default function Home() {
  const [login, setLogin] = useState(false); // Set default to false
  const [isVoted, setisVoted] = useState(false); // Set default to false 

  useEffect(() => {
    const token = localStorage.getItem('token');
    const votinginfo = localStorage.getItem('profile.isVoted');
    if (votinginfo && votinginfo == 'true') {
      setisVoted(true)
    }
    else {
      setisVoted(false);
    }
    if (token) {
      setLogin(true); // Update login state if token exists
    }
  }, []); // Run only once on component mount 

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('profile.role');
    localStorage.removeItem('profile.name');
    localStorage.removeItem('profile.isVoted');
    setLogin(false);
    setisVoted(false);
  }

  const handleResult = async () => {
    try {
      const response = await fetch('https://votebackend.vercel.app/api/results');
      let data = await response.json();
      alert("The Party " + data.winner + " is the winner");
    } catch (error) {
      console.error('Error fetching candidates:', error);
    }
  }
  return (
    <div className="grid m-5 justify-items-center">
      <Image src={"/favicon.ico"} width={300} height={300} alt='vote'></Image>
      <div>
        <h1 className="text-center text-yellow-500 btn p-2 w-12/12 text-xl m-1">Welcome to voting portal</h1>
      </div>
      {!isVoted && <h1 className="text-green-500 btn p-5 text-center text-2xl">Add Your Valuable Vote checking from the candidate list</h1>}
      {!login && (
        <div>
          <URL width={"200px"} href="/signup" color={"orange"}>Register</URL>
          <URL width={"200px"} href="/signin" color={"red"}>Signin</URL>
        </div>
      )}
      {isVoted && (
        <>
          <h1 className="text-center text-green-500 btn text-xl m-3">Thanks For Voting</h1>
          <Button onClick={handleResult} color={"green"}>Check Result</Button>
        </>
      )}

      {!isVoted && <URL width={"200px"} href="/candidates" color={"green"}>Candidate List</URL>}
      {login && <Button onClick={handleLogout} color={"red"} width={"8rem"}>LOGOUT</Button>}
      {login && <URL href="/dashboard" color={"yellow"}>Go to Dashboard</URL>
}
    </div>
  );
}
