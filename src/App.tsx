import { BrowserRouter, Routes, Route } from "react-router-dom"
import Homepage from "./pages/homepage"
import Navbar from "./components/custom/nav"
import LoginPage from "./pages/login"
import SignUpPage from "./pages/signup"
import ProfilePage from "./pages/profile"
import { EbookPage } from "./pages/books"
import AudioBooks from "./pages/audiobooks"
import ViewPage from "./pages/view"
import Footer from "./components/custom/footer"

function App() {
 

  return (
  <BrowserRouter>
  <Navbar />
  <Routes>
    <Route path="/" element={<Homepage />} />
    <Route path="/signin" element={<LoginPage />} />
    <Route path="/signup" element={<SignUpPage />} />
    <Route path="/profile" element={<ProfilePage />} />
    <Route path="/books" element={<EbookPage />} />
    <Route path="/audiobook" element={<AudioBooks />} />
    <Route path="/view/:id" element={<ViewPage />} />
  </Routes>
  <Footer/>
  </BrowserRouter>
  )
}

export default App
