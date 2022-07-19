import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import * as Google from "expo-google-app-auth";
import { androidClientId, iosClientId } from '@env';
import { GoogleAuthProvider, onAuthStateChanged, signInWithCredential, signOut } from 'firebase/auth';
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
    const [loadingInitial, setLoadingInitial] = useState(true);
    const [loading, setLoading] = useState(false);

    useEffect(
        () =>
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    // Logged In
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
            .finally(() => setLoading(false));
    };

    const logout = () => {
        setLoading(true);

        signOut(auth)
            .catch(error => setError(error))
            .finally(setLoading(false))
    }

    const memoedValue = useMemo(() => ({
        user,
        loading,
        error,
        signInWithGoogle,
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