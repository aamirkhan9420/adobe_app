import { Avatar, Box,  Grid, Heading, useToast } from '@chakra-ui/react'
import React from 'react'
import { GrView } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';



function GridBox({ props }) {
    let navigate=useNavigate()
    let toast=useToast()
    let handleView=(el)=>{
       navigate("/viewuser",{state:el})
        }

    let handleDelete=(id)=>{
        axios.post(`http://localhost:8080/users/${id}`).then((res) => {

        // toast({
        //   title: res.data.msg,
        //   status: "success",
        //   position: "top",
        //   isClosable: true
        // })
  
      }).catch((er) => {
        console.log(er)
      })
    }

    return (
       
        <Box w= {{base:"100%", sm:"100%", md:"90%", lg:"80%", xl:"80%"}} margin={"auto"} mt={20}>

            <Grid templateColumns={{base: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(2, 1fr)', xl: 'repeat(2, 1fr)'}} gap={5}>
                {props.length > 0 && props.map((el,index) => (
                    <Box boxShadow={"md"} w={"80%"} m={"auto"} p={4} key={index}>
                        <Box>
                            <Avatar name={el.name} />
                            <Heading size='md' >{el.name}</Heading>
                        </Box>
                        <Box display={"flex"} alignItems={"center"} justifyContent={"space-evenly"} p={2} fontSize={20} >
                              <GrView cursor={"pointer"} onClick={()=>handleView(el)}/>
                              <FiEdit cursor={"pointer"} onClick={()=>handleDelete(el._id)}/>
                              <MdDeleteForever cursor={"pointer"}/>
                        </Box>
                    </Box>
                ))}
            </Grid>

        </Box>
    )
}

export default GridBox