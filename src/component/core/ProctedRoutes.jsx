import {  useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useNavigate } from 'react-router'
import { useLocation } from 'react-router';
import { toast } from 'react-toastify'

const ProctedRoutes = ({children}) => {
    const navigate=useNavigate();
    const token=useSelector((state)=>state.auth.token);
    let location=useLocation();
    var currentpath=location.pathname;
    // console.log("this is current path",currentpath)
    useEffect(() => {
        if (token === null) {
            navigate("/login");
            // toast.success("you have to login..")
            // console.log("this is current path",currentpath)
            if(currentpath==="/login" || currentpath==="/signup" || currentpath==="/verify-email"){
                navigate(currentpath)
            }
        }
        else{
           
            if(currentpath==="/login" || currentpath==="/signup" || currentpath==="/verify-email"){
                // const result=currentpath==="/login"
                // console.log("new result",result,typeof result)
                navigate("/")
                
            }else {navigate(currentpath)}
           
        }
    }, [token,navigate,currentpath]);
    
  if(token !==null)  return children;
  }
export default ProctedRoutes;

