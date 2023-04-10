import { Box, FormControl, Input, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from 'axios'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'

function Userform() {
  let {state}=useLocation()
  let [name, setName] = useState(state?.name||"")
  let [email, setEmail] = useState(state?.email||"")
  let [bio, setBio] = useState(state?.bio||"")
  let [password,setPassword]=useState("")
  let toast = useToast()
  let navigate=useNavigate()
  let token = localStorage.getItem("token")
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };
  let handleForm = (e) => {
    e.preventDefault()
    let info = {
      name,
      email,
      bio,
      password
    }

    axios.post("https://adobe-media.onrender.com/users/signup", info,config).then((res) => {

      toast({
        title: res.data.msg,
        status: "success",
        position: "top",
        isClosable: true
      })
      navigate("/login")
    }).catch((er) => {
      console.log(er)
    })
  }

  let handleEditForm=(e)=>{
    e.preventDefault()
    let info = {
      name,
      email,
      bio
    }
 
    axios.put(`https://adobe-media.onrender.com/users/${state._id}`, info,config).then((res) => {

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
      <Box borderRadius={10} p={2} w={{ base: "90%", sm: "70%", md: "50%", lg: "35%", xl: "25%" }} margin={"auto"} fontWeight={600} bgColor={"#CD5D67"} color={"white"}>{state?"Edit user information":"Please signup to create profile"}</Box>
      <Box borderRadius={10} p={{ base: 2, sm: 10, md: 10, lg: 10, xl: 10 }} w={{ base: "90%", sm: "70%", md: "50%", lg: "35%", xl: "25%" }} margin={"auto"} boxShadow={"md"} >
        <form onSubmit={state?handleEditForm: handleForm} >
          <FormControl display={"flex"} flexDir={"column"} gap={10}>
            <Input borderRadius={"none"} required={true} value={name} type='string' placeholder='Enter Your Name' minLength={1} maxLength={50} onChange={(e) => setName(e.target.value)} />
            <Input borderRadius={"none"} required={true} value={email} type='email' placeholder='Enter Your Email' onChange={(e) => setEmail(e.target.value)} />
            <Input borderRadius={"none"} value={bio} type='string' placeholder='Enter Your Biodata' onChange={(e) => setBio(e.target.value)} />
           { !state&&<Input borderRadius={"none"} value={password} type='string' placeholder='Enter Your Password' onChange={(e) => setPassword(e.target.value)} />}

           {state? <Input cursor={"pointer"} type='submit' value={"Edit"} bgColor={"orange"} color={"white"} fontWeight={600} />
           :<Input cursor={"pointer"}  type='submit' value={"Signup"} bgColor={"orange"} color={"white"} fontWeight={600} />
           }
         </FormControl>
        </form>
        {!state&&<NavLink to={"/login"} color='blue'>
         If you have already account <span> Login</span>
        </NavLink>}
      </Box>
    </Box>
  )
}

export default Userform

