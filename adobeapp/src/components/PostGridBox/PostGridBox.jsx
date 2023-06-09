import { Box, Grid, Text, useToast } from '@chakra-ui/react'
import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { GrView } from "react-icons/gr";
import { FiEdit } from "react-icons/fi";
import { MdDeleteForever } from "react-icons/md";
import { AiOutlineLike } from "react-icons/ai";
import { BiDislike } from "react-icons/bi";

import axios from 'axios';

function PostGridBox({ props, getPostList, getPostAnalytics, getMostFiveUserList }) {
    let navigate = useNavigate()
    let toast = useToast()
    let location = useLocation()
    let token = localStorage.getItem("token")
    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    let handleView = (el) => {
        navigate("/viewuser", { state: el })
    }

    let handleDelete = (id) => {
        axios.delete(`https://adobe-media.onrender.com/posts/${id}`, config).then((res) => {
            if (location.pathname == "/postanalytics") {
                getPostAnalytics()
                getMostFiveUserList()
            }
            toast({
                title: res.data.msg,
                status: "success",
                position: "top",
                isClosable: true
            })
            getPostList()

        }).catch((er) => {
            console.log(er)
        })
    }

    let handleEdit = (el) => {
        navigate("/postform", { state: el })
    }

    let handleLike = (like, id) => {
        axios.post(`https://adobe-media.onrender.com/posts/${id}/like`, { likes: like }, config).then((res) => {
            if (location.pathname == "/postanalytics") {
                getPostAnalytics()
                getMostFiveUserList()
            }
            getPostList()

        }).catch((er) => {
            console.log(er)
        })
    }
    let unlikefun = (like, id) => {
        axios.post(`https://adobe-media.onrender.com/posts/${id}/unlike`, { likes: like }, config).then((res) => {
            if (location.pathname == "/postanalytics") {
                getPostAnalytics()
                getMostFiveUserList()
            }
            getPostList()

        }).catch((er) => {
            console.log(er)
        })
    }



    return (
        <Box w={{ base: "100%", sm: "100%", md: "90%", lg: "80%", xl: "80%" }} margin={"auto"} mt={20}>

            <Grid templateColumns={{ base: 'repeat(1, 1fr)', sm: 'repeat(1, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(2, 1fr)', xl: 'repeat(2, 1fr)' }} gap={5}>
                {props.length > 0 && props.map((el, index) => (
                    <Box boxShadow={"md"} w={"80%"} m={"auto"} p={5} key={index} borderRadius={10}>
                        <Box bgColor={"gray"} p={5}>
                            <Text color={"white"}>{el.content}</Text>
                        </Box>
                        <Box display={"flex"} alignItems={"center"} justifyContent={"space-evenly"} p={2} fontSize={20} >
                            <GrView cursor={"pointer"} onClick={() => handleView(el)} />
                            <FiEdit cursor={"pointer"} onClick={() => handleEdit(el)} />
                            <MdDeleteForever cursor={"pointer"} onClick={() => handleDelete(el._id)} />
                            <AiOutlineLike cursor={"pointer"} onClick={() => handleLike(el.likes, el._id)} />
                            <span>{el.likes}</span>
                            <BiDislike cursor={"pointer"} onClick={() => unlikefun(el.likes, el._id)} />
                        </Box>
                    </Box>
                ))}
            </Grid>

        </Box>
    )
}

export default PostGridBox