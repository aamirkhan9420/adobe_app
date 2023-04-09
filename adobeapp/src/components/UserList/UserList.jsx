import { Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import GridBox from '../Grid/GridBox'
import axios from 'axios'
function UserList() {
  let [userList, setUserList] = useState([])
  let getUserList = () => {
    let token=localStorage.getItem("token")
    const config = {
      headers: { Authorization: `Bearer ${token}` }
  };
    axios.get("http://localhost:8080/users/analytics/users",config).then((res) => {
      setUserList(res.data.msg)
    }).catch((er) => {
      console.log(er)
    })
  }
  useEffect(() => {

    getUserList()

  }, [])
  return (
    <Box>
      <GridBox props={userList} getUserList={getUserList} />
    </Box>
  )
}

export default UserList