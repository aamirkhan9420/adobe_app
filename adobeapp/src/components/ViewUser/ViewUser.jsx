import { Avatar, Box, Text } from '@chakra-ui/react'
import React from 'react'
import { useLocation } from 'react-router-dom'

function ViewUser() {
    let {state}=useLocation()
  return (
    <Box w={"100%"}>
        <Box borderRadius={10} bgColor={"#CD5D67"} color={"white"} w={"fit-content"} p={{base:2, sm:2, md:2, lg:4, xl:6}} m={"auto"} mt={100} boxShadow={"md"} display={{lg:"flex",xl:"flex"}} gap={2}>
           {!state.content&& <Box bgColor={"#EB6424"} p={5} display={"flex"} alignItems={"center"} flexDir={"column"} justifyContent={"center"}>
               <Avatar name={state.name} /> 
                 <Text fontWeight={600} color={"white"} fontSize={20}>{state.name}</Text>
            </Box>}
            <Box  bgColor={"#EB6424"} p={2} textAlign={'left'} display={"flex"} flexDir={"column"} gap={8} fontWeight={600} fontSize={20}>
              {state.content&&<Text>{state.content}</Text>}
              {state.content&&<Text><span>likes:</span>{state.likes}</Text>}

                {!state.content&&<Text><span> Email: </span> {state.email}</Text>}
                {!state.content&&<Text><span>  Biodata:</span> {state.bio}</Text>}
                <Text><span> Account Created at:</span>  {state.createdAt}</Text>
                <Text><span> Account Updated at:</span>  {state.updatedAt}</Text>             

            </Box>

           
        </Box>
    </Box>
  )
}

export default ViewUser