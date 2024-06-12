import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './main.css'
import { BrowserRouter } from 'react-router-dom'
import { SearchResultCacheProvider } from './context/SearchResultCache.jsx'
import { BookDataCacheProvider } from './context/BookDataCache.jsx'
import { SearchKeywordProvider } from './context/SearchKeyword.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SearchResultCacheProvider>
      <BookDataCacheProvider>
        <BrowserRouter>
          <SearchKeywordProvider>
            <App />
          </SearchKeywordProvider>
        </BrowserRouter>
      </BookDataCacheProvider>
    </SearchResultCacheProvider>
  </React.StrictMode>,
)
