import React, { useState } from 'react'

export default function Post (props) {
  const [expanded, setExpanded] = React.useState(false)
  const [post, setState] = useState({
    text: props.data.text,
    name: props.data.author.first_name,
    surname: props.data.author.last_name,
    src: props.data.author.profile_img,
    date: props.data.add_date,
    id: props.data.author.id,
    postId: props.data.id,
    modDate: props.data.mod_date
  })

  const [usersId, setUsersId] = useState(props.usersId)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  const longDate = post.date
  const additionDate = longDate.substr(0, 10)
  const additionTime = longDate.substr(11, 12)
  const additionTimeFormatted = additionTime.substr(0, 5)
  const longModDateTime = post.modDate
  let modificationDate = ''
  let modificationTime = ''
  let modificationTimeFormatted = ''

  if (longModDateTime !== null) {
    modificationDate = longModDateTime.substr(0, 10)
    modificationTime = longModDateTime.substr(11, 12)
    modificationTimeFormatted = modificationTime.substr(0, 5)
  }

  return (
    <div className='post'>
      <div className='post__header'>
        <div className='post__header'>
          <img src={post.src} alt='users img' className='post__header--img' />
          <div className='post__header--name'>
            {post.name} {post.surname}
          </div>
          {post.modDate == null ? (
            <div className='post__header--date'>
              {additionDate} {additionTimeFormatted}
            </div>
          ) : (
            <div className='post__header--date'>
              Edytowano: {modificationDate} {modificationTimeFormatted}
            </div>
          )}
        </div>
        <hr />
      </div>
      <div className='post--content'>{post.text}</div>
      <hr />
      <div className='post--comment'>pokaż komentarze</div>
    </div>
  )
}
