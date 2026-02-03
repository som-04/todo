import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../lib/axios";

const AuthContext = createContext(null);

const storageKey = "todo_auth";

const readStoredAuth = () => {
    const raw = localStorage.getItem(storageKey);
    if (!raw) {
        return { user: null, token: null };
    }

    try {
        const parsed = JSON.parse(raw);
        return {
            user: parsed.user || null,
            token: parsed.token || null,
        };
    } catch (error) {
        return { user: null, token: null };
    }
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const stored = readStoredAuth();
        setUser(stored.user);
        setToken(stored.token);
    }, []);

    const saveAuth = (nextUser, nextToken) => {
        setUser(nextUser);
        setToken(nextToken);
        localStorage.setItem(
            storageKey,
            JSON.stringify({ user: nextUser, token: nextToken }),
        );
    };

    const clearAuth = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem(storageKey);
    };

    const signup = async (email, password) => {
        const response = await api.post("/auth/register", { email, password });
        return response.data;
    };

    const login = async (email, password) => {
        const response = await api.post("/auth/login", { email, password });
        const { token: nextToken, user: nextUser } = response.data;
        saveAuth(nextUser, nextToken);
        return response.data;
    };

    const logout = () => {
        clearAuth();
    };

    const value = useMemo(
        () => ({
            user,
            token,
            signup,
            login,
            logout,
        }),
        [user, token],
    );

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }
    return context;
};
