import { Box, Button, FormControl, Input, Textarea, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function PostForm() {
  let { state } = useLocation()
  let [text, setText] = useState(state?.content || "")
  let toast = useToast()
  let navigate=useNavigate()
  let token = localStorage.getItem("token")
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  let handlePost = (e) => {
    e.preventDefault()
    let info = {
      content: text
    }
    axios.post("https://adobe-media.onrender.com/posts", info, config).then((res) => {
      toast({
        title: res.data.msg,
        status: res.data.status,
        position: "top",
        isClosable: true
      })

    }).catch((er) => {
      console.log(er)
    })
  }

  let handleEditForm = (e) => {
    e.preventDefault()
    let info = {
      content: text
    }
    axios.put(`https://adobe-media.onrender.com/posts/${state._id}`, info, config).then((res) => {
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
  useEffect(()=>{
    if(token===null){
      return navigate("/userform")
     }
  },[])
  if(token===null){
    return navigate("/userform")
   }
  return (
    <Box pt={20} >
      <Box  w={{ base: "90%", sm: "90%", md: "80%", lg: "50%", xl: "50%" }} boxShadow={"md"} m={"auto"} borderRadius={10} bgColor={"#CD5D67"}>
        <Box borderRadius={10} p={2} w={{ base: "90%", sm: "70%", md: "50%", lg: "35%", xl: "25%" }} margin={"auto"} fontWeight={600} bgColor={"#CD5D67"} color={"white"}>{state ? "EDIT POST" : "POST HERE"}</Box>
        <form onSubmit={state ? handleEditForm : handlePost} >
          <FormControl  display={"flex"} flexDir={"column"} gap={10} p={{ base: 8, sm: 10, md: 16, lg: 20, xl: 20 }}>
            <Textarea placeholder='Type something to post' value={text} borderRadius={"none"} bgColor={"white"} onChange={(e) => setText(e.target.value)} />
            {!state&&<Input cursor={"pointer"} type='submit' value={"POST"} bgColor={"orange"} m={"auto"} color={"white"} fontWeight={600} w={"50%"} />}
            {state && <Input cursor={"pointer"} type='submit' value={"EDIT"} bgColor={"orange"} m={"auto"} color={"white"} fontWeight={600} w={"50%"} />
            }
          
          </FormControl>
        </form>
      </Box>
    </Box>
  )
}

export default PostForm