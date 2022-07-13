import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { androidClientId, iosClientId } from '@env';
import { auth } from '../../firebase';


const AuthContext = createContext({});

const config = {
    androidClientId: androidClientId,
    iosClientId: iosClientId,
    scopes: ["profile", "email"],
    permissions: ["public_profile", "email"]
}

export const AuthProvider = ({ children }) => {
    const [error, setError] = useState(null);
    const [user, setUser] = useState(null);
    const [loadingInitial, setLoadingInitial] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(
        () =>
            auth.onAuthStateChanged(user => {
                if (user) {
                    setUser(user);
                } else {
                    setUser(null);
                }

                setLoadingInitial(false);
            }),
        []

    )


    const signInWithGoogle = async () => {
        setLoading(true);
        /*
                await Google.logInAsync(config).then(async (logInResult) => {
                    if (logInResult.type === "success") {
                        // login
                        const { idToken, accesToken } = logInResult;
                        const credential = GoogleAuthProvider.credential(idToken, accesToken);
        
                        await signInWithCredential(auth, credential);
                    }
        
                    return Promise.reject();
                })
                    .catch(error => setError(error))
                    .finally(() => setLoading(false)); */
    };


    const logout = () => {
        setLoading(true);
        auth.signOut()
            .then(() => {
                console.log("Logged Out")
            })
            .catch(error => setError(error))
            .finally(setLoading(false))

    }

    const handleEmailSignUp = (email, password) => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user();
                console.log('Registered as: ', user.email);
            })
            .catch(error => setError(error))
    }

    const handleEmailLogin = (email, password) => {
        auth
            .signInWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user();
                console.log('Logged as: ', user.email);
            })
            .catch(error => setError(error))
    }

    const memoedValue = useMemo(() => ({
        user,
        loading,
        error,
        handleEmailSignUp,
        handleEmailLogin,
        logout,
    }), [user, loading, error])

    return (
        <AuthContext.Provider value={memoedValue}>
            {loadingInitial ? null : children}
        </AuthContext.Provider>
    );
}

export default function useAuth() {
    return useContext(AuthContext);
}