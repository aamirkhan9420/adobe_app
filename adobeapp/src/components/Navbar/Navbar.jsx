import { Box, Drawer, DrawerBody, DrawerCloseButton, DrawerContent,  DrawerOverlay, Flex, Stack, useDisclosure } from '@chakra-ui/react'
import React, { useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { HamburgerIcon } from "@chakra-ui/icons"
function Navbar() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef()

  return (
    <Flex zIndex={700} w={"100%"} boxShadow="sm" height={"80px"} alignItems={"center"} justifyContent="space-evenly" bgColor={"#CD5D67"} position="sticky" top={0}  >
      <Box textAlign={"center"} borderRadius={5} bgGradient='linear(to-r, green.200, pink.500)' color={'white'} p={2}>
        <Link to={"/userform"}>
          Adobe Media
        </Link>
      </Box>
      <Flex display={["none", "none", "none", "flex"]} align={"center"} justifyContent="space-evenly" width={"70%"} fontSize={['10px', '14px', '16px', '16px']} color="teal.900" fontWeight={600}>
        <Box color={"white"}>
          <NavLink to={"/userform"}>
            Create Profile
          </NavLink>
        </Box>

        <Box color={"white"}>
          <NavLink to={"/userlist"}>
            UserList
          </NavLink>
        </Box>

        <Box color={"white"}>
          <NavLink to={"/useranalytics"}>
            UserAnalytics
          </NavLink>
        </Box>
        <Box color={"white"}>
          <NavLink to={"/postform"}>
            Create Post
          </NavLink>
        </Box>
        <Box color={"white"}>
          <NavLink to={"/postlist"}>
            PostList
          </NavLink>
        </Box>
        <Box color={"white"}>
          <NavLink to={"/postanalytics"}>
            PostAnalytics
          </NavLink>
        </Box>
      </Flex>

      {/* if screen size is small or medium */}
      <>
        <HamburgerIcon aria-label='Options' as={HamburgerIcon} fontSize={30} color="white" onClick={onOpen} ref={btnRef} display={["flex", "flex", "flex", "none"]} />
        <Drawer
          isOpen={isOpen}
          placement='right'
          onClose={onClose}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton color="white" />
            <DrawerBody bgColor={"#66b9bf"} color="white" fontWeight={600}>
              <Stack spacing={30}>
                <Box color={"white"}>
                  <NavLink to={"/userform"}>
                    Create Profile
                  </NavLink>
                </Box>
                <Box color={"white"}>
                  <NavLink to={"/userlist"}>
                    UserList
                  </NavLink>
                </Box>

                <Box color={"white"}>
                  <NavLink to={"/useranalytics"}>
                    UserAnalytics
                  </NavLink>
                </Box>
                <Box color={"white"}>
                  <NavLink to={"/postform"}>
                    Create Post
                  </NavLink>
                </Box>
                <Box color={"white"}>
                  <NavLink to={"/postlist"}>
                    PostList
                  </NavLink>
                </Box>
                <Box color={"white"}>
                  <NavLink to={"/postanalytics"}>
                    PostAnalytics
                  </NavLink>
                </Box>
              </Stack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </>
    </Flex>
  )
}

export default Navbar

