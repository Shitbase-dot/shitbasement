import React, {useEffect, useState, useContext} from 'react';
import { AuthContext } from '../context/AuthContext';
import {useHttp} from '../hooks/http.hook';
import { useMessage } from '../hooks/message.hook';

export default () => {
    const {loading, error, requset, clearError} = useHttp();
    const [form, setForm] = useState({
        email: '', password: ''
    });
    const message = useMessage();
    const auth = useContext(AuthContext);

    useEffect(() => {
        message(error);
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({...form, [event.target.name]: event.target.value })
    }

    const registerHandler = async () => {
        try {
            const data = await requset('/api/auth/register', 'POST', {...form})
            console.log('data', data);
        } catch (e) {}
    }

    const loginHandler = async () => {
        try {
            const data = await requset('/api/auth/login', 'POST', {...form})
            auth.login(data.token, data.userId);
        } catch (e) {}
    }

    return (
        <div className="row">
            <div className="col s6 offset-s3">
               <h1>Cut a link</h1> 
               <div className="card blue darken-1">
                   <div className="card-content white-text">
                    <span className="card-title">Autenification</span>
                    <div>
                        <div className="row">
                            <div className="input-field col s12">
                            <input id="email" type="email" className="validate" name="email" className="yellow-input" value={form.email} onChange={changeHandler}/>
                            <label htmlFor="email">Email</label>
                            </div>
                        </div>
                        <div className="row">
                            <div className="input-field col s12">
                            <input id="password" type="password" className="validate" name="password" className="yellow-input" value={form.password} onChange={changeHandler}/>
                            <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                        <div className="card-action">
                            <button className="btn yellow darken-4" onClick={loginHandler} disabled={loading} >Sign in</button>
                            <button className="btn grey lightn-1 black-text" onClick={registerHandler} disabled={loading}>Log out</button>
                        </div>
                   </div>
                   
               </div>
            </div>
        </div>
    )
}