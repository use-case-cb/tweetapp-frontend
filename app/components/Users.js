import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Page from "./Page"
import Axios from "axios"
import { backend } from "../Constants"

function Users() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    loadUsers()
  }, [])

  async function loadUsers() {
    try {
      const response = await Axios.get(backend + "users")
      setUsers(response.data)
    } catch (e) {
      console.log("Error")
      console.log(e)
    }
  }

  return (
    <>
      <Page title="Users">
        <div className="list-group">
          {users.map(user => {
            return (
              <>
                <Link className="list-group-item text-dark" to={"/user/" + user.id} style={{ textDecoration: "none" }}>
                  <p>@{user.username}</p>
                </Link>
              </>
            )
          })}
        </div>
      </Page>
    </>
  )
}

export default Users
