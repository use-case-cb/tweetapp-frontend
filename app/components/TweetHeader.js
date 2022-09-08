import React, { useEffect, useState } from "react"
import Axios from "axios"
import { Link } from "react-router-dom"
import { backend } from "../Constants"

function TweetHeader(props) {
  const [likes, setLikes] = useState()
  const [likeClicked, setLikeClicked] = useState(false)

  useEffect(() => {
    setLikes(props.tweet.likes.length)

    for (let i = 0; i < props.tweet.likes.length; i++) {
      const n = props.tweet.likes[i].username
      const m = localStorage.getItem("appUsername")
      if (n === m) {
        setLikeClicked(true)
      }
    }
  }, [likeClicked])

  async function updateLikes() {
    try {
      await Axios.put(backend + localStorage.getItem("appUsername") + "/like/" + props.tweet.id)
      setLikes(likes + 1)
    } catch (e) {
      console.log("Error")
      console.log(e)
    }
  }

  return (
    <>
      <p>
        @{props.tweet.author}
        <small>
          <div className="float-right text-secondary text-muted">{props.tweet.date}</div>
        </small>
      </p>

      <p>{props.tweet.content} </p>
      <p className="text-info">
        {" "}
        <small>{props.tweet.tags}</small>
        <div className="float-right">
          <button className="btn" onClick={updateLikes}>
            <i className={"far fa-heart text-danger"} />
          </button>
          {likes}
        </div>
      </p>
    </>
  )
}

export default TweetHeader
