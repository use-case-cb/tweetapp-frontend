import React, { useEffect, useState } from "react"
import Axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import Page from "./Page"
import TweetHeader from "./TweetHeader"
import Replies from "./Replies"

function Tweet(props) {
  const [tweet, setTweet] = useState([])
  const [content, setContent] = useState()
  const [replies, setReplies] = useState([])

  const navigate = useNavigate()

  let uri = window.location.pathname
  let parts = uri.split("/")
  let tweetId = parts[2]

  async function loadTweets() {
    try {
      const response = await Axios.get("http://localhost:8080/tweet/" + tweetId)
      setTweet(response.data)
      console.log("Below")
      console.log(response.data)
    } catch (e) {
      console.log("Error")
      console.log(e)
    }
  }

  async function loadReplies() {
    try {
      const response = await Axios.get("http://localhost:8080/tweet/" + tweetId + "/replies")
      if (response.data) setReplies(response.data)
      console.log(response.data)
    } catch (e) {
      console.log("Error getting replies")
    }
  }

  useEffect(() => {
    loadTweets()
    loadReplies()
  }, [])

  async function handleReply(e) {
    e.preventDefault()
    try {
      await Axios.post("http://localhost:8080/" + localStorage.getItem("appUsername") + "/reply/" + tweetId, {
        content
      })
      console.log("Reply posted")
      e.target.reset()
      loadTweets()
      loadReplies()
    } catch (e) {
      console.log("Error replying to post")
      console.log(e)
    }
  }
  async function handleDelete(e) {
    e.preventDefault
    const confirm = window.confirm("Are you sure")
    if (confirm) {
      try {
        const response = await Axios.delete("http://localhost:8080/" + localStorage.getItem("appUsername") + "/delete/" + tweetId)
        navigate("/")
      } catch (e) {
        console.log("Error deleting tweet")
        console.log(e)
      }
    }
  }

  function isAuthor() {
    if (localStorage.getItem("appUsername") == tweet[0]?.author) {
      return true
    } else {
      return false
    }
  }

  return (
    <Page title="Tweet">
      <p>
        {isAuthor() && (
          <span className="pt-2 float-right">
            <Link to={`/tweet/${tweetId}/edit`} className="text-secondary mr-2" title="Edit">
              <i className="fas fa-edit"></i>
            </Link>
            <button className="delete-post-button text-secondary" title="Delete" onClick={handleDelete}>
              <i className="fas fa-trash-alt"></i>
            </button>
          </span>
        )}
      </p>
      <br />
      <div className="list-group">
        <div className="list-group-item text-dark">
          {tweet.map(tweet => {
            return (
              <>
                <TweetHeader tweet={tweet} />
              </>
            )
          })}

          <Replies replies={replies} />

          <form onSubmit={handleReply}>
            <textarea onChange={e => setContent(e.target.value)} id="content-tweet" name="content" className="body-content  form-control" type="text" placeholder="Start writing" autoComplete="off" />
            <br />
            <button type="submit" className="mx-4 float-right btn btn-primary">
              Post
            </button>
          </form>
        </div>
      </div>
    </Page>
  )
}

export default Tweet
