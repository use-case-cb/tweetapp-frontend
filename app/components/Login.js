import React, { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Axios from "axios"

import Page from "./Page"

function Login(props) {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      const response = await Axios.post("http://localhost:8080/login", { username, password })
      if (response.data) {
        console.log(response.data)
        localStorage.setItem("appUsername", response.data.username)
        props.setLoggedIn(true)
      } else {
        console.log("Incorrect user/pass")
      }
    } catch (e) {
      console.log("Error logging in")
      console.log(e)
    }
  }

  return (
    <>
      <Page title={"Login"}>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username-login" className="text-muted mb-1">
              <small>Username</small>
            </label>
            <input onChange={e => setUsername(e.target.value)} id="username-login" name="username" className="form-control" type="text" placeholder="Enter username" autoComplete="off" />
          </div>

          <div className="form-group">
            <label htmlFor="password-login" className="text-muted mb-1">
              <small>Password</small>
            </label>
            <input onChange={e => setPassword(e.target.value)} id="password-login" name="password" className="form-control" type="password" placeholder="Enter password" autoComplete="off" />
            <br />
            <h6>
              <Link to="/forgot">Forgot password</Link>
            </h6>
          </div>

          <button type="submit" className="mx-4 float-right btn btn-lg btn-success">
            Login
          </button>
          <br />
          <h6>
            Don't have an account? <Link to="/register"> Register</Link>
          </h6>
        </form>
      </Page>
    </>
  )
}

export default Login
