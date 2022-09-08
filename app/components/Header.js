import React, { useState } from "react"
import { Link } from "react-router-dom"
import HeaderLoggedOut from "./HeaderLoggedOut"
import HeaderLoggedIn from "./HeaderLoggedIn"

function Header(props) {
  return (
    <>
      <header className="header-bar bg-dark mb-3">
        <div className="container d-flex flex-column flex-md-row align-items-left p-3">
          <h3 className="my-0 mr-md-auto font-weight-normal">
            <Link to="/" className="text-white">
              Tweet App v3
            </Link>
          </h3>
          {props.loggedIn ? <HeaderLoggedIn setLoggedIn={props.setLoggedIn} /> : <HeaderLoggedOut />}
        </div>
      </header>
    </>
  )
}

export default Header
