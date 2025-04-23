import { useEffect } from "react"


// eslint-disable-next-line
export const currentUser = localStorage.getItem("token") as any

export const GetCurrentUser = ()=>{

    const fetchCurrentUser = ()=>{
        if(currentUser){
            return currentUser
        }else{
            return
        }
    }


    useEffect(()=>{
        fetchCurrentUser()
    },[])


}