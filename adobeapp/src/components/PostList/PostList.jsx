import { Box } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import PostGridBox from '../PostGridBox/PostGridBox';
import axios from 'axios';

function PostList() {
let [postList, setpostList] = useState([])
  let getPostList = () => {
    let token=localStorage.getItem("token")
    const config = {
      headers: { Authorization: `Bearer ${token}` }
  };
    axios.get("http://localhost:8080/posts/analytics/posts",config).then((res) => {
      setpostList(res.data.msg)
    }).catch((er) => {
      console.log(er)
    })
  }

  
  useEffect(() => {

    getPostList()

  }, [])
  return (
   <Box>
    <Box>
     <PostGridBox props={postList} getPostList={getPostList}/>
    </Box>
   </Box>
  )
}

export default PostList