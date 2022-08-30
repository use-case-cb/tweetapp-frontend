import React, { useEffect } from "react"

function ComponentName(props) {
  const reply = props.reply

  return (
    <>
      <div className="list-group-item text-dark">
        <p>@{reply.author}</p>
        <p>{reply.content} </p>
      </div>
      <br />
    </>
  )
}

export default ComponentName
