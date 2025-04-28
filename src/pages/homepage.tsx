import BookCard from "@/components/custom/bookCard"
import { Button } from "antd"
import { useEffect, useState } from "react"
import { toast } from "sonner"
import { BookProps } from "./books"
import axios from "axios"
import { API_URL, IMAGE_URL } from "@/utils/server"


const Homepage = () => {


  const [audios, setAudios] = useState<BookProps[]>()
  const [ebooks, setEbooks] = useState<BookProps[]>()
  const [random, setRandom] = useState<BookProps[]>()

  const fetchAudioBooks = async()=>{

    try {
        const {data} = await axios.get(`${API_URL}/limited/audiobooks`)
        setAudios(data.message)
      // eslint-disable-next-line
    } catch (error: any) {
      toast.error(error.response.data.message ?? " Something went wrong")
    }
  }

  const fetchEbooks = async()=>{

    try {
        const {data} = await axios.get(`${API_URL}/limited/books`)
        setEbooks(data.message)
      // eslint-disable-next-line
    } catch (error: any) {
      toast.error(error.response.data.message ?? " Something went wrong")
    }
  }



  const fectchRandomBooks = async()=>{

    try {
        const {data} = await axios.get(`${API_URL}/random/books`)
        setRandom(data.message)
      // eslint-disable-next-line
    } catch (error: any) {
      toast.error(error.response.data.message ?? " Something went wrong")
    }
  }


  useEffect(()=>{
    fetchEbooks()
    fetchAudioBooks()
    fectchRandomBooks()
  },[])


  return (
    <>
      <section className="min-h-[90vh] pt-[100px] flex justify-around items-center flex-wrap bg-black p-5">
        <div className="md:w-[500px]">
          <h1 className="md:text-6xl font-bold text-white md:text-left text-center text-4xl">Books are the training weight <span className="font-normal text-blue-600"> of the mind.</span></h1>
          <div className="flex items-center gap-4 mt-4 md:justify-start justify-center">
            <Button style={{backgroundColor: "blue", color: "white", border: "none"}}>Ebooks</Button>
            <Button style={{backgroundColor: "orange", color: "white", border: "none"}}>Audiobooks</Button>
          </div>
        </div>
        <div>
          <img src="/assets/heroImg22.png" alt="" className="md:w-[600px]"/>
        </div>
      </section>

      <section className="my-10 px-5">

        <h1 className="text-2xl font-bold text-slate-600 mb-5">New Arrival</h1>
        <hr />
        <div className="flex justify-center gap-5 flex-wrap mt-5">
          {
            random&&random.length > 0 ? random?.map((rand, i)=>(
              <BookCard 
                  key={i}
                  title={rand.title}
                  src={`${IMAGE_URL}/${rand.coverUrl}`}
                  // eslint-disable-next-line
                  rating={rand.rating as any}
                  _id={rand._id}
              />
            ))

            :

            <div className="">
                <h1 className="text-2xl text-slate-400">No latest book found</h1>
            </div>
          }
        </div>
      </section>

      <section className="my-10 px-5">

        <h1 className="text-2xl font-bold text-slate-600 mb-5">Latest Ebooks</h1>
        <hr />
        <div className="flex justify-center gap-5 flex-wrap mt-5">
          {
            ebooks&&ebooks.length > 0 ? ebooks?.map((ebook, i)=>(
              <BookCard 
                  key={i}
                  title={ebook.title}
                  src={`${IMAGE_URL}/${ebook.coverUrl}`}
                  // eslint-disable-next-line
                  rating={ebook.rating as any}
                  _id={ebook._id}
              />
            ))

            :

            <div className="">
                <h1 className="text-2xl text-slate-400">No latest book found</h1>
            </div>
          }
        </div>
      </section>

      <section className="my-10 px-5">

        <h1 className="text-2xl font-bold text-slate-600 mb-5">Latest Audiobooks</h1>
        <hr />
        <div className="flex justify-center gap-5 flex-wrap mt-5">
          {
            audios&&audios.length > 0 ? audios?.map((audio, i)=>(
              <BookCard 
                  key={i}
                  title={audio.title}
                  src={`${IMAGE_URL}/${audio.coverUrl}`}
                  // eslint-disable-next-line
                  rating={audio.rating as any}
                  _id={audio._id}
              />
            ))

            :

            <div className="">
                <h1 className="text-2xl text-slate-400">No latest book found</h1>
            </div>
          }
        </div>
      </section>

        <hr />

      <section className="min-h-screen flex justify-center items-center flex-wrap-reverse gap-10 p-5">
          <img src="/assets/schoollogo.jpg" alt="" className="md:w-[300px] w-[200px]"/>
          <div className="md:w-[500px] w-[100%]">
            <h1 className="text-3xl font-bold">About this <span className="text-blue-600">Project</span> </h1>
            <p className="text-justify mb-5">Our Library Management System is an innovative digital library management solution designed to bridge traditional book lending with modern technology enhancements by incorporating audiobook support using the MERN Stack framework. The system offers a highly interactive and personalized experience for readers and administrators alike.
            </p>
            <p className="text-justify">This project aims to make libraries more accessible, efficient, and future-ready, catering to the evolving needs of users who seek both reading and listening options in a single unified platform.</p>
          </div>
      </section>

    </>
  )
}

export default Homepage