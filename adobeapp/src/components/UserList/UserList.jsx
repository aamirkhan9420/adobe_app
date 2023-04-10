import { Box, Spinner } from '@chakra-ui/react'
import React, { Suspense, lazy, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
let GridBox = lazy(() => wait(1000).then(() => import('../Grid/GridBox')))

function UserList() {
  let [userList, setUserList] = useState([])
  let navigate = useNavigate()

  let token = localStorage.getItem("token")
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  let getUserList = () => {
    axios.get("https://adobe-media.onrender.com/users/analytics/users", config).then((res) => {
      setUserList(res.data.msg)
    }).catch((er) => {
      console.log(er)
    })
  }
  useEffect(() => {
    if (token === null) {
      navigate("/userform")
    }
    getUserList()

  }, [])
  if (token === null) {
    return navigate("/userform")
  }
  return (
    <Box>
      <Suspense fallback={<Box m={"auto"} mt={"40vh"}><Spinner /></Box>}>
        <GridBox props={userList} getUserList={getUserList} />
      </Suspense>
    </Box>
  )
}

export default UserList

let wait = (t) => {
  return new Promise(res => {
    setTimeout(() => {
      res()
    }, t);
  })
}