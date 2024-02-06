import React, { useEffect, useState } from 'react'
// import {Button,Form,Grid,Loader} from "semantic-ui-css";
import { storage, db } from '../utils/firebase';
import {  GridColumn, GridRow,Button,Grid,Loader } from 'semantic-ui-react';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { useNavigate, useParams, useSubmit } from 'react-router-dom';
import { addDoc, collection, doc, getDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
const initialState={
  name:"",
  email:"",
  info:"",
  contact:""
}

const AddEditUser = () => {
  const [data,setData]=useState(initialState);
  const [file,setFile]=useState(null);//this is file we we upload.
  const [progress,setProgress]=useState(null);//Check our file is upload or not on firebase.
  const [isSubmit,setIsSubmit]=useState(false)//check form is submit or not.
  const navigate = useNavigate();
 const {name,email,info,contact}=data;
  const {id} =useParams();

  //we run this useffect whwnever we have id.
  useEffect(()=>{
    // when we have id then only run getSingleUSer function.
    id && getSingleUSer();
  },[id]);
  const getSingleUSer= async ()=>{

    //we need document reference.
    const docRef=  doc(db,"users",id);
    const snapshot=await getDoc(docRef);
    if(snapshot.exists()){
      setData({...snapshot.data()})
    }
  }
  //Upload the image on firebase 
  useEffect(()=>{
    const uploadFile=()=>{
      //Generate Unique file name
      const name= new Date().getTime()+file.name;
      //Find Storage reference .
      const storageRef=ref(storage,file.name);//In Firebase Storage, for example, this line would create a reference to the storage location where the file with the specified name is intended to be stored or uploaded. The storageRef variable can then be used in subsequent operations, such as initiating an upload task to that specific location.
      const uploadTask= uploadBytesResumable(storageRef, file);

      uploadTask.on("state_changed", (snapShot)=>{
        //checking progress of image upload
        const progress=(snapShot.bytesTransferred / snapShot.totalBytes) * 100;
        setProgress(progress);
        //we use switch to track image upload.
        switch(snapShot.state){
          case "paused":
            console.log("upload is paused");
            break;
          case "running": 
            console.log("upload is running");
            break; 
          default:
            break;  
        }
      },(error)=>{
        //if we get any type of error while uploding the image.
        console.log(error)
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
          setData((prev)=>({...prev, img:downloadURL}))
          console.log("URL",downloadURL);
        }) 
      })
    } 
    file && uploadFile()
  },[file])
  
  // ({...data, [e.target.name]: e.target.value}): This syntax uses the spread operator (...) to create a new object. It copies all the properties from the existing data object and adds/updates a property specified by [e.target.name] with the value of e.target.value. The square brackets around e.target.name are used to dynamically set the property name based on the name attribute of the button that triggered the click event.
 const handleChange=(e)=>{
  console.log("Input Name:", e.target.name);
  console.log("Input Value:", e.target.value);
  setData({...data,[e.target.name]:e.target.value})
  console.log("Data ", data);
  console.log(e)
 }
 const handleButtonClick=async(e)=>{
  
  setIsSubmit(true);
      
      if(!id){
        //Logic to add the user information like name etc.
      //we will create collection here and users is collection name.
        try{
          await addDoc(collection(db,"users"),{
            ...data,
            timestamp: serverTimestamp()
          })
        }catch(error){
          console.log(error)
        }
      }else{
        //logic to update
        try{
          await updateDoc(doc(db,"users",id),{
            ...data,
            timestamp: serverTimestamp()
          })
        }catch(error){
          console.log(error)
        }
      }
      navigate("/");


 }

  return (
    <div>
        <Grid columns={3} centered verticalalign="middle"> 
            <GridRow>
              <GridColumn>
                <div className='mt-8'>
                  {(isSubmit)?(<Loader/>):(
                    <>
                    {id?(<h2>Update User</h2>):(<h2>Add User</h2>)}
                    <form action="" className='flex flex-col gap-4 ' onSubmit={(e)=>{
                      e.preventDefault();
                    }}>
                      <div className='flex flex-col'>
                        <label htmlFor="name">Name</label>
                        <input type="text" className='p-2 outline-none border-black border-[2px] border-solid' placeholder='Name'  onChange={handleChange} required id='name' name='name' value={name}/>
                      </div>
                      <div className='flex flex-col'>
                        <label htmlFor="email">Email</label>
                        <input type="email" placeholder='email' className='p-2 outline-none border-black border-[2px] border-solid' required  onChange={handleChange} id='email' name='email' value={email}/>
                      </div>
                      <div className='flex flex-col'>
                        <label htmlFor="mobile">Mobile</label>
                        <input type="tel" placeholder='Phone No' className='p-2 outline-none border-black border-[2px] border-solid' required  onChange={handleChange} id='mobile' name='contact' value={contact}/>
                      </div>
                      
                      <div className='flex flex-col'>
                      <label for="story">Info</label>
                      <textarea id="story" name="info" rows="5" cols="33" className='p-2 outline-none border-black border-[2px] border-solid'  onChange={handleChange} value={info}>
                      Tell Something About YourSelf.
                      </textarea>
                      </div>
                      <div className='flex flex-col'>
                        <label htmlFor="file">File Upload</label>
                        {/* To Upload files we use input with type file.  */}
                        <input 
                        type="file" 
                        className='p-2 outline-none border-black border-[2px] border-solid' 
                        onChange={(e)=>{
                          // we have image file details at 1st index hence we write e.target.files[0]
                          //file is an object which has name and image other properties related to image.
                          setFile(e.target.files[0])
                          
                        }} />
                      </div>
                      {/* button is disable if image upload process is in progress. */}
                      <Button primary onClick={handleButtonClick} type='submit' disabled={progress!==null && progress<100}>{id?"Update":"Submit"}</Button>
                    </form>
                    </>
                  )}
                </div>
              </GridColumn>
            </GridRow>

        
        </Grid>
    </div>
  )
}

export default AddEditUser
