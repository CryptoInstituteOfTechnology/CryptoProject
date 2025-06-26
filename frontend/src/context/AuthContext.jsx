import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "../supabaseClient";

// the point is to share state of what session the current user is in, if they are logged in, and their info 
// how you know who is who in application and give permissions
//followed tutorial, naming may be unconvetional and unlike rest of project
const AuthContext = createContext()

export const AuthContextProvider = ({ children }) => {

    const [session, setSession] = useState(undefined)


    //signup function
    //async dont want to wait for user to be processed befoe continuing
    const signUpNewUser = async (email, password) => {

        // send supabase a new user to sign up
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        if (error) {
            console.error("there was a problem signing up", error)
            return ({ success: false, error })
        }

        return { success: true, data } //return that data was processed
    }

    const logInUser = async ( email, password ) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            })

            if (error) {
                console.error('sign in error occured', error)
                return { success: false, error: error.message }
            }

            //for debug, return true if works
            console.log("login success", data)
            return { success: true, data }


        } catch (error) {
            console.error("error occured", error)
        }

    }
    //listen  for state change, only run once when page is loaded, loads what type of session user is in

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })

        // _event because its ignored, we just need one because obj expects one
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    //sign out function
    const signOut = () => {
        //extract error if issues
        const { error } = supabase.auth.signOut()
        if (error) {
            console.error(error)
        }

    }




    return (
        <AuthContext.Provider value={{signUpNewUser, signOut,session,logInUser }}>
            {children}
        </AuthContext.Provider>
    )

}


export const UserAuth = () => {
    return useContext(AuthContext)
}