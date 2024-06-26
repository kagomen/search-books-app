import axios from 'axios'

// export async function search(keyword, pageNum = 0) {
//   const res = await axios.get(
//     `https://www.googleapis.com/books/v1/volumes?q=${keyword}&printType=books&startIndex=${pageNum}&langRestrict=ja`,
//   )
//   return res
// }

// export async function get(id) {
//   const res = await axios.get(`https://www.googleapis.com/books/v1/volumes/${id}`)
//   return res
// }

export async function search(keyword, pageParam) {
  const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/search/${keyword}/${pageParam}`)
  if (keyword == 'error') {
    throw new Error('error check by リブラク')
  }
  return res
}

export async function get(isbn) {
  const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/book/${isbn}`)
  return res
}

export async function sendMail(data) {
  try {
    await axios.post(`${import.meta.env.VITE_SERVER_URL}/send-email`, {
      name: data.name,
      email: data.email,
      body: data.body,
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    console.error('Error:', error)
  }
}
