import { Box, Heading } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function UserAnalytics() {
  let [totalUser, serTotalUser] = useState("")
  let getUserAnalytics = () => {
    axios.get("http://localhost:8080/users/analytics/users").then((res) => {
      serTotalUser(res.data.msg.length)
    }).catch((er) => {
      console.log(er)
    })
  }
  useEffect(() => {
    getUserAnalytics()
  }, [])
  return (
    <Box>
      <Box borderRadius={10} boxShadow={"md"} display={"flex"} alignItems={"center"} justifyContent={"space-evenly"} p={10} w={"40%"} m={"auto"} mt={50} bgColor={"white"}>
        <Heading size={"md"}>Total Users</Heading>
        <Box bgColor={"#EB6424"} borderRadius={"50%"} fontSize={80} color={"white"} w={"20%"} >
          {totalUser}
        </Box>
      </Box>

    </Box>
  )
}

export default UserAnalytics