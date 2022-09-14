import React from 'react'

import './chart.scss'

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  {name: "January", Total: 1500},
  {name: "February", Total: 1800},
  {name: "March", Total: 2000},
  {name: "April", Total: 800},
  {name: "May", Total: 1400},
  {name: "June", Total: 2300},
  {name: "July", Total: 1300},
  {name: "August", Total: 1100}

];

const Chart = ({aspect, title}) => {
  return (
    <div className='chart'>
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <AreaChart width={730} height={250} data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis dataKey="name" color='gray'/>
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Area type="monotone" dataKey="Total" stroke="#82ca9d" fillOpacity={1} fill="url(#colorPv)" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}

export default Chart