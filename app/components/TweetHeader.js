import React, { useEffect, useState } from "react"
import Axios from "axios"
import { Link } from "react-router-dom"

function TweetHeader(props) {
  const [liked, setLiked] = useState()
  function refresh() {
    window.location.reload(false)
  }

  useEffect(() => {
    setLiked(true)
  }, [])

  async function handleClick(e) {
    e.preventDefault()
    try {
      await Axios.put("http://localhost:8080/" + localStorage.getItem("appUsername") + "/like/" + props.tweet.id)
      console.log("Tweet liked")
      setLiked(!liked)

      refresh()
      console.log(liked)
    } catch (e) {
      console.log("Error")
      console.log(e)
    }
  }

  return (
    <>
      <p>@{props.tweet.author}</p>
      <p>{props.tweet.content} </p>
      <p className="text-info">
        {" "}
        <small>{props.tweet.tags}</small>
        <div className="float-right">
          <button className="btn" onClick={handleClick}>
            <i className={liked ? "fas fa-heart text-danger" : "far fa-heart text-danger"} />
          </button>
          {props.tweet.likes.length}
        </div>
      </p>
    </>
  )
}

export default TweetHeader
