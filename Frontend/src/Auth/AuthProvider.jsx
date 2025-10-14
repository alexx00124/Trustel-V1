import { useContext, createContext, useState, useEffect } from "react";
import { API_URL } from "./AuthConstants";

const AuthContext = createContext({
    isAuthenticated: false,
    getAccessToken: () => {},
    setAccessTokenAndRefreshToken: (_accessToken, _RefreshToken) => {},
    getRefreshToken: () => {},
    saveuser: (_userData) => undefined,
    signout: () => {},
    
});

export function AuthProvider({ children }) {
    const [user, setUser] = useState();
    const [accessToken, setAccessToken] = useState("");
    const [RefreshToken, setRefreshToken] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsloading] = useState(true);

    function getAccessToken(){
        return accessToken;
    }

function saveUser(Data) {
     const { accessToken, RefreshToken, rol } = data.body;
    setAccessTokenAndRefreshToken(accessToken, RefreshToken);
    setUser({ rol });
    setIsAuthenticated(true);
}

function setAccessTokenAndRefreshToken(accessToken, RefreshToken) {
    console.log("setAccesseTokenAndRefreshToken", accessToken, RefreshToken);
    setAccessToken(accessToken);
    setRefreshToken(RefreshToken);

    localStorage.setItem("Token", JSON.stringify,({RefreshToken}));
}

function getRefreshToken() {
    if (RefreshToken) {
        return RefreshToken;
    }

    const token = localStorage.getItem("token");
    if (token) { 
        const {RefreshToken} = JSON.parse(Token);
        setRefreshToken(RefreshToken);
        return RefreshToken;

    }
    return null;
}

function getUser () {
    return user;
}

function signout () {
    localStorage.removeItem("token");
    getAccessToken("");
    setRefreshToken("");
    setUser(undefined);
    setIsAuthenticated(false);
}

async function checkAuth() {
    try {
        if (accessToken) {
            const userInfo = await retrieveUserInfo(accessToken);
            setUser ({rol: userInfo.rol});
            setAccessToken (accessToken);
            setIsAuthenticated (true);
            setIsloading (false);
        } else {
            const token = localStorage.getItem("token");
            if (token) {
                console.log("useEffect: token", token);
                const RefreshToken =JSON.parse(token).RefreshToken;

                getAccessToken(RefreshToken)
                .then(async (newToken) => {
                const userInfo  = await retrieveUserInfo(newToken);
                setUser({ rol: userInfo.rol });
                setAccessToken(newToken);
                setIsAuthenticated(true);
                setIsloading(false);
                })
                .catch((error) => {
                    console.log(error);
                    setIsloading(false);
                });
            } else {
                setIsloading(false);
            }
        }
    } catch (error) {
        setIsloading (false);
    }
}

useEffect(() =>{
    checkAuth();
}, []);

return ( 
    <AuthContext.Provider value={{
        isAuthenticated,
        getAccessToken,
        setAccessTokenAndRefreshToken,
        getRefreshToken,
        saveUser,
        getUser,
        signout,
        isLoading
    }}>
        {children}
    </AuthContext.Provider>
);

async function retrieveUserInfo(accessToken) {
    try {
        const response = await fetch (`${API_URL}/User`, {
        method: "GET",
        headers: {
            "content-type": "application/json",
            authorization: `Bearer ${accessToken}`,
        },
        });

        if (response.ok) {
            const json = await response.json();
            console.log(json);
            return json.body;
        }
    } catch (error) { 
        console.log(error);
    }
}
}

 export const useAuth = () => useContext(AuthContext);