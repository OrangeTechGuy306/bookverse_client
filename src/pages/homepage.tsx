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
            random&&random.length > 0 ? audios?.map((rand, i)=>(
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
          <img src="/assets/aboutimg.png" alt="" className="md:w-[500px]"/>
          <div className="md:flex-1 w-[100%ss]">
            <h1 className="text-3xl font-bold">About this <span className="text-blue-600">Project</span> </h1>
            <p className="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem culpa, harum cumque laudantium fugiat inventore vitae sequi doloribus dolore aliquid, minus maxime aliquam, sed mollitia consectetur itaque natus corporis nobis iste eum ipsa dolores eaque unde. Consectetur, magnam nisi. Illum explicabo qui aliquam voluptates nobis tenetur dolores officiis veniam. Totam magni suscipit nisi error sunt quas similique vitae ratione praesentium sequi? Perspiciatis totam id labore sint quidem laudantium dolore fuga numquam ipsam, laborum, dicta inventore assumenda magnam! Vitae pariatur vero placeat eligendi illo, debitis voluptas, ipsa at sed quae maxime nobis? Illo, vitae asperiores. Animi ipsa fugit enim rem atque odio maxime. Ducimus nam deserunt aliquam fugiat facilis obcaecati, accusantium dicta enim explicabo facere at maxime libero provident neque blanditiis inventore, dolore excepturi ut architecto recusandae veniam nemo veritatis! Hic, aliquid vero debitis commodi eius ipsa esse voluptas nulla ea ratione, fuga iusto impedit. Accusantium illo voluptates quae corporis expedita. Dolor nesciunt molestiae, facere numquam illo vero aspernatur incidunt ullam, minus magnam nulla inventore laudantium nobis molestias non voluptatibus rem debitis iusto nisi eum illum repudiandae ipsam deserunt? Quia pariatur, optio, reiciendis necessitatibus eaque, officia voluptas nesciunt quibusdam quisquam esse aut exercitationem deserunt et aliquid velit eos sapiente eligendi laborum.</p>
          </div>
      </section>

    </>
  )
}

export default Homepage