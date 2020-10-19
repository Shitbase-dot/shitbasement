import React, { useCallback, useContext, useEffect, useState } from 'react';
import {useParams} from 'react-router-dom'
import { Loader } from '../components/Loader';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import {LinkCard} from '../components/LinkCard'

export default () => {
    const linkId = useParams().id
    const [link, setLink] = useState()
    const {requset, loading} = useHttp()
    const {token} = useContext(AuthContext)
    console.log('d')
    const getLink = useCallback(async () => {
        try {
            console.log(token)
            const fetched = await requset(`/api/link/${linkId}`, 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            console.log(fetched)
            setLink(fetched)
        } catch(e) {}
    }, [token, linkId, requset])

useEffect(() => {
    getLink()
}, [])

if (loading) {
    return <Loader/>
}

    return (
        <div>
            {!loading && link && <LinkCard link={link}/>}
        </div>
    )
}