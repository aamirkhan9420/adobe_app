import React, { Suspense, lazy, useEffect, useState } from 'react'
import { Box, Heading, Spinner } from '@chakra-ui/react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
let PostGridBox = lazy(() => wait(1000).then(() => import('../PostGridBox/PostGridBox')))

function PostAnalytics() {
  let [totalPost, setTotalPost] = useState("")
  let [mostLiked, setMostLiked] = useState([])
  let navigate = useNavigate()
  let token = localStorage.getItem("token")
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  let getPostAnalytics = () => {

    axios.get("https://adobe-media.onrender.com/posts/analytics/posts", config).then((res) => {
      setTotalPost(res.data.msg.length)
    }).catch((er) => {
      console.log(er)
    })
  }

  let getMostFiveUserList = () => {

    axios.get("https://adobe-media.onrender.com/posts/analytics/posts/top-liked", config).then((res) => {
      setMostLiked(res.data.msg)
    }).catch((er) => {
      console.log(er)
    })
  }
  useEffect(() => {
    if (token === null) {
      return navigate("/userform")
    }
    getPostAnalytics()
    getMostFiveUserList()

  }, [])
  if (token === null) {
    return navigate("/userform")
  }
  return (
    <Box display={"flex"} flexDir={"column"} justifyContent={"space-evenly"} gap={10} pb={20} pt={20}>
      <Box bgColor={"#CD5D67"} w={{ base: "80%", sm: "85%", md: "75%", lg: "50%", xl: "40%" }} borderRadius={10} boxShadow={"md"} display={"flex"} alignItems={"center"} justifyContent={"space-evenly"} p={10} m={"auto"} color={"white"}>
        <Heading size={"md"}>Total Posts</Heading>
        <Box bgColor={"#EB6424"} borderRadius={"50%"} fontSize={{ base: 55, sm: 70, md: 70, lg: 80, xl: 80 }} color={"white"} w={{ base: "45%", sm: "25%", md: "20%", lg: "25%", xl: "22%" }} >
          {totalPost}
        </Box>
      </Box>
      <Box>

        <Box w={{ base: "75%", sm: "75%", md: "75%", lg: "90%", xl: "75%" }} bgGradient='linear(to-r, green.200, pink.500)' fontSize={18} fontWeight={600} p={2} m={"auto"} color={"white"}>Top Most Liked Posts</Box>
        <Suspense fallback={<Box m={"auto"} mt={"40vh"}><Spinner /></Box>}>
          <PostGridBox props={mostLiked} getPostAnalytics={getPostAnalytics} getMostFiveUserList={getMostFiveUserList} />
        </Suspense>
      </Box>

    </Box>
  )
}

export default PostAnalytics

let wait = (t) => {
  return new Promise(res => {
    setTimeout(() => {
      res()
    }, t);
  })
}