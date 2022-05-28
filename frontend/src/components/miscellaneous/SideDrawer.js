import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import { Flex, Spacer } from '@chakra-ui/react'
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { Tooltip } from "@chakra-ui/tooltip";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useNavigate } from "react-router";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import ChatLoading from "../ChatLoading";
import { Spinner } from "@chakra-ui/spinner";
import ProfileModal from "./ProfileModal";
import { getSender } from "../../config/ChatLogics";
import UserListItem from "../userAvatar/UserListItem"
import { ChatState } from "../context/ChatProvider"
import { Search2Icon } from '@chakra-ui/icons'

import NotificationBadge, { Effect } from 'react-notification-badge'

const SideDrawer = () => {
  const {user,setSelectedChat,chats,setChats,notification,setNotification} = ChatState()
  const [search,setSearch] = useState("")
  const [searchResult,setSearchResult] = useState([])
  const [loading,setLoading] = useState(false);
  const [loadingChat,setLoadingChat] = useState()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('userInfo')
    navigate('/')
  }

  const handleSearch = async() => {
    if(!search){
      alert('please enter a search term')
    }

    try{
      setLoading(true)
      const config = {
        headers:{
          Authorization: `Bearer ${user.token}`
        }
      }
      const {data} =  await axios.get(`http://localhost:5000/api/user?search=${search}`,config)
      setLoading(false)
      setSearchResult(data)
    }catch{
      alert('no match')
    }
  }

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`http://localhost:5000/api/chat`, { userId }, config);
      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
        setSelectedChat(data);
        setLoadingChat(false);
        onClose();
      }
     
    } catch (error) {
      alert("failed to fetch chat")
    }
  };
  return (
    <>
      <Box
      display="flex"
      justifyContent="space-between"
      bg="white"
      w="100%"
      p="5px 10px 5px 10px"
      borderWidth="5px"
      >
      <Tooltip label="search user to chat" hasArrow placement="bottom-end">
          <Button variant="gh" onClick={onOpen}>
            <Search2Icon />
              <Text d={{base:"none",md:"flex"}} px="4">
                Search User
              </Text>
          </Button>
        </Tooltip>
       
        <Text fontSize="2xl">
          Ricky's Chat
        </Text>
         <div>
           <Menu>
             <MenuButton p={1}>
               <NotificationBadge count={notification.length} effect={Effect.SCALE} />
               <BellIcon fontSize="2xl" m={1}/>
             </MenuButton>
             <MenuList pl={2}>
              {!notification.length && "No New Messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(user, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
           </Menu>
           <Menu>
             <MenuButton as={Button} rightIcon={<ChevronDownIcon />}>
               <Avatar size="sm" cursor="pointer" name={user.name} src={user.pic} />
             </MenuButton>
             <MenuList>
                <ProfileModal user={user}>
                <MenuItem>My Profile</MenuItem>
                </ProfileModal>
             
               <MenuDivider />
               <MenuItem onClick={logout}>Logout</MenuItem>
             </MenuList>
           </Menu>
         </div>
   
      </Box>
      <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>Search Users</DrawerHeader>

          <DrawerBody>
            <Input value={search} 
            onChange={(e)=>setSearch(e.target.value)}
            placeholder='Search User...' />
            <Button onClick={handleSearch}>Search</Button>
            {loading? <ChatLoading /> : (
              searchResult?.map((user)=>(
                <UserListItem
                key={user._id}
                user={user}
                handleFunction={()=>accessChat(user._id)}
                 />
              ))
            )}
            {loadingChat && <Spinner ml="auto" display="flex" />}
          </DrawerBody>

        </DrawerContent>
      </Drawer>
    </>
  )
}

export default SideDrawer