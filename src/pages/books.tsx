import BookCard from "@/components/custom/bookCard"
import { API_URL, IMAGE_URL } from "@/utils/server"
import { Input } from "antd"
import axios from "axios"
import { useEffect, useState } from "react"
import { toast } from "sonner"


export interface BookProps {
    _id: string;
    title: string;
    author: string;
    description: string;
    reviews: [
        {
            name?: string,
            message?: string;
            rating?: string
        }
    ];
    category: string;
    coverUrl: string;
    format: string;
    file: {
        fileUrl:string
    };
    isbn: string;
    publishDate: string;
    pages: string;
    language: string;
    publisher: string;
    tableOfContents: string
    rating: string;
    ratingCount: string;
    isActive: string;
    tags: Array<string>;
}


export const EbookPage = () => {

    const [books, setBooks] = useState<BookProps[]>()
    const [loading, setLoading] = useState(false)

    const [searchValue, setSearchValue] = useState("")

    const fetchAllEbooks = async () => {
        setLoading(true)
        try {
            const { data } = await axios.get(`${API_URL}/all/ebook`)
            setBooks(data.message)
            setLoading(false)
            // eslint-disable-next-line
        } catch (error: any) {
            toast.error(error.response.data.message ?? "Client side error")
            setLoading(false)
        }
    }


    const sortBookByCategories = async(category: string)=>{
        try {
            const {data} = await axios.get(`${API_URL}/category/book?category=${category}`)
            if(data.message.length > 0){
                setBooks(data.message)
            }else{
                fetchAllEbooks()
            }
            // eslint-disable-next-line
        } catch (error: any) {
            fetchAllEbooks()
            toast.error(error.response.data.message)
        }
    }

// eslint-disable-next-line
    const searchBooks = async(e: any)=>{
        e.preventDefault()
        try {
            const {data} = await axios.get(`${API_URL}/search/book?search=${searchValue}`)
            if(data.message.length > 0){
                setBooks(data.message)
            }else{
                fetchAllEbooks()
            }
            // eslint-disable-next-line
        } catch (error: any) {
            fetchAllEbooks()
            toast.error(error.response.data.message)
        }
    }

    useEffect(()=>{
        fetchAllEbooks()
    },[])

    return (

        <>
            <section className="flex min-h-screen">

                <aside className="w-[250px] border-r-[1px] min-h-screen pt-[100px] px-5 shadow md:flex md:flex-col hidden">
                    <h1 className="text-blue-600 font-bold">Filter by: <span className="text-black">Categories</span> </h1>
                    <div className="flex flex-col mt-5 items-start gap-3">
                        <button className="cursor-pointer" onClick={()=>sortBookByCategories("drama")}>Drama</button>
                        <button className="cursor-pointer" onClick={()=>sortBookByCategories("dystopian")}>Dystopian</button>
                        <button className="cursor-pointer" onClick={()=>sortBookByCategories("action")}>Action</button>
                        <button className="cursor-pointer" onClick={()=>sortBookByCategories("Fiction")}>Fiction</button>
                    </div>
                    {/* <h1 className="text-blue-600 font-bold mt-5">Filter by: <span className="text-black">Arrival</span> </h1>
                    <div className="flex flex-col mt-5 items-start gap-3">
                        <button className="cursor-pointer">Newest</button>
                        <button className="cursor-pointer">Most Rated</button>
                        <button className="cursor-pointer">Most Popular</button>
                        <button className="cursor-pointer">Oldest</button>
                    </div> */}
                </aside>


                <main className="flex-1 pt-[100px] p-5 h-screen overflow-y-scroll">
                    <h1 className="text-2xl font-bold">Books:</h1>
                    {/*SEARCH FORM  */}
                    <form className="flex gap-2 my-5" onSubmit={searchBooks}>
                        <Input type="search" placeholder="Search books" onChange={(e)=>setSearchValue(e.target.value)}/>
                        <button type="submit" className="bg-blue-600 text-white rounded-md py-2 px-4 cursor-pointer">search</button>
                    </form>

                   { loading ? 
                   
                   <div className="flex justify-center items-center min-h-[50vh]">

                        <h1 className="text-xl">Loading...</h1>

                   </div>

                   :
                   
                   <div className="flex gap-5 flex-wrap">
                            {
                                books?.map((book, i)=>(
                                    <div key={i}>
                                        <BookCard 
                                            title={book.title} 
                                            src={`${IMAGE_URL}/${book.coverUrl}`} 
                                            // eslint-disable-next-line
                                            rating={book.rating as any}
                                            _id={book._id}
                                        />
                                    </div>
                                ))
                            }
                        {/* <BookCard title="Alice's Adventures in Wonderland. Lewis Carroll." src="/assets/cover6.jpeg" />
                        <BookCard title="The Adventures of Huckleberry Finn. Mark Twain." src="/assets/cover2.jpg" />
                        <BookCard title="The Adventures of Tom Sawyer. Mark Twain." src="/assets/cover3.jpeg" />
                        <BookCard title="Treasure Island. Robert Louis Stevenson." src="/assets/cover4.jpg" /> */}
                    </div>
}
                </main>
            </section>
        </>

    )
}
