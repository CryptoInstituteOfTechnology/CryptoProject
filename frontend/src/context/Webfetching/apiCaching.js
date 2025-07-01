import { cache } from "react"

export async function apiCaching({ url, timeBeforeNextFetch, cachingKey, methodToFetch }) {

    const timeNow = Date.now()

    const cachedData = localStorage.getItem(cachingKey) // finds the storage of data - news or keys
    const lastTimeFetched = localStorage.getItem(`${cachingKey}_timestamp`) // we store the timestamp as a key value in our storage



    // if theres data already, and theres a time we fectehd to avoid errors and it ahsnt beeen past the timebeofre next fetch we just use the cached data

    if (cachedData && lastTimeFetched && timeNow - parseInt(lastTimeFetched) < timeBeforeNextFetch) {// have to use parseint bc lasttimefetched is a string


        
        return JSON.parse(cachedData)
    }
    // if first time fetching or time to late

    try {

        const response = await fetch(url, methodToFetch)

        if (!response.ok){
            console.log(`error fetching data${response.status}`) // if error fetching 
        }

        const data = await response.json()


        localStorage.setItem(cachingKey,JSON.stringify(data)) //stack overflow
        localStorage.setItem(`${cachingKey}_timestamp`, timeNow.toString()) // save timestamp

        return data

    } catch (error) {
        if (cachedData) {
            console.log("using prev data because of error") // debugging stuff
            return JSON.parse(cachedData)
        }

        return null // if nothings wroking
    }


}