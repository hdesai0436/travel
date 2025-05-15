import React from 'react'
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useState } from 'react';
function Login() {
  const [logindetail,setlogindetail] = useState({
    username:"",
    password:""
  })
  const [message,setMessage] = useState("")
  const [messageType,setMessageType] = useState("")
  const handlechnage = (e) => {
    setlogindetail({...logindetail,[e.target.name]:e.target.value})
  }
  const handlesubmit = async (e)=> {
     e.preventDefault();
     try{
      const res = await fetch("http://127.0.0.1:8000/api/user/login", {
        method:"post",
        headers:{
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: logindetail.username,
          password:logindetail.password
      }),
    });
      const data = await res.json();
      if(res.ok){
        localStorage.setItem('access_token',data['access_token']);
        localStorage.setItem('refresh_token',data['refresh_token'])
      } else {
        const errors = Object.values(data).flat().join(" ");
        setMessage(errors || "An error occurred");
        setMessageType("error");
      }
     }catch(error){

     }
  }
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
  <form onSubmit={handlesubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg border border-gray-300">
    
    {message && (
          <div
            className={`text-center p-3 rounded-lg ${
              messageType === "success"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}
    
    
    
    {/* Email Field */}
    <div>
      <Label htmlFor="username">Username</Label>
      <TextInput id="username" name="username" type="username" placeholder="Username" required className="w-full p-3" value={logindetail.username} onChange={handlechnage} />
    </div>

    {/* Password Field */}
    <div>
      <Label htmlFor="password">Your Password</Label>
      <TextInput id="password" name="password" type="password" required className="w-full p-3" value={logindetail.password} onChange={handlechnage} />
    </div>

    {/* Checkbox */}
    <div className="flex items-center gap-2">
      <Checkbox id="remember" />
      <Label htmlFor="remember">Remember me</Label>
    </div>

    {/* Submit Button */}
    <Button type="submit" className="w-full text-lg py-3 mt-4">
      Submit
    </Button>
  </form>
</div>
  )
}

export default Login