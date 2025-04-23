import { Link, useNavigate } from "react-router-dom"
import {toast} from "sonner"
import axios from "axios"
import { API_URL } from "@/utils/server"
import { useEffect, useState } from "react"
import { currentUser } from "@/utils/user"


interface LoginUserProps{
    email: string;
    password: string;
}


// interface ErrorResponseProps{
//     response:{

//     }
// }


const LoginPage = () => {

    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState<LoginUserProps>({
        email: "",
        password: ""
    })

    const getUser = ()=>{
        if(currentUser){
            return navigate("/")
        }else{
            return
        }
    }
    
// eslint-disable-next-line
const handleChange = (e: any)=>{
    setUser({...user, [e.target.name]: e.target.value})
}

// eslint-disable-next-line
    const loginUser = async(e: any)=>{
        e.preventDefault()
        setLoading(true)
        try {
            
            const {data} = await axios.post(`${API_URL}/get/user`, {...user})
            localStorage.setItem("token", data.token)
            toast.success("Login Successful")
            setTimeout(()=>{
                setLoading(false)
                navigate("/")
            }, 2000)
            // eslint-disable-next-line
        } catch (error: any) {
            setLoading(false)
            toast.error(error.response.data.message ?? "Client side error")
        }
    }

    
    useEffect(()=>{
        getUser()
    },[])

  return (
    <div className="flex justify-center items-center flex-wrap min-h-screen">

        <form action="" className="my-10px bg-white shadow p-5 h-[max-content] rounded-xl" onSubmit={loginUser}>

            <div className="flex flex-col gap-1">
                <h1 className="text-xl font-bold text-blue-600">Welcome Back</h1>
                <small>Take it back where you left it.</small>
            </div>
           
            <div className="flex flex-col gap-1 my-2">
                <label htmlFor="">Email</label>
                <input type="email" className="border-[0.5px] outline-none border-slate-400 w-[300px] h-[40px] px-2 rounded-md" placeholder="Email" name="email" onChange={handleChange}/>
            </div>
            <div className="flex flex-col gap-1 my-2">
                <label htmlFor="">Password</label>
                <input type="password" className="border-[0.5px] outline-none border-slate-400 w-[300px] h-[40px] px-2 rounded-md" placeholder="Password" name="password" onChange={handleChange}/>
            </div>
            
            <div className="flex flex-col gap-1 my-2">
                <input type="submit" className="outline-none bg-blue-600 text-white border-none w-[max-content] h-[40px] px-5 rounded-md cursor-pointer" value={loading ? "please waiting..." :"Sign in"} disabled={loading}/>
            </div>
            <div className="flex flex-col gap-1 mt-4 text-right">
               <small>Don't have an Account ? <Link to={"/signup"} className="text-blue-600 font-bold">Sign Up</Link></small>
            </div>

        </form>

    </div>
  )
}

export default LoginPage