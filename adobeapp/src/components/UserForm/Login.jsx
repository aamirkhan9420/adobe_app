import { Box, FormControl, Input, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
  
  let [email, setEmail] = useState("")
  let [password,setPassword]=useState("")
  let toast = useToast()
  let navigate=useNavigate()
  let handleForm = (e) => {
    e.preventDefault()
    let info = {
         email,
         password
    }
    axios.post("http://localhost:8080/users/login", info).then((res) => {
     console.log(res.data)
     localStorage.setItem("token",res.data.token)
      toast({
        title: res.data.msg,
        status: "success",
        position: "top",
        isClosable: true
      })
 
    }).catch((er) => {
      console.log(er)
    })
  }

    return (
        <Box w={"100%"} pt={100} pb={100} >
            <Box borderRadius={10} p={2} w={{ base: "90%", sm: "70%", md: "50%", lg: "35%", xl: "25%" }} margin={"auto"} fontWeight={600} bgColor={"#CD5D67"} color={"white"}>Please LogIn</Box>
            <Box p={{ base: 2, sm: 10, md: 10, lg: 10, xl: 10 }} w={{ base: "90%", sm: "70%", md: "50%", lg: "35%", xl: "25%" }} margin={"auto"} boxShadow={"md"} >
                <form onSubmit={handleForm} >
                    <FormControl display={"flex"} flexDir={"column"} gap={10}>
                        <Input borderRadius={"none"} required={true} value={email} type='email' placeholder='Enter Your Email' onChange={(e) => setEmail(e.target.value)} />
                        <Input borderRadius={"none"} value={password} type='string' placeholder='Enter Your Password' onChange={(e) => setPassword(e.target.value)} />
                        <Input cursor={"pointer"} type='submit' value={"LogIn"} bgColor={"orange"} color={"white"} fontWeight={600} />

                    </FormControl>
                </form>
            </Box>
        </Box>
    )
}

export default Login