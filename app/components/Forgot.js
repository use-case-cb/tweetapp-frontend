import React, { useEffect, useState } from "react"
import Axios from "axios"
import Page from "./Page"
import { backend } from "../Constants"

function Forgot() {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      const response = await Axios.get(backend + username + "/forgot")
      setPassword(response.data)
    } catch (e) {
      console.log("Request Failed")
      console.log(e)
    }
  }

  return (
    <Page title="Forgot Password">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username-forgot" className="text-muted mb-1">
            <small>Username</small>
          </label>
          <input onChange={e => setUsername(e.target.value)} id="username-forgot" name="username" className="form-control" type="text" placeholder="Enter username" autoComplete="off" />
        </div>
      </form>

      <h6>{"Password is:: " + password}</h6>
    </Page>
  )
}

export default Forgot
