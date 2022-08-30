import React, { useEffect, useState } from "react"
import Axios from "axios"
import { Link } from "react-router-dom"
import TweetHeader from "./TweetHeader"

function Tweets() {
  const [tweets, setTweets] = useState([])
  const [content, setContent] = useState()
  const [tags, setTags] = useState()
  const [msg, setMsg] = useState()

  useEffect(() => {
    loadTweets()
  }, [])

  async function loadTweets() {
    try {
      const response = await Axios.get("http://localhost:8080/tweets")
      setTweets(response.data)
    } catch (e) {
      console.log("Error")
      console.log(e)
    }
  }

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      await Axios.post("http://localhost:8080/" + localStorage.getItem("appUsername") + "/add", { content, tags })
      e.target.reset()
      loadTweets()
    } catch (e) {
      console.log("Something went wrong")
      console.log(e)
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="content-tweet" className="text-muted mb-1 d-block">
            <small>Tweet</small>
          </label>
          <textarea onChange={e => setContent(e.target.value)} id="content-tweet" name="content" rows="5" className="body-content form-control" type="text" placeholder="Start writing (max. 144 chars)" autoComplete="off" maxLength={144} />
          <label htmlFor="tag-tweet" className="text-muted mb-1 d-block">
            <small>Tags</small>
          </label>
          <input onChange={e => setTags(e.target.value)} id="tags-tweet" name="tags" className="form-control" type="text" placeholder="Enter tags" autoComplete="off" maxLength={50} />
        </div>
        <button type="submit" className="mx-4 float-right btn btn-lg btn-success">
          Post
        </button>
        <br /> <br /> <br />
      </form>
      <div className="list-group">
        {tweets
          .slice(0)
          .reverse()
          .map(tweet => {
            return (
              <>
                <Link key={tweet.id} className="list-group-item text-dark" to={"/tweet/" + tweet.id} style={{ textDecoration: "none" }}>
                  <TweetHeader tweet={tweet} />
                </Link>
                <br />
              </>
            )
          })}
      </div>
    </>
  )
}

export default Tweets
