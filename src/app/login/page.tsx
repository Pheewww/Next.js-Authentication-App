"use client";
import Link from "next/link";
import React, {useEffect} from "react";
import {useRouter} from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";
import {Stack,Box, Button, IconButton,Typography, TextField} from '@mui/material'
import SendIcon from '@mui/icons-material/Send';




export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
       
    })
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = React.useState(false);


    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/login", user);
            console.log("Login success", response.data);
            toast.success("Login success");
            router.push("/profile");
        } catch (error:any) {
            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally{
        setLoading(false);
        }
    }

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else{
            setButtonDisabled(true);
        }
    }, [user]);

    return (

        <div>
         <Stack spacing={2} direction='column'>


         <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1>{loading ? "Processing" : "Login"}</h1>
        <hr />


<Stack spacing={4} direction='column' >
<TextField   label = 'Email' variant = 'standard'   id="email"
            type="text"
            value={user.email}
            onChange={(e) => setUser({...user, email: e.target.value})}><Typography gutterbottom = 'true' variant="h6" component="h2">
    <label htmlFor="email">Email</label>
</Typography>
</TextField>
        
      

            <TextField   label = 'Password' variant = 'standard'   id="password"
            type="password"
            value={user.password}
            onChange={(e) => setUser({...user, password: e.target.value})}><Typography gutterbottom = 'true' variant="h6" component="h2">
    <label htmlFor="password">Password</label>
</Typography>
</TextField>


            <Button
       onClick={onLogin}
        disabled={buttonDisabled}
        variant="contained"
        className="mb-4"
         style={{ backgroundColor: "blue", color: "white" }}
      >
        Login Here
      </Button>
       
        
      <Button variant ="outlined" href="/signup"  startIcon={<SendIcon/>}
            >Visit Signup page</Button></Stack>
            </div>


             </Stack>
        </div>
    )

}