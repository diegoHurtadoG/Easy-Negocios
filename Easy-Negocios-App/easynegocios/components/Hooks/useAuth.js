import React, { createContext, useContext } from 'react';
import * as Google from "expo-google-app-auth";
import { androidClientId, iosClientId } from '@env';


const AuthContext = createContext({});

const config = {
    androidClientId: androidClientId,
    iosClientId: iosClientId,
    scopes: ["profile", "email"],
    permissions: ["public_profile", "email"]
}

export const AuthProvider = ({ children }) => {

    const singInWithGoogle = async () => {
        await Google.logInAsync(config).then(async (logInResult) => {
            if (logInResult.type === "success") {
                // login
            }
        });
    };

    return (
        <AuthContext.Provider value={{
            user: null,
            singInWithGoogle
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export default function useAuth() {
    return useContext(AuthContext);
}