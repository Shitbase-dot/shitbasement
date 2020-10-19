import React from 'react'

export const LinkCard = ({link}) => {
    return (
        <>
            <h2>Link</h2>
            <p>Cutting link: <a href={link.to} target="_blank" rel="nooperer noreferrer">{link.to}</a></p>
            <p>From there: <a href={link.from} target="_blank" rel="nooperer noreferrer">{link.from}</a></p>
            <p>Count of clicks: <strong>{link.clicks}</strong></p>
            <p>Created date: <strong>{new Date(link.date).toLocaleDateString}</strong></p>

        </>
    )
}