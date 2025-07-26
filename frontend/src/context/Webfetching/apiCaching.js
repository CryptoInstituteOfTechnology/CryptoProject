// handles fetching from URLS, caches and stores data in rbowser if already there or time limit hasnt been reached
export async function apiCaching({ url, timeBeforeNextFetch, cachingKey, methodToFetch }) {
    
    const timeNow = Date.now()
    const cachedData = localStorage.getItem(cachingKey) // finds the storage of data - news or keys
    const lastTimeFetched = localStorage.getItem(`${cachingKey}_timestamp`) // we store the timestamp as a key value in our storage
    // if theres data already or its not past time limit used pre fetched data
    if (cachedData && lastTimeFetched && timeNow - parseInt(lastTimeFetched) < timeBeforeNextFetch) {
        return JSON.parse(cachedData)
    }
    // if first time fetching or time set has passed
    try {
        const response = await fetch(url, methodToFetch)
        const data = await response.json()
        localStorage.setItem(cachingKey,JSON.stringify(data))// save the key and the data
        localStorage.setItem(`${cachingKey}_timestamp`, timeNow.toString()) // save timestamp
        return data
    } catch (error) {
        if (cachedData) {
            return JSON.parse(cachedData)
        }
        return null 
    }
}