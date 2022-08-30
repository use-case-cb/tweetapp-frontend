import React, { useEffect } from "react"
import Reply from "./Reply"

function Replies(props) {
  const replies = props.replies
  return (
    <>
      {replies.map(reply => {
        return (
          <>
            <Reply key={reply.id} reply={reply} />
          </>
        )
      })}
    </>
  )
}

export default Replies
