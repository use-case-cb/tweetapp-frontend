import React, { useEffect, useState } from "react"
import { Link } from "react-router-dom"

function HeaderLoggedOut() {
  return (
    <>
      <div className="header-item">
        <h6 className="my-2">
          <Link to="/" className="text-white">
            Login
          </Link>
        </h6>
      </div>
      <div className="header-item">
        <h6 className="my-2">
          <Link to="/register" className="text-white">
            Register
          </Link>
        </h6>
      </div>
    </>
  )
}

export default HeaderLoggedOut
