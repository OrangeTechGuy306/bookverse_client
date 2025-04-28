import { Link } from "react-router-dom"
import { Avatar } from "antd"

import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react";



const Navbar = () => {

  // const [active, setActive] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false);
  const [token, setToken] = useState("")

  const getUser = () => {
    const currentUser = localStorage.getItem("token")
    if (currentUser) {
      setToken(currentUser)
    } else {
      setToken("")
    }
  }

  useEffect(() => {
    // fetchUser()
    getUser()
  }, [])

  return (
    // <nav className="flex justify-between items-center px-5 py-4 bg-white shadow fixed w-[100%] top-0 left-0 z-[9999999999]">
    //   <div>
    //     <Link to={"/"} className="font-bold text-2xl">Book<span className="text-blue-600">verse</span></Link>
    //   </div>
    //   <div className="flex items-center gap-5 flex-wrap">
    //     <Link to={"/"}>Home</Link>
    //     <Link to={"/books"}>Books</Link>
    //     <Link to={"/audiobook"}>Audiobooks</Link>
    //     <Link to={"/categories"}>Categories</Link>
    //     {token ?
    //       <Link to={"/profile"}><Avatar src={""} /></Link> :
    //       <>
    //         <Link to={"/signin"} className="bg-blue-600 text-white py-1 px-4 rounded-md shadow">Sign in</Link>
    //         <Link to={"/signup"} className="bg-red-600 text-white py-1 px-4 rounded-md shadow">Sign up</Link>
    //       </>
    //     }
    //   </div>
    // </nav>
    <nav className="bg-white shadow fixed w-full top-0 left-0 z-[9999999999]">
      <div className="max-w-7xl mx-auto px-5 py-1 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="font-bold text-2xl">
          Al<span className="text-emerald-600">Hikma</span>
        </Link>

        {/* Hamburger button (mobile) */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Menu Links */}
        <div
          className={`${
            menuOpen ? "block" : "hidden"
          } md:flex flex-col md:flex-row md:items-center gap-5 absolute md:static top-full left-0 w-full md:w-auto bg-white md:bg-transparent px-5 md:px-0 py-4 md:py-0 shadow md:shadow-none`}
        >
          <Link to="/" className="block">Home</Link>
          <Link to="/books" className="block">Books</Link>
          <Link to="/audiobook" className="block">Audiobooks</Link>
          {/* <Link to="/categories" className="block">Categories</Link> */}

          {token ? (
            <Link to="/profile" className="block">
              <Avatar src={""} />
            </Link>
          ) : (
            <>
              <Link
                to="/signin"
                className="block bg-blue-600 text-white py-1 px-4 rounded-md shadow my-4 w-[max-content]"
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className="block bg-red-600 text-white py-1 px-4 rounded-md shadow w-[max-content]"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar