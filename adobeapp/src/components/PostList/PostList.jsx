import { Box, Spinner } from '@chakra-ui/react'
import React, { Suspense, lazy, useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
let PostGridBox = lazy(() => wait(1000).then(() => import('../PostGridBox/PostGridBox')))

function PostList() {
  let [postList, setpostList] = useState([])
  let navigate = useNavigate()

  let token = localStorage.getItem("token")
  const config = {
    headers: { Authorization: `Bearer ${token}` }
  };

  let getPostList = () => {
    axios.get("https://adobe-media.onrender.com/posts/analytics/posts", config).then((res) => {
      setpostList(res.data.msg)
    }).catch((er) => {
      console.log(er)
    })
  }

  useEffect(() => {
    if (token === null) {
      return navigate("/userform")
    }
    getPostList()

  }, [])
  if (token === null) {
    return navigate("/userform")
  }
  return (
    <Box>
      <Box>
        <Suspense fallback={<Box m={"auto"} mt={"40vh"}><Spinner /></Box>}>
          <PostGridBox props={postList} getPostList={getPostList} />
        </Suspense>
      </Box>
    </Box>
  )
}

export default PostList

let wait = (t) => {
  return new Promise(res => {
    setTimeout(() => {
      res()
    }, t);
  })
}