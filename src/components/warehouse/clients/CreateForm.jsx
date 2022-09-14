import { DriveFolderUploadOutlined } from '@mui/icons-material'
import React, {useEffect, useState} from 'react'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { useParams } from "react-router-dom"
import { saveClient } from '../../../actions/clients'
import Navbar from '../../partials/navbar/Navbar'
import Sidebar from '../sidebar/Sidebar'

import './createform.scss'

const CreateForm = ({inputs}) => {
  const [file, setFile] = useState("")
  let clients = useSelector((state) => state.clients)
  console.log(clients)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [values, setValues] = useState({
    name: clients ? (clients.name) : "",
    email: clients ? clients.email : "",
    phonenumber: clients ? clients.phonenumber : "",
    id: clients ? clients.id : "",
    type: clients ? clients.type : ""
})

let {id} = useParams()
console.log(id)

const handleClientSave = async(e) => {
  e.preventDefault()
  let imageInput = document.querySelector("#file").files[0]
        console.log(imageInput)
        let imgUrl = ""
        if(imageInput) {
          let { url } = await fetch("https://bistak-api.herokuapp.com/s3Url").then(res => res.json())
          console.log(url)
      
          await fetch(url, {
              method: 'PUT',
              headers: {
                  "Content-Type": "multipart/form-data"
              },
              body: imageInput
          })
          imgUrl = url.split('?')[0]
      } else{
          console.log("No image input")
      }
      let name = document.querySelector("#name").value
      let email = document.querySelector("#email").value
      let phonenumber = document.querySelector("#phonenumber").value
      let type = document.querySelector("#type").value

      let _id = document.querySelector("#clientID").value

      dispatch(saveClient({_id, name, email, phonenumber, type, image: imgUrl}))
      navigate('/clients')
}

  return (
    <div className='createform'>
      <Sidebar/>
      <div className="newContainer">
        <Navbar/>
        <div className="top">
          <h2>Create New Client</h2>
        </div>
        <div className="bottom">
          <div className="left">
              <img src={
                  file
                      ? URL.createObjectURL(file)
                      : "https://bistakstore.s3.amazonaws.com/images/no-image-icon.png"
              } alt="" />
          </div>
          <div className="right">
            <form>
              <input type="hidden" id="clientID" defaultValue={id? id : ""} />
              <div className="formInput">
                  <label className="create-label" htmlFor="file">Image: <DriveFolderUploadOutlined className="icon" /></label>
                  <input type="file" className='file-input' id="file" style={{display: "none"}} onChange =  { e => setFile(e.target.files[0])} />
              </div>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                    {input.type =="date" ? (<input type={input.type} className={`create-input ${input.target}`} id={input.target} defaultValue={values[input.target].split("T")[0]} placeholder=" " />) : (<input type={input.type} className={`create-input ${input.target}`} id={input.target} defaultValue={values[input.target]} placeholder=" " />)}
                    
                    <label className="create-label" htmlFor={input.target}>{input.label}</label>
                </div>
              ))}
                <div className="formInput" key={7}>
                    <select id='type' className='select-input'>
                        <option value={"Individual"}>An Individual</option>
                        <option value={"Company"}>A Company</option>
                    </select>
                    <label className='create-label' htmlFor="type">Client Type</label>
                </div>
                <button type='button' onClick={handleClientSave}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateForm