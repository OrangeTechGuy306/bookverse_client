
const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
    
      <div>
        <h2 className="text-2xl font-bold text-blue-400">EbookZone</h2>
        <p className="mt-2 text-sm text-gray-400">
          Discover, read, and listen to your favorite ebooks and audiobooks all in one place.
        </p>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
        <ul className="space-y-2 text-sm text-gray-400">
          <li><a href="/" className="hover:text-white">Home</a></li>
          <li><a href="/books" className="hover:text-white">Books</a></li>
          <li><a href="/audiobooks" className="hover:text-white">Audiobooks</a></li>
          <li><a href="/about" className="hover:text-white">About Us</a></li>
        </ul>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-3">Resources</h3>
        <ul className="space-y-2 text-sm text-gray-400">
          <li><a href="/help" className="hover:text-white">Help Center</a></li>
          <li><a href="/privacy" className="hover:text-white">Privacy Policy</a></li>
          <li><a href="/terms" className="hover:text-white">Terms of Service</a></li>
        </ul>
      </div>

    
      <div>
        <h3 className="text-lg font-semibold mb-3">Newsletter</h3>
        <p className="text-sm text-gray-400 mb-4">Subscribe to get the latest book releases and updates.</p>
        <form className="flex space-x-2">
          <input type="email" placeholder="Your email" className="w-full px-3 py-2 rounded-md text-gray-900" />
          <button type="submit" className="bg-blue-500 px-4 py-2 rounded-md text-white hover:bg-blue-600">
            Subscribe
          </button>
        </form>
      </div>
    </div>

    <div className="mt-10 border-t border-gray-700 pt-6 text-center text-sm text-gray-500">
      &copy; 2025 EbookZone. All rights reserved.
    </div>
  </div>
</footer>

  )
}

export default Footer