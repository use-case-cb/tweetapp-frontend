import React, { useEffect, useState } from "react"
import Page from "./Page"
import Tweets from "./Tweets"

function Home(props) {
  const [msg, setMsg] = useState()

  useEffect(() => {
    const date = new Date()
    const time = date.getHours()
    if (time < 12) {
      setMsg("Good morning,")
    } else if (time >= 12 && time < 18) {
      setMsg("Good afternoon,")
    } else {
      setMsg("Good evening,")
    }
  }, [])

  return (
    <>
      <Page title="Tweets">
        <p className="lead text-muted text-center">
          {msg} {localStorage.getItem("appUsername")}
        </p>
        <Tweets />
      </Page>
    </>
  )
}

export default Home
