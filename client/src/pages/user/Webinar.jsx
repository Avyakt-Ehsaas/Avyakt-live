import React from 'react'
import { useState,useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import API from '../../utils/api'
import toast from 'react-hot-toast'

const Webinar = () => {
  const {user} = useAuth();

  const [webinar,setWebinar] = useState([]);


  const fetchWebinars = async () => {
    try {
        const res = await API.get("/webinars/all-webinars")
        console.log(res)
        setWebinar(res.data);
        toast.success("webinar fetched successfully")
    } catch (error) {
        console.log(error);
        toast.error("Failed to fetch webinars")
    }
  }

  useEffect(() => {
    if(user)
    fetchWebinars();
  },[user])

  console.log(webinar);
  
  return (
    <div>Webinar</div>
  )
}

export default Webinar