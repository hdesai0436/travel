import React from 'react'
import { Button, Checkbox, Label, TextInput } from "flowbite-react";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [formdata,setformdata] = useState({
        username:"",
         email: "",
        first_name: "",
        last_name: "",
        password: "",
        password2: "",
        })
    const navigation = useNavigate();
    const [message,setMessage] = useState("")
    const [messageType,setMessageType] = useState("")
    const handlechnage = (e) => {
        setformdata({ ...formdata, [e.target.name]: e.target.value });
    };
    const handlesubmit = async (e) => {
        console.log(formdata.username)
       e.preventDefault();
       try{
        const reponse = await fetch("http://127.0.0.1:8000/api/create/user",{
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({
            username: formdata.username,
            email: formdata.email,
            first_name: formdata.first_name,
            last_name: formdata.last_name,
            password: formdata.password,
            password2: formdata.password2,
            }),
        });
        const data = await reponse.json();
        console.log(data)
        if (reponse.ok) {
                setMessage("User registered successfully!");
                setMessageType("success");
                navigation("/user/login");
                
            } else {
                const errors = Object.values(data).flat().join(" ");
                console.log(errors)
                setMessage(errors || "An error occurred");
                setMessageType("error");
            }
       }catch (error) {
      setMessage("Network error");
      setMessageType("error");
    }
    }
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
  {/* Header */}
  <h1 className="text-2xl font-bold mb-6 text-gray-700">Create User</h1>

  {/* Form */}
  <form className="flex w-full max-w-lg flex-col gap-6 bg-white p-8 rounded-lg shadow-lg" onSubmit={handlesubmit}>

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


    {/* First Name */}
    <div>
      <Label htmlFor="first-name">First Name</Label>
      <TextInput id="first_name" name='first_name' type="text" placeholder="John" required shadow value={formdata.first_name} onChange={handlechnage} />
    </div>

    {/* Last Name */}
    <div>
      <Label htmlFor="last-name">Last Name</Label>
      <TextInput id="last_name" name='last_name' type="text" placeholder="Doe" required shadow value={formdata.last_name} onChange={handlechnage} />
    </div>

    {/* Username */}
    <div>
      <Label htmlFor="username">Username</Label>
      <TextInput id="username" name='username' type="text" placeholder="johndoe123" required shadow value={formdata.username} onChange={handlechnage}/>
    </div>

    {/* Email */}
    <div>
      <Label htmlFor="email">Your email</Label>
      <TextInput id="email" name='email' type="email" placeholder="name@flowbite.com" required shadow value={formdata.email} onChange={handlechnage} />
    </div>

    {/* Password */}
    <div>
      <Label htmlFor="password">Your password</Label>
      <TextInput id="password" name='password' type="password" required shadow value={formdata.password} onChange={handlechnage} />
    </div>

    {/* Repeat Password */}
    <div>
      <Label htmlFor="password2">Repeat password</Label>
      <TextInput id="password2" name='password2' type="password" required shadow value={formdata.password2} onChange={handlechnage}  />
    </div>

    {/* Agreement Checkbox */}
    

    {/* Submit Button */}
    <Button type="submit">Register new account</Button>
  </form>
</div>
  )
}

export default Signup