import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'

import './index.css'
import App from './App.jsx'
import Home from './page/Home.jsx'
import BookList from './page/BookList.jsx'
import AboutPage from './page/AboutPage.jsx'
import BookReviewPage from './page/BookReviewPage.jsx'
import SignIn from './page/signIn.jsx'
import SignUp from './page/SignUp.jsx'
import EditProfile from './page/EditProfile.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
      <Route path="/" element={<App />}>
        <Route path="" element={<Home />}/>
        <Route path="/book_listings" element={<BookList />}/>
        <Route path="/about" element={<AboutPage />}/>
        <Route path="/book/:id" element={<BookReviewPage/>}/>
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/EditProfile" element={<EditProfile />} />
      </Route>  
  )
)


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
