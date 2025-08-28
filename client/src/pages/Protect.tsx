import { useSelector } from "react-redux"
import type { RootState } from "../store"
import { useNavigate } from "react-router";
import { useEffect } from "react";

interface Props {
    children : React.ReactNode
}
const Protect = ({children}: Props) => {
    const userinfo = useSelector((state: RootState)=> state.auth.userInfo);
    const navigate = useNavigate();

    useEffect(()=> {
        if(!userinfo){
            navigate("/");
        }
    },[userinfo])
  return (
    <>{children}</>
  )
}

export default Protect