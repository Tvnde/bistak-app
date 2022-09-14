import React from 'react'

const Modal = ({id}) => {
    const DeleteFunction = (id) => {
        console.log(id)
    }
  return (
    <div className='modal'>
        <div className='showModal'>
            <div className="modal-wrapper">
                <div className="modal-img">
                    <img src="https://bistakstore.s3.amazonaws.com/images/trashcan.jpg" alt="" className='modalImg' />
                </div>
                <div className="modal-content">
                    <h1>Are you sure you want to delete this Product? </h1>
                    <button type='button' onClick={DeleteFunction}>Delete</button>
                </div>
                <div className="close-modal" aria-label='Close Modal'></div>
            </div>
        </div> 
    </div>
  )
}

export default Modal