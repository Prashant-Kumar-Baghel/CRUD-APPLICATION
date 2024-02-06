import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Container, Grid, GridColumn, GridRow } from 'semantic-ui-react'
import ModalComp from './ModalComp';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../utils/firebase';


const ItemCard = (props,{users,setUsers}) => {
    const {name,email,info,contact,img,id}=props.item;
    const [open,setOpen]=useState(false);
    const [user,setUser]=useState({})
    const navigate=useNavigate();

    const handleModal=()=>{
      setOpen(true)
      setUser(props.item);
    }
    const handleDelete= async (id)=>{
      if(window.confirm("Are you sure to delete that user ?")){
        try{
          setOpen(false)
          await deleteDoc(doc(db,"users",id));
          setUsers(users.filter((user)=>user.id!==id))
        }catch(err){
          console.log(err)
        }
      }
    }
  return (
    <>
    <Container>
       <Grid columns={3} divided>
            <GridRow>
                
                    <div className='flex gap-16 mt-7 border-solid border-[2px] border-black p-5'>
                        <div>
                        <img src={img} className="h-[35vh]" alt="" />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h2>{name}</h2>
                            <span>{email}</span>
                            <span>{contact}</span>
                            <p>{info}</p>
                            <Button color='green' onClick={()=>{
                                navigate(`/update/${id}`)
                            }}>UPDATE</Button>
                            <Button color='purple' onClick={handleModal}>View</Button>
                            {open && <ModalComp open={open}
                            setOpen={setOpen}
                            handleDelete={handleDelete}
                            {...user}
                            />}
                        </div>

                    </div>
                
            </GridRow>
       </Grid>
    </Container>
    </>
  )
}

export default ItemCard
