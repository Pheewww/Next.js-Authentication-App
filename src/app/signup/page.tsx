"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import {Stack,Box, Button, IconButton,Typography, TextField} from '@mui/material'
import SendIcon from '@mui/icons-material/Send';






export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user);
            console.log("Signup success", response.data);
            router.push("/login");
            
        } catch (error:any) {
            console.log("Signup failed", error.message);
            
            toast.error(error.message);
        }finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);


    return (
   


        
        <div>
                <Box >
        <Stack spacing={2} direction='column'>
             <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading ? "Processing" : "Signup"}</h1>
        <hr />
            <Stack spacing={4} direction='column' >
                  <TextField  id="username" label = 'Username' variant = 'standard'  type = 'text' value={user.username}
            onChange={(e) => setUser({...user, username: e.target.value})}><Typography gutterbottom = 'true' variant="h6" component="h2">
    <label htmlFor="username">Username</label>
</Typography></TextField>
        
       
      
             
      <TextField gutterbottom label = 'Email' variant = 'standard' id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}><Typography variant="h6" component="h2">
    <label htmlFor="email">Email</label>
</Typography></TextField>
       
            
<TextField gutterbottom label = 'Password' variant = 'standard' id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}>
                <Typography 
                variant="h6"
                 component="h2">

  <label htmlFor="password">Password</label>

</Typography>
</TextField>
<Button
        onClick={onSignup}
        disabled={buttonDisabled}
        variant="contained"
        className="mb-4"
         style={{ backgroundColor: "blue", color: "white" }}
      >
        {loading ? "Processing" : "Signup"}
      </Button>
       
        
      <Button variant ="outlined" href="/login"  startIcon={<SendIcon/>}
            >Visit login page</Button></Stack>
            </div>
            </Stack>
         
       
</Box> 
        </div>
        
    )

}















