import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { toast } from "sonner"
import { BookProps } from "./books"
import axios from "axios"
import { API_URL, IMAGE_URL } from "@/utils/server"
import { Badge, Button, Input, Rate } from "antd"
import { currentUser } from "@/utils/user"
import { IoIosHeart } from "react-icons/io";
import { TbPlayerPlayFilled } from "react-icons/tb";
import moment from "moment"
import { AudioPlayer } from "react-wave-audio-player";


const ViewPage = () => {

    

    const {id} = useParams()
    // const navigate = useNavigate()

    const [book, setBook] = useState<BookProps>()
    const [rating, setRating] = useState(0)
    const [message, setMessage] = useState("")
    const [token, setToken] = useState("")
    const [play, setPlay] = useState(false)

    // eslint-disable-next-line
    const addNewReview = async(e:any)=>{
        e.preventDefault()
        try {
            if(rating <= 0 || !message){
                toast.error("Empty field (s)")
            }else{
                const {data: name} = await axios.get(`${API_URL}/get/user`, {
                    headers: {
                        "Authorization": `Bearer ${currentUser}`
                    }
                } )

                console.log(name.message.fullname)
                const {data} = await axios.patch(`${API_URL}/review/${id}`,{rating, message, name: name.message.fullname},{
                    headers: {
                        "Authorization": `Bearer ${currentUser}`
                    }
                })
                toast.success(data.message)
            }

            // eslint-disable-next-line
        } catch (error: any) {
            toast.error(error.response.data.message ?? "Client side error")
        }
    }


    const getUser = () => {
        const currentUser = localStorage.getItem("token")
        if (currentUser) {
          setToken(currentUser)
        } else {
          setToken("")
        }
      }
    
    const fetchSingleBook = async()=>{
        try {
            const {data} = await axios.get(`${API_URL}/book/${id}`)
            setBook(data.message)
            // eslint-disable-next-line
        } catch (error: any) {
            toast.error(error.response.data.message ?? "Client side error")
        }
    }

    // eslint-disable-next-line
    const addToFavourite = async()=>{
        try {
            const {data} = await axios.patch(`${API_URL}/favourite`, {bookID:id, image_url: book?.coverUrl, title:book?.title},{
                headers: {
                    "Authorization": `Bearer ${currentUser}`
                }
            })
            toast.success(data.message)
            fetchSingleBook()
            // eslint-disable-next-line
        } catch (error: any) {
            toast.error(error.response.data.message ?? "Client side error")
        }
    }

    // const readBook = (url: string)=>{
    //     navigate(`/${IMAGE_URL}/${url}`)
    // }

    useEffect(()=>{
        fetchSingleBook()
        getUser()
    },[])

  return (
    <>
    <section className="min-h-screen flex pt-[100px] justify-center p-10 md:w-[90%] w-[100%] md:mx-[auto] gap-20 flex-wrap">

        <img src={`${IMAGE_URL}/${book?.coverUrl}`} alt="" className="md:w-[300px] w-[100%]"/>

        <div className="md:flex-1 w-[100%]">

            <div className="flex flex-col gap-2">

                <h1 className="text-xl font-bold">{book?.title}</h1>

                <small>By: {book?.author} published: {moment(book?.publishDate).format("DD-MM-YYYY")} </small>

                    <div className="flex gap-2 flex-wrap">
                        <Badge count={book?.format} />
                    </div>
           
                <Rate 
                    count={5} 
                    allowHalf={true} 
                    // eslint-disable-next-line
                    value={book?.rating as any}
                />

                <p>{book?.description}</p>

                <ul className="flex flex-col gap-2">
                    <li>ISBN: {book?.isbn}</li>
                    <li>Publisher: {book?.publisher}</li>
                    <li>Pages: {book?.pages}</li>
                    <li>Langauge: {book?.language}</li>
                </ul>

                <div className="flex gap-2 items-center">
                    {
                        book?.format === "Ebook" ? 
                        <Link to={`${IMAGE_URL}/${book?.file.fileUrl}`} className="bg-blue-600 text-white rounded-md py-1 px-4">Read Book</Link>
                        :
                        <>
                            <Button onClick={()=>setPlay(!play)} style={{backgroundColor:"blue", border:"none", color:"white"}}>
                            <TbPlayerPlayFilled/>
                               {play ? "stop playing book" : "Play book"}
                            </Button>
                        </>
                    }
                                        

                 {token ?    
                    <Button onClick={addToFavourite} style={{backgroundColor:"orange", border:"none", color:"white"}}>
                        <IoIosHeart/>
                        Add to Favourite
                    </Button>
                    :
                    null
                   
                }
                </div>
            </div>
        </div>
    </section>

    <hr />

    <section className="min-h-[70vh] md:w-[90%] md:mx-[auto] my-10 px-5">

        <h1 className="text-2xl">{book?.reviews.length} Reviews:</h1>

        <div className="flex mt-5 gap-5 flex-wrap-reverse ">

            <div className="flex flex-col gap-2 md:flex-1 w-[100%]">

             {
     
             book?.reviews&&book?.reviews.map((review, i)=>(
                 <div className="flex flex-col gap-1 bg-slate-50 p-3 rounded-md shadow" key={i}>
                    <Rate 
                        count={5} 
                        // eslint-disable-next-line
                        value={review.rating as any}/>
                    <h1 className="text-xl font-bold">{review.name}</h1>
                    <p>{review.message}</p>
                </div>

             ))   
               
                }
                
            </div>  

            <div className="md:flex-1 w-[100%]">
                <form action="" onSubmit={addNewReview}>
                    <div className="my-3">
                        <h1 className="font-bold">Write a Review</h1>
                    </div>
                    <div className="my-3">
                        <Rate count={5} value={rating} onChange={(value)=>setRating(value)}/>
                    </div>
                    <div className="my-3">
                        <Input.TextArea
                            placeholder="Write a Review about this book" 
                            style={{height: 200}} 
                            onChange={(e)=>{
                                setMessage(e.target.value)
                            }}
                            />
                    </div>

                    <div className="my-3">
                        <Input type="submit" value="Post Review" className="cursor-pointer" style={{background: "blue", color: "white", border:"none"}}/>
                    </div>

                </form>
            </div>
        </div>
    </section>
    {
        play ?
        <div className="fixed bottom-0 left-0 w-[100%] p-5 bg-white">
            <AudioPlayer src={`${IMAGE_URL}/${book?.file.fileUrl}`} onPlay={()=>setPlay(true)} /> 
        </div>
         : null
    }
    </>
  )
}

export default ViewPage