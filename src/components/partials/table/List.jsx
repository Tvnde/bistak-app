import React from 'react'

import './list.scss'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const List = () => {
    const rows = [
        {
            id: 12345,
            Shelf: "A002",
            product: "Oraimo Shark 2",
            img: "https://images.unsplash.com/photo-1532767153582-b1a0e5145009?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YWVzdGhldGljJTIwbmlnaHR8ZW58MHx8MHx8&w=1000&q=80",
            sold: 20,
            amount: 30000,
            price: 1100,
            status: "Unavailable"
        },
        {
            id: 23456,
            Shelf: "B001",
            product: "Oraimo Vortex 2",
            img: "https://wallpaperaccess.com/full/1598595.jpg",
            sold: 63,
            amount: 8000,
            price: 450,
            status: "Available"
        },
    ]
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">ID</TableCell>
            <TableCell className="tableCell">Product</TableCell>
            <TableCell className="tableCell">Shelf</TableCell>
            <TableCell className="tableCell">Sold</TableCell>
            <TableCell className="tableCell">Amount</TableCell>
            <TableCell className="tableCell">Price</TableCell>
            <TableCell className='tableCell'>Available?</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className='tableCell'>
                <div className="cellWrapper">
                  <img src={row.img} alt='' className='image' />
                  {row.product}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.Shelf}</TableCell>
              <TableCell className="tableCell">{row.sold}</TableCell>
              <TableCell className="tableCell">{row.amount}</TableCell>
              <TableCell className="tableCell">{row.price}</TableCell>
              <TableCell className='tableCell'>
                <span className={`available ${row.status == "Available" ? "Available" : "Unavailable"}`}>{row.status == "Available" ? "In Stock" : "Out of Stock"}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default List