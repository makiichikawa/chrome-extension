import React from 'react'
import Select from 'react-select'
import './Url.css'

const Url = ({url, handDeleteUrl, changeTag}) => {
  const tag = url.tags[0]
  const options = [
    { value: 'rice', label: 'ごはんもの' },
    { value: 'main', label: '主菜' },
    { value: 'side', label: '副菜' },
    { value: 'another', label: 'その他' }
  ]
  const formatOptionLabel = (data, meta) => {
    return meta.context === 'value' ? (
      <div className={`tag ${data.value}`}>{data.label}</div>
    ) : (
      <div className={`tag ${data.value}`}>{data.label}</div>
    )
  }
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px', margin: '10px 0' }}>
      <Select
        defaultValue={{ value: tag.className, label: tag.name }}
        options={options}
        formatOptionLabel={formatOptionLabel}
        onChange={(selectOption) => {
          changeTag(url.id, selectOption)
          const event = new CustomEvent('activateTab', { detail: selectOption.value })
          window.dispatchEvent(event)
        }}
      />
      {/* <div className={`tag ${tag.className}`}>{tag.name}</div> */}
      <a 
        href={url.url} 
        onClick={(e) => e.stopPropagation()}
        target="_blank"
        style={{ color: '#007BFF', textDecoration: 'underline' }}
      >
        {url.title}
      </a>
      <button onClick={() => handDeleteUrl(url.id)} style={{ marginLeft: '10px', backgroundColor: '#ccc', color: '#fff' }}>削除</button>
    </div>
  )
}

export default Url