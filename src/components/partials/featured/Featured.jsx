import React from 'react'

import './featured.scss'

import { MoreVert } from '@mui/icons-material'
import { CircularProgressbar } from "react-circular-progressbar"
import 'react-circular-progressbar/dist/styles.css'

const Featured = ({title, value, subTitle, desc, valueAmount}) => {
  return (
    <div className='featured'>
        <div className="top">
            <h1 className="title">{title}</h1>
            <MoreVert fontSize='small'/>
        </div>
        <div className="bottom">
            <div className="featuredChart">
                <CircularProgressbar value={value} text={`${value}%`} strokeWidth={4}/>
            </div>
            <p className="title">{subTitle}</p>
            <p className="amount">{valueAmount}</p>
            <p className="desc">{desc}</p>
        </div>
    </div>
  )
}

export default Featured