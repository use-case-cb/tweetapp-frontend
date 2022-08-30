import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function HeaderLoggedIn(props) {
  function handleLogout() {
    props.setLoggedIn(false)
    localStorage.removeItem("appUsername")
  }

  return (
    <>
      <div className="header-item">
        <h6 className="my-2">
          <Link to="/" className="text-white">
            Tweets
          </Link>
        </h6>
      </div>
      <div className="header-item">
        <h6 className="my-2">
          <Link to="/users" className="text-white">
            All Users
          </Link>
        </h6>
      </div>
      <div className="header-item">
        <button onClick={handleLogout} className="btn btn-sm btn-secondary">
          Sign Out
        </button>
      </div>
    </>
  )
}

export default HeaderLoggedIn
