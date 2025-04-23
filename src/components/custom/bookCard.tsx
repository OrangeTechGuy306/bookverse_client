import { TextTrim } from "@/utils/text_trim"
import { Badge, Rate } from "antd"
import { Link } from "react-router-dom"


interface BookCardProps{
    src?: string;
    title: string;
    categories?: Array<string>;
    _id?: string;
    rating?: number;
}



const BookCard = ({src, title, categories, _id, rating}: BookCardProps) => {
    return (
        <div className="md:w-[230px] w-[200px] overflow-hidden rounded-md border">
            <div className="w-[100%] md:h-[250px] h-[200px] flex justify-center items-center overflow-hidden">
                <img src={src} alt="" className="w-[100%]"/>
            </div>
            <div className="p-3 flex flex-col gap-3" >
                <h1 className=" md:text-md font-bold text-sm">{TextTrim(title)}</h1>
                <div className="flex gap-2">
                    <Badge count={categories} />
                    {/* <Badge count="dystopian" color="blue"/> */}
                </div>
                <Rate count={5} value={rating} />
                <Link to={`/view/${_id}`} className="border border-blue-600 rounded-md py-1 px-4 w-[max-content] text-blue-600 md:text-md text-sm">View Book Detail</Link>
            </div>
        </div>
    )
}

export default BookCard