import React from 'react'

import './pageheader.scss'

const Pageheader = (title) => {
  return (
    <div className='pageheader'>
        <div className="title">{title.title}</div>
    </div>
  )
}

export default Pageheader