import React from 'react'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  IconButton,
  Button,
  Image,
  Text,
} from '@chakra-ui/react'

import { ViewIcon } from '@chakra-ui/icons'

const ProfileModal = ({user,children}) => {
  const {isOpen, onOpen, onClose} = useDisclosure()
  
  return (
    <>
      {
        children?<span onClick={onOpen}>{children}</span>
        :(
          <IconButton  icon={<ViewIcon />} onClick={onOpen} />

        )
      }
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader align="center">{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody  display="flex" alignItems="center" justifyContent="space-between" flexDir="column">
            <Image borderRadius="full" boxSize="150px" src={user.pic} alt={user.name} />
            <Text fontSize={{base:"28px", md:"30px"}}>Email: {user.email}</Text>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ProfileModal