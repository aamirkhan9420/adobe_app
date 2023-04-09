import { Box, FormControl, Input, useToast } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from 'axios'
import { useLocation } from 'react-router-dom'
function Userform() {
  let {state}=useLocation()
  let [name, setName] = useState(state?.name||"")
  let [email, setEmail] = useState(state?.email||"")
  let [bio, setBio] = useState(state?.bio||"")
  let toast = useToast()
  
  let handleForm = (e) => {
    e.preventDefault()
    let data = {
      name,
      email,
      bio
    }
 
    axios.post("http://localhost:8080/users", data).then((res) => {

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

  let handleEditForm=(e)=>{
    e.preventDefault()
    let data = {
      name,
      email,
      bio
    }
 
    axios.put(`http://localhost:8080/users/${state._id}`, data).then((res) => {

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
      <Box borderRadius={10} p={2} w={{ base: "90%", sm: "70%", md: "50%", lg: "35%", xl: "25%" }} margin={"auto"} fontWeight={600} bgColor={"#CD5D67"} color={"white"}>{state?"Edit user information":"Please fill user information to create profile"}</Box>
      <Box p={{ base: 2, sm: 10, md: 10, lg: 10, xl: 10 }} w={{ base: "90%", sm: "70%", md: "50%", lg: "35%", xl: "25%" }} margin={"auto"} boxShadow={"md"} >
        <form onSubmit={state?handleEditForm: handleForm} >
          <FormControl display={"flex"} flexDir={"column"} gap={10}>
            <Input borderRadius={"none"} required={true} value={name} type='string' placeholder='Enter Your Name' minLength={1} maxLength={50} onChange={(e) => setName(e.target.value)} />
            <Input borderRadius={"none"} required={true} value={email} type='email' placeholder='Enter Your Email' onChange={(e) => setEmail(e.target.value)} />
            <Input borderRadius={"none"} value={bio} type='string' placeholder='Enter Your Biodata' onChange={(e) => setBio(e.target.value)} />
           {state? <Input cursor={"pointer"} type='submit' value={"Edit"} bgColor={"orange"} color={"white"} fontWeight={600} />
           :<Input cursor={"pointer"}  type='submit' value={"submit"} bgColor={"orange"} color={"white"} fontWeight={600} />
           }
            

          </FormControl>
        </form>
      </Box>
    </Box>
  )
}

export default Userform

