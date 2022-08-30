import React, { useEffect, useState } from "react"
import Axios from "axios"
import { useNavigate, Link } from "react-router-dom"
import Page from "./Page"
import TweetHeader from "./TweetHeader"
import Replies from "./Replies"

function EditTweet(props) {
  const [tweet, setTweet] = useState([])
  const [content, setContent] = useState()
  const [likes, setLikes] = useState()
  const [replies, setReplies] = useState([])

  const navigate = useNavigate()

  let uri = window.location.pathname
  let parts = uri.split("/")
  let tweetId = parts[2]
  async function loadTweets() {
    try {
      const response = await Axios.get("http://localhost:8080/tweet/" + tweetId)
      setTweet(response.data[0])
      console.log(response.data)
    } catch (e) {
      console.log("Error")
      console.log(e)
    }
  }

  useEffect(() => {
    loadTweets()
  }, [])

  function handleEdit(e) {
    setTweet({ content: e.target.value })
    setContent(e.target.value)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await Axios.put("http://localhost:8080/" + localStorage.getItem("appUsername") + "/update/" + tweetId, {
        content
      })
      console.log("Posted edited")
      loadTweets()
      navigate(-1)
    } catch (e) {
      console.log("Error editing post")
      console.log(e)
    }
  }

  return (
    <Page title="Edit Tweet">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="content-tweet" className="text-muted mb-1 d-block">
            <small>Tweet</small>
          </label>
          <textarea value={tweet.content} onChange={handleEdit} id="content-tweet" name="content" rows="5" className="body-content form-control" type="text" autoComplete="off" maxLength={144} />
          <label htmlFor="tag-tweet" className="text-muted mb-1 d-block">
            <small>Tags</small>
          </label>
          <input id="tags-tweet" name="tags" className="form-control" type="text" placeholder="Enter tags" autoComplete="off" />
        </div>
        <button type="submit" className="mx-4 float-right btn btn-lg btn-success">
          Edit
        </button>
        <br /> <br /> <br />
      </form>
    </Page>
  )
}

export default EditTweet
