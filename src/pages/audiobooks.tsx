import BookCard from '@/components/custom/bookCard'
import { Input } from 'antd'


const AudioBooks = () => {
  return (
    <>
    <section className="flex min-h-screen">
        <aside className="w-[250px] border-r-[1px] min-h-screen pt-[100px] px-5 shadow md:flex md:flex-col hidden">
            <h1 className="text-blue-600 font-bold">Filter by: <span className="text-black">Categories</span> </h1>
            <div className="flex flex-col mt-5 items-start gap-3">
                <button className="cursor-pointer">Drama</button>
                <button className="cursor-pointer">Dystopian</button>
                <button className="cursor-pointer">Action</button>
                <button className="cursor-pointer">Fiction</button>
            </div>
            <h1 className="text-blue-600 font-bold mt-5">Filter by: <span className="text-black">Arrival</span> </h1>
            <div className="flex flex-col mt-5 items-start gap-3">
                <button className="cursor-pointer">Newest</button>
                <button className="cursor-pointer">Most Rated</button>
                <button className="cursor-pointer">Most Popular</button>
                <button className="cursor-pointer">Oldest</button>
            </div>
        </aside>
        <main className="flex-1 pt-[100px] p-5 h-screen overflow-y-scroll">
            <h1 className="text-2xl font-bold">Audio Books:</h1>
            {/*SEARCH FORM  */}
            <form className="flex gap-2 my-5">
                <Input type="search" placeholder="Search books" />
                <button type="submit" className="bg-blue-600 text-white rounded-md py-2 px-4 cursor-pointer">search</button>
            </form>

            <div className="flex gap-5 flex-wrap">
                <BookCard title="Pride and Prejudice. Jane Austen." src="/assets/cover5.jpeg" />
                <BookCard title="Alice's Adventures in Wonderland. Lewis Carroll." src="/assets/cover6.jpeg" />
                <BookCard title="The Adventures of Huckleberry Finn. Mark Twain." src="/assets/cover2.jpg" />
                <BookCard title="The Adventures of Tom Sawyer. Mark Twain." src="/assets/cover3.jpeg" />
                <BookCard title="Treasure Island. Robert Louis Stevenson." src="/assets/cover4.jpg" />
            </div>
        </main>
    </section>
</>
  )
}

export default AudioBooks