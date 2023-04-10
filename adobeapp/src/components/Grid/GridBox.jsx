import { Avatar, Box, Grid, Heading, cookieStorageManager, useToast } from '@chakra-ui/react'
import React from 'react'
import { GrView } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';



function GridBox({ props, getUserList, getUserAnalytics, getTopFiveUserList }) {
    let navigate = useNavigate()
    let toast = useToast()
    let location = useLocation()

    let handleView = (el) => {
        navigate("/viewuser", { state: el })
    }
    let token = localStorage.getItem("token")
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };
    let handleDelete = (id) => {
        if (location.pathname == "/useranalytics") {
            getUserAnalytics()
            getTopFiveUserList()
        }
        axios.delete(`http://localhost:8080/users/${id}`, config).then((res) => {
            toast({
                title: res.data.msg,
                status: "success",
                position: "top",
                isClosable: true
            })
            getUserList()


        }).catch((er) => {
            console.log(er)
        })
    }
    let handleEdit = (el) => {
        navigate("/userform", { state: el })
    }
    return (

        <Box w={{ base: "100%", sm: "100%", md: "90%", lg: "80%", xl: "80%" }} margin={"auto"} mt={20}>

            <Grid templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(2, 1fr)', xl: 'repeat(2, 1fr)' }} gap={5}>
                {props.length > 0 && props.map((el, index) => (
                    <Box boxShadow={"md"} w={"80%"} m={"auto"} p={4} key={index} borderRadius={10}>
                        <Box>
                            <Avatar name={el.name} />
                            <Heading size='md' >{el.name}</Heading>
                        </Box>
                        <Box display={"flex"} alignItems={"center"} justifyContent={"space-evenly"} p={2} fontSize={20} >
                            <GrView cursor={"pointer"} onClick={() => handleView(el)} />
                            <FiEdit cursor={"pointer"} onClick={() => handleEdit(el)} />
                            <MdDeleteForever cursor={"pointer"} onClick={() => handleDelete(el._id)} />
                        </Box>
                    </Box>
                ))}
            </Grid>

        </Box>
    )
}

export default GridBox