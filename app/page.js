"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const [login, setLogin] = useState(false); // Set default to false
  const [isVoted, setisVoted] = useState(false); // Set default to false
  const [result, setResult] = useState([]); // Set default to false

  useEffect(() => {
    const token = localStorage.getItem('token');
    setisVoted(localStorage.getItem('profile.isVoted'));
    if (token) {
      setLogin(true); // Update login state if token exists
    }
  }, []); // Run only once on component mount 
  const handleResult = async () => { 
      try {
        const response = await fetch('https://votebackend.vercel.app/api/results');
        let data = await response.json(); 
        alert("The Party "+data.winner+" is the winner");   
      } catch (error) {
        console.error('Error fetching candidates:', error);
      } 
  }
  return (
    <div className="grid m-5 justify-items-center">
      <Image src={"/favicon.ico"} width={300} height={400} alt='vote'></Image>
        <div>
          <h1 className="text-center text-yellow-500 btn p-2 w-12/12 text-xl m-1">Welcome to voting portal</h1> 
        </div> 
      <h1 className="text-green-500 btn p-5 text-center text-2xl">Add Your Valuable Vote</h1>
      {!login && (
        <div>
          <Link href="/signup" className="text-center bg-yellow-500 btn p-5 w-8/12 text-xl">Register</Link>
          <Link href="/signin" className="text-center bg-blue-500 btn p-5 w-8/12 text-xl m-1">Signin</Link>
        </div>
      )} 
      {isVoted && (
        <div>
          <h1 className="text-center text-green-500 btn text-xl m-3">Thanks For Voting</h1> 
          <button className="text-center bg-red-500 btn p-5 w-12/12 text-xl m-1" onClick={handleResult}>Check Result</button>
        </div>
      )}
      
      {!isVoted && <Link href="/candidates" className="text-center bg-green-500 btn m-5 p-5 w-6/12 text-xl">Candidate List</Link>}
    </div>
  );
}
