import { useState, useCallback } from 'react';

export const useHttp = () => {
    let loading = false;
    const setLoading = (loading) => !loading;
    
    const [error, setError] = useState(null);
    
    const requset = async (url, method = 'GET', body = null, headers = {}) => {
        
        try {
            setLoading(true)
            if(body) {
                body = JSON.stringify(body);
                headers['Content-Type'] = 'application/json';
            }   
            const res = await fetch(url, {method, body, headers});
            const data = await res.json();
            console.log(data)
            console.log(res)
            if(!res.ok) {
                throw new Error(data.message || 'Something goes wrong')
            }
            setLoading(false);

            return data

        } catch (e) {
            setLoading(false)
            setError(e.message);
            throw e;
        }
    }

    const clearError = () => setError(null);

    return {loading, requset, error, clearError}
}