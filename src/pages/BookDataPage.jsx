import { useParams } from "react-router-dom"
import SearchBar from "../components/SearchBar"
import BookData from "../components/BookData"
import { useCallback, useEffect, useState } from "react"
import { get } from "../lib/api"
import BackBtn from "../components/BackBtn"
import { useBookDataCache } from "../context/BookDataCache"

const BookDataPage = () => {
  const { id } = useParams()
  const [book, setBook] = useState(null)
  const { bookDataCache, setBookDataCache } = useBookDataCache()

  const getBookData = useCallback(async () => {
    if (bookDataCache[id]) {
      setBook(bookDataCache[id])
    } else {
      const res = await get(id)
      setBook(res.data)
      setBookDataCache(prevCache => (
        {
          ...prevCache,
          [id]: res.data
        }
      ))
    }
  }, [id, bookDataCache, setBookDataCache])

  useEffect(() => {
    getBookData()
  }, [id, getBookData])

  return (
    <div className="mx-auto w-[90%] mb-8">
      <SearchBar />
      {book ? <BookData book={book} /> : <p>Loading...</p>}
      <BackBtn />
    </div>
  )
}

export default BookDataPage