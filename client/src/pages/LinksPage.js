import { useState } from 'react'
import React, { useCallback, useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useHttp } from '../hooks/http.hook';
import { Loader } from '../components/Loader';
import {LinksList} from '../components/LinksList'

export default () => {

    const [links, setLinks] = useState([])
    const {loading, requset} = useHttp()
    const {token} = useContext(AuthContext)
    console.log('so')
    const fetchLinks = useCallback(async () => {
        try {
            console.log('start')
            const fetched = await requset('/api/link', 'GET', null, {
                Authorization: `Bearer ${token}`
            })
            console.log(fetched)
            setLinks(fetched)
        } catch (e) {}
  
    }, [])

    useEffect(() => {
        fetchLinks()
    }, [fetchLinks])

    if (loading) {
        return <Loader/>
    }

    return (
        <div>
            {!loading && <LinksList links={links}/>}
        </div>
    )
        
    }
