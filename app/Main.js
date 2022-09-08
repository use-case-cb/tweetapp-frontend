import React, { useState } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"

//Components
import Header from "./components/Header"
import Register from "./components/Register"
import Login from "./components/Login"
import Home from "./components/Home"
import Tweet from "./components/Tweet"
import Users from "./components/Users"
import User from "./components/User"
import Forgot from "./components/Forgot"
import EditTweet from "./components/EditTweet"

function Main() {
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("appUsername")))
  return (
    <BrowserRouter>
      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      <Routes>
        <Route path="/" element={loggedIn ? <Home /> : <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn} />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<Forgot />} />
        <Route path="/tweet/:id" element={<Tweet />} />
        <Route path="/tweet/:id/edit" element={<EditTweet />} />
        <Route path="/users" element={<Users />} />
        <Route path="/user/*" element={<User />} />
      </Routes>
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.querySelector("#app"))
root.render(<Main />)

if (module.hot) {
  module.hot.accept()
}
