import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { login } from "../../actions/auth";
import {useNavigate} from 'react-router'
import { Link } from 'react-router-dom'

import { Button, Container, Form, InputGroup, Col } from "react-bootstrap"
import { FaMailBulk, FaEyeSlash } from "react-icons/fa"

import 'bootstrap/dist/css/bootstrap.min.css'
import './login.scss'
import Loading from '../partials/loading/Loading'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector( (state) => state.auth)
    const [values, setValues] = useState({
        email: '',
        password: '',
        showPassword: false
    })
    const [loading, setLoading] = useState(true)
    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword
        })
    }

    const handledMouseDownPassword = (event) => {
        event.preventDefault()
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        setLoading(true)
        dispatch(login(values, navigate))
    }

    useEffect(() => {
        setLoading(false)
    })

/*     useEffect(() => {
        (userAuth(navigate))
    }) */
    return (
        <div className='login_container'>
            <Container>
                <div className="navbar">
                    <Link to="/" style={{textDecoration: "none"}}>
                        <div className="logo-brand">
                            <img src="https://bistakstore.s3.amazonaws.com/images/Bistak-Grocery-Logo_2.png" alt='' className='logoImg'/>
                        </div>
                    </Link>{/* 
                    <div className="login-others">
                        <Button className='navbutton' type='button'>Home</Button>
                    </div> */}
                </div>
                <div className="login-content">
                    <div className="login-title">
                        Login To your Account<span>.</span>
                    </div>
                    <div className="login-text">Sign in to your Bistak Stock Account</div>
                    <div className="login-form">
                        <form action="" className="login-input" onSubmit={handleSubmit}>
                            <div className="formInput">
                                <input type="email" className='form-input mb-3' placeholder=' ' onChange={(e) => setValues({...values, email: e.target.value})} />
                                <label className='form-label' htmlFor="email">Email Address</label>
                            </div>
                            <div className="formInput">
                                <input type="password" className='form-input mb-3' placeholder=' ' onChange={(e) => setValues({...values, password: e.target.value})} />
                                <label className='form-label' htmlFor="password">Password</label>
                            </div>
                            <button type='submit' className='loginBtn'>{loading ? <Loading/> : "Submit"}</button>
                        </form>
{/*                         <Form className="login-input" onSubmit={handleSubmit}>
                            <Form.Group as={Col} className='mb-3'>
                                <InputGroup>
                                    <Form.Control type='email' placeholder='Email Address' onChange={(e) => setValues({...values, email: e.target.value})}/>
                                </InputGroup>
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <InputGroup>
                                    <Form.Control as={'input'} id="password" type='password' placeholder='Password' onChange={(e) => setValues({...values, password: e.target.value})} />
                                </InputGroup>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form> */}
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default Login