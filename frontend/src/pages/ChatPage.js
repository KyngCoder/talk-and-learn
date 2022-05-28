import React,{useState,useEffect} from 'react'
import axios from 'axios'
import { ChatState } from '../components/context/ChatProvider'
import {Box} from '@chakra-ui/layout'
import SideDrawer from '../components/miscellaneous/SideDrawer'
import MyChats from '../components/MyChats'
import ChatBox from '../components/ChatBox'


const ChatPage = () => {
  const {user} = ChatState()  
  const [fetchAgain,setFetchAgain] = useState(false)
  return (
    <div style={{width:"100%"}}>
     {user && <SideDrawer />}
     <Box display="flex" justifyContent="space-between" w="100%" h="92.vh" p="10px">
       {user && <MyChats fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
       {user && <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />}
     </Box>

    </div>
  )
}

export default ChatPage