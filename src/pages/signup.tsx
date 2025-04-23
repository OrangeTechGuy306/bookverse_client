import { API_URL } from "@/utils/server"
import { currentUser } from "@/utils/user"
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "sonner"


export interface ValueProps {
    fullname: string,
    email: string,
    username: string,
    password?: string,
    confirm_password?: string;
    profileImage?: string;
    favourite?: [
        {
            title: string;
            image_url: string;
            bookID: string
        }
    ]
}

const SignUpPage = () => {


    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [values, setValues] = useState<ValueProps>({
        fullname: "",
        email: "",
        username: "",
        password: "",
        confirm_password: ""
    })


    // eslint-disable-next-line
    const handleChange=(e: any)=>{
        setValues({...values, [e.target.name]: e.target.value})
    }
    
    
    // eslint-disable-next-line
    const registerUser = async(e:any)=>{
        e.preventDefault()
        setLoading(true)
        try {
            if(values.password !== values.confirm_password){
                toast.error("Password do not match")
            }else{
                const {data} = await axios.post(`${API_URL}/user`, {...values})
                toast.success(data.message)
                setTimeout(()=>{
                    setLoading(false)
                    navigate("/signin")
                },2000)
            }
             // eslint-disable-next-line
        } catch (error: any) {
            toast.error(error.response.data.message ?? "Client side error")
            setLoading(false)
        }
    }

      const getUser = ()=>{
            if(currentUser){
                return navigate("/")
            }else{
                return
            }
        }

      useEffect(()=>{
            getUser()
        },[])

    return (
        <div className="flex justify-center items-center flex-wrap min-h-screen">
            <form action="" className=" bg-white shadow p-5 h-[max-content] mt-[100px] mb-20" onSubmit={registerUser}>
                <div className="flex flex-col gap-1">
                    <h1 className="text-xl font-bold text-blue-600">Create Account</h1>
                    <small>Create an account to enjoy reading  our  audiobooks <br /> and Ebooks</small>
                </div>
                <div className="flex flex-col gap-1 my-2">
                    <label htmlFor="">Full Name</label>
                    <input type="text" className="border-[0.5px] outline-none border-slate-400 w-[300px] h-[40px] px-2 rounded-md" placeholder="Full Name" onChange={handleChange} name="fullname"/>
                </div>
                <div className="flex flex-col gap-1 my-2">
                    <label htmlFor="">Username</label>
                    <input type="text" className="border-[0.5px] outline-none border-slate-400 w-[300px] h-[40px] px-2 rounded-md" placeholder="Username" onChange={handleChange} name="username"/>
                </div>
                <div className="flex flex-col gap-1 my-2">
                    <label htmlFor="">Email</label>
                    <input type="email" className="border-[0.5px] outline-none border-slate-400 w-[300px] h-[40px] px-2 rounded-md" placeholder="Email" onChange={handleChange} name="email"/>
                </div>
                <div className="flex flex-col gap-1 my-2">
                    <label htmlFor="">Password</label>
                    <input type="password" className="border-[0.5px] outline-none border-slate-400 w-[300px] h-[40px] px-2 rounded-md" placeholder="Password" onChange={handleChange} name="password"/>
                </div>
                <div className="flex flex-col gap-1 my-2">
                    <label htmlFor="">Confirm Password</label>
                    <input type="password" className="border-[0.5px] outline-none border-slate-400 w-[300px] h-[40px] px-2 rounded-md " placeholder="Confirm Password" onChange={handleChange} name="confirm_password"/>
                </div>
                <div className="flex flex-col gap-1 my-2">
                    <input type="submit" className="outline-none bg-blue-600 text-white border-none w-[max-content] h-[40px] px-4 rounded-md cursor-pointer" value={loading ? "Please wait..." :"Create Account"} disabled={loading}/>
                </div>
            </form>
        </div>
    )
}

export default SignUpPage