import React, { useEffect, useState } from 'react'
import { db } from '../utils/firebase'
import { collection, onSnapshot } from 'firebase/firestore';
import ItemCard from "../components/ItemCard"
import Navbar from "../components/Navbar";
import Spinner from '../components/Spinner';
const Home = () => {
  const [users,setUsers]=useState([]);//Hold all the users that we have in firestore database.
  const [loading,setLoading]=useState(false);
 
  useEffect(()=>{//when our app loads we display all the users that we have in firestore.
    setLoading(true);
    //onSnapshot helps to bring the firestore.
    const unsub= onSnapshot(collection(db,"users"),(snapShot)=>{
      let list=[];
      //run forEach on each document
      snapShot.docs.forEach((doc)=>{
        //we push id because id is not present in firestore.
        list.push({id: doc.id,...doc.data()})
      })
      setUsers(list);
      setLoading(false);
    },(error)=>{
      console.log(error)
    })
    return ()=>{
      unsub();
    }
  },[])
  if(loading){
    return <Spinner/>
  }
  return (
    <div>

      <Navbar/>
      {users.map((item)=><ItemCard key={item.id} item={item} users={users} setUsers={setUsers}/>)}
    </div>
  )
}

export default Home
