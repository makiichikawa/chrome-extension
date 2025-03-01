import React from 'react'
import './Url.css'

const Url = ({url, handDeleteUrl}) => {
  const tag = url.tags[0]
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', margin: '10px 0' }}>
      <div className={`tag ${tag.className}`}>{tag.name}</div>
      <a href={url.url} style={{ color: '#007BFF', textDecoration: 'underline' }}>{url.title}</a>
      <button onClick={() => handDeleteUrl(url.id)} style={{ marginLeft: '10px', backgroundColor: '#ccc', color: '#fff' }}>削除</button>
    </div>
  )
}

export default Url