import { createContext, useEffect, useState, useContext } from "react";
import { supabase } from "../supabaseClient";
// defines all signin , signout and login function
const AuthContext = createContext()
export const AuthContextProvider = ({ children }) => {
    const [session, setSession] = useState(undefined)

    // signup 
    const signUpNewUser = async (email, password) => {
        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        if (error) {
            return ({ success: false, error })
        }

        return { success: true, data }
    }

    // login user 
    const logInUser = async ( email, password ) => {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email: email,
                password: password,
            })

            if (error) {

                return { success: false, error: error.message }
            }
            return { success: true, data }
        } catch (error) {
        }
    }

    //listen  for state change, only run once when page is loaded, loads user in the session so they can access all routes
    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
        })
        supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })
    }, [])

    //sign out function
    const signOut = () => {
        //extract error if issues
        const { error } = supabase.auth.signOut()
        if (error) {
            throw error
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