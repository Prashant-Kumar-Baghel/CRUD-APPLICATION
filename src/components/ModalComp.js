import React from 'react'
import { Button, Header, Image, Modal, ModalActions, ModalContent, ModalDescription, ModalHeader } from 'semantic-ui-react'


const ModalComp = ({open,setOpen,img,name,info,email,contact,id,handleDelete}) => {
  return (
    <div>
        <Modal
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
       
        >
        <ModalHeader>User Details</ModalHeader>
        <ModalContent image>
            <Image size='medium' src={img} wrapped />
            <ModalDescription>
            <Header>{name}</Header>
            <p> {email}</p>
            <p>{contact}</p> 
                <p>{info}</p>
            
           
            </ModalDescription>
        </ModalContent>
        <ModalActions>
            <Button color='black' onClick={() => setOpen(false)}>
            cancel
            </Button>

            <Button
            content="Delete"
            labelPosition='right'
            icon='checkmark'
            onClick={()=>handleDelete(id)}
            positive
            />
        </ModalActions>
        </Modal> 
    </div>
  )
}

export default ModalComp
