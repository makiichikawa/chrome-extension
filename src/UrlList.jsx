import React from 'react'
import Url from './Url'
import './UrlList.css'

const UrlList = ({urls, handDeleteUrl}) => {
  return (
    <div className="url-list">
      {urls.map((url) => (
        <Url url={url} key={url.id} handDeleteUrl={handDeleteUrl} className="url-item" />
      ))}
    </div>
  )
}

export default UrlList