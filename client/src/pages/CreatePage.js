import {useHttp} from '../hooks/http.hook';
import React, {useContext, useState} from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHistory } from 'react-router-dom';

export default () => {
    const auth = useContext(AuthContext)
    const [link, setLink] = useState('')
    const {requset} = useHttp()
    const history = useHistory()

    const pressHandler = async event => {
        if (event.key === 'Enter') {
            const data = await requset('/api/link/generate', 'POST', {from: link}, {
                Authorization: `Bearer ${auth.token}`
            })
            console.log(data)
            history.push(`/detail/${data.link._id}`)
        }
    }

    return (
        <div className="row">
            <div className="input-field col s12">
            <input id="link" type="text" className="validate" name='link' value={link} onChange={e => setLink(e.target.value)} onKeyPress={pressHandler}/>
            <label htmlFor="email">Link</label>
            </div>
       </div>              
    )
}