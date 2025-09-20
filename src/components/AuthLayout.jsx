import React, {useEffect, useState} from 'react'
import { useNavigate} from 'react-router-dom'
import { useSelector } from "react-redux";

const Protected = ({children, authentication = true}) => {

  const navigate = useNavigate()
  const [loader, setLoader] = useState(true);
  const authStatus = useSelector(state => state.status)

  useEffect(() => {
    //easier way-
    // if(authStatus === true) {
    //   navigate("/")
    // } else if(authStatus !== true) {
    //   navigate("/login")
    // }

    // let authValue = authStatus === true ? true : false


    if(authentication && authStatus !== authentication) {
      navigate("/login")

    } else if(!authentication && authStatus !== authentication) {
      navigate("/")
    }
    setLoader(false)
  }, [authStatus, navigate, authentication])

  return loader ? <h1>Loading...</h1> : <>{children}</>    
}

export default Protected;