import React, { useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import axios from "axios";
const BASE_URL = "http://localhost:5000";

const Login = () => {
    const [credentials, setCredentials] = useState({ username: "", password: "" });
    const [errors , setErrors] = useState(false);
    const { push } = useHistory();

    const formChange = e => setCredentials({ ...credentials, [e.target.name]: e.target.value });
    const formSubmit = e => {
        e.preventDefault();
        axios.post(`${BASE_URL}/api/login`, credentials)
            .then(res => {
                localStorage.setItem("token", res.data.token);
                push("/view");
            })
            .catch(err => setErrors(err.message));
    };
    
    return(<ComponentContainer>
        <ModalContainer>
            <h1>Welcome to Blogger Pro</h1>
            <h2>Please enter your account information.</h2>
            <FormGroup onSubmit={formSubmit}>
                <Input 
                id="username"
                name="username"
                value={credentials.username}
                type="text"
                placeholder="username"
                onChange={formChange}
                />
                <Input 
                id="password"
                name="password"
                value={credentials.password}
                type="password"
                placeholder="password"
                onChange={formChange}
                />
                <Button id="submit">submit</Button>
            </FormGroup>
            {errors ? <p id="error">**a server provided error message can be found in {errors}**</p> : ""}
        </ModalContainer>
    </ComponentContainer>);
}

export default Login;

const ComponentContainer = styled.div`
    height: 70%;
    justify-content: center;
    align-items: center;
    display:flex;
`

const ModalContainer = styled.div`
    width: 500px;
    background: white;
    padding: 2rem;
    text-align: center;
`

const Label = styled.label`
    display: block;
    text-align: left;
    font-size: 1.5rem;
`

const FormGroup = styled.form`
    padding:1rem;
`

const Input = styled.input`
    font-size: 1rem;
    padding: 1rem 0;
    width:100%;
`

const Button = styled.button`
    padding:1rem;
    margin-bottom: 10%; 
    width: 100%;
    background-color: crimson;
    color: snow;
    font-size: 1.2rem;
`
