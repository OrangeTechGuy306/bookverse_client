import { TextTrim } from "@/utils/text_trim"
import { currentUser } from "@/utils/user"
import { Avatar, Button, Input, Modal, Rate } from "antd"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ValueProps } from "./signup"
import axios from "axios"
import { API_URL, IMAGE_URL } from "@/utils/server"
import { toast } from "sonner"



const ProfilePage = () => {

    const [preview, setPreview] = useState()
    const [profileModal, setProfileModal] = useState(false)
    const [passwordModal, setPasswordModal] = useState(false)
    const [user, setUser] = useState<ValueProps>()
    const navigate = useNavigate()

    const [password, setPassword] = useState({
        oldPassword: "",
        newPassword: "",
        confirm_new_password: ""
    })

    // eslint-disable-next-line
    const handlePasswordChange = (e: any)=>{
        setPassword({...password, [e.target.name]: e.target.value})
    }
   
    // eslint-disable-next-line
    const updatePassword = async(e: any)=>{
        e.preventDefault()
        try {
            
            if(password.newPassword !== password.confirm_new_password){
                    toast.error("Password do not match")
            }else{
                const {data} = await axios.patch(`${API_URL}/auth/user`, {...password}, {
                    headers: {
                        "Authorization" : `Bearer ${currentUser}`
                    }
                })
                toast.success(data.message)
            }

            // eslint-disable-next-line
        } catch (error: any) {
            // console.log(error.response.data.message)
            toast.error(error.response.data.message ?? "Client side Error")
        }
    }
    
    const fetchUser= async()=>{
        if(currentUser){
            const {data} = await axios.get(`${API_URL}/get/user`, {
                headers: {
                    "Authorization" : `Bearer ${currentUser}`
                }
            })
            setUser({
                fullname: data.message.fullname,
                email: data.message.email,
                username: data.message.username,
                profileImage: data.message.profileImage,
                favourite: data.message.favourite,
            })
        }else{
            navigate("/")
        }
    }

    // eslint-disable-next-line
    const updateUserProfile = async(e: any)=>{
        e.preventDefault()
        try {
            if(currentUser){
              const {data} =  await axios.patch(`${API_URL}/user`,{...user},{
                    headers:{
                        "Authorization": `Bearer ${currentUser}`
                    }
                })
                toast.success(data.message)
                fetchUser()
            }
            // eslint-disable-next-line
        } catch (error: any) {
            toast.error(error.response.data.message ?? "Client side Error")
        }
    }


    // eslint-disable-next-line
    const uploadProfileImage = async(e: any)=>{
        e.preventDefault()
        try {
            if(currentUser){
                const formData = new FormData()
                // eslint-disable-next-line
                formData.append("image", preview as any)
                const {data} =  await axios.patch(`${API_URL}/profile`, formData,{
                        headers:{
                            "Content-Type": "multipart/form-data",
                            "Authorization": `Bearer ${currentUser}`
                        }
                    })
                    toast.success(data.message)
                    fetchUser()
                    // eslint-disable-next-line
                setPreview("" as any)
               
            }
            // eslint-disable-next-line
        } catch (error: any) {
            toast.error(error.response.data.message ?? "Client side Error")
        }
    }


    const addToFavourite = async(bookID:string, image_url:string, title:string)=>{
        try {
            const {data} = await axios.patch(`${API_URL}/remove/favourite`, {bookID, image_url, title},{
                headers: {
                    "Authorization": `Bearer ${currentUser}`
                }
            })
            toast.success(data.message)
            fetchUser()
            // eslint-disable-next-line
        } catch (error: any) {
            toast.error(error.response.data.message ?? "Client side error")
        }
    }

    const logout = ()=>{
        localStorage.removeItem("token")
        navigate("/")
    }

    useEffect(()=>{
        fetchUser()
    },[])
    

  return (
    <> 
        <section className="flex items-center gap-10 pt-[100px] p-5 md:w-[80%] md:mx-[auto] flex-wrap">

            <form action="" className="flex flex-col gap-3 items-center" onSubmit={uploadProfileImage}>
                <Avatar src={preview ? URL.createObjectURL(preview) : `${IMAGE_URL}/${user?.profileImage}`}  size={100}/>
              {preview ? 
              
                <div className="flex gap-2">
                    <input type="submit" value={"Upload"} className="bg-blue-600 text-white px-5 py-1 rounded-md cursor-pointer"/> 
                    <Button onClick={()=>{
                        // eslint-disable-next-line
                        setPreview("" as any)
                    }}>
                        Cancel
                    </Button>
                </div>
              : 
                    
                <div className="flex flex-col gap-2">
                    <label htmlFor="image" className="flex flex-col gap-2 cursor-pointer w-[max-content] shadow-xl rounded-md py-1 px-2 text-sm bg-amber-500 text-white">
                        <span>Update Profile image</span>
                    </label>
                    
                    <input 
                        type="file" id="image" 
                        className="hidden" 
                        // eslint-disable-next-line
                        onChange={(e:any)=>{
                            // eslint-disable-next-line
                            setPreview(e.target.files[0] as any)
                        }} 
                    />
                </div>
                
                }

            </form>

            <div className="flex flex-col gap-5 items-start">
                <div className="flex items-center gap-10 flex-wrap ">
                    <div className="">
                        <h1 className="font-bold text-slate-600">Full Name</h1>
                        <p>{user?.fullname}</p>
                    </div>
                    <div className="">
                        <h1 className="font-bold text-slate-600">Email</h1>
                        <p>{user?.email}</p>
                    </div>
                    <div className="">
                        <h1 className="font-bold text-slate-600">Username</h1>
                        <p>{user?.username}</p>
                    </div>
                </div>
                <div className="flex items-center gap-5 flex-wrap">
                    <Button onClick={()=>setProfileModal(true)} style={{backgroundColor: "blue", color:'white'}}>Update Profile</Button>
                    <Button onClick={()=>setPasswordModal(true)} className="bg-blue-600 text-white" 
                    style={{backgroundColor: "red", color:'white'}}>
                        Change Password
                    </Button>
                    <Button onClick={logout} style={{backgroundColor: "maroon", color:'white'}}>Logout</Button>
                </div>

                {/* USER PROFILE UPDATE MODAL */}
                <Modal open={profileModal} onCancel={()=>setProfileModal(false)} footer={null}>
                    <form className="my-10" onSubmit={updateUserProfile}>
                        <div className="my-3">
                          <h1 className="text-2xl">Update User Profile</h1>
                        </div>
                        <div className="my-3">
                            <label htmlFor="">Full Name</label>
                            <Input 
                                type="text" value={user?.fullname} 
                                onChange={(e)=>{
                                    //eslint-disable-next-line
                                setUser({...user, fullname: e.target.value} as any)
                                }}
                            /> 
                        </div>
                        <div className="my-3">
                            <label htmlFor="">Username</label>
                            <Input 
                                type="text" value={user?.username} 
                                onChange={(e)=>{
                                    //eslint-disable-next-line
                                setUser({...user, username: e.target.value} as any)
                                }}
                            /> 
                        </div>
                        <div className="my-3">
                            <label htmlFor="">Email</label>
                            <Input 
                                readOnly
                                type="email" value={user?.email} 
                                onChange={(e)=>{
                                    //eslint-disable-next-line
                                setUser({...user, email: e.target.value} as any)
                                }}
                            /> 
                        </div>
                        <div className="my-3">
                            <input type="submit" value={"Save"} className="bg-blue-600 text-white px-5 py-1 rounded-md cursor-pointer"/> 
                        </div>
                    </form>
                </Modal>

                {/* USER PASSWORD UPDATE MODAL*/}
                <Modal open={passwordModal} onCancel={()=>setPasswordModal(false)} footer={null}>
                    <form onSubmit={updatePassword}>
                        <div className="my-3">
                          <h1 className="text-2xl">UpdatePassword</h1>
                        </div>
                        <div className="my-3">
                            <label htmlFor="">Old Password</label>
                            <Input 
                                type="password" 
                                onChange={handlePasswordChange}
                                name="oldPassword"
                                placeholder="Enter your Old Password"
                            /> 
                        </div>
                        <div className="my-3">
                            <label htmlFor="">New Password</label>
                            <Input 
                                type="password" 
                                onChange={handlePasswordChange}
                                name="newPassword"
                                placeholder="Enter New Password"
                            /> 
                        </div>
                        <div className="my-3">
                            <label htmlFor="">Confirm New Password</label>
                            <Input 
                                type="password" 
                                onChange={handlePasswordChange}
                                name="confirm_new_password"
                                placeholder="Confirm New Password"
                            /> 
                        </div>
                        <div className="my-3">
                            <input type="submit" value={"Update Password"} className="bg-blue-600 text-white px-5 py-1 rounded-md cursor-pointer"/> 
                        </div>
                    </form>
                </Modal>
            </div>


        </section>
        <hr />
        <section className="p-5 md:w-[80%] md:mx-[auto] border my-10">
            <h1 className="text-xl font-bold text-[grey]">My Favourite Books</h1>
            <div className="my-5 flex justify-center gap-5 items-center flex-wrap">

          {  user?.favourite&&user.favourite.length > 0 ?
          user.favourite.map((fav, i)=>(
                <div className="w-[250px] overflow-hidden rounded-md border" key={i}>
                    <div className="w-[100%] h-[250px] flex justify-center items-center overflow-hidden">
                        <img src={fav.image_url} alt="" />
                    </div>
                    <div className="p-3 flex flex-col gap-3" >
                        <h1 className=" font-bold">{TextTrim(fav.title)}</h1>
                        <Rate count={5} value={3} />
                        <div className="mt-3 flex items-center gap-3">
                            <Link to={`/view/${fav.bookID}`} className="border border-blue-600 rounded-md py-1 px-4 w-[max-content] text-white bg-blue-600 ">View</Link>
                            <Button  
                                style={{backgroundColor: "red", color:"white", border:"none"}} 
                                onClick={()=>addToFavourite(fav.bookID, fav.image_url, fav.title)}>
                                    Remove
                            </Button>
                        </div>
                    </div>
                </div>

          ))
                :
                <div>
                    <h1 className="text-2xl text-slate-500">You Don't have a Favourite book yet</h1>
                </div>
            }
             
            </div>
        </section>
    </>
  )
}

export default ProfilePage