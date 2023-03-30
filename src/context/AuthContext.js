// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

// ** Defaults
const defaultProvider = {
    user: null,
    loading: true,
    setUser: () => null,
    setLoading: () => Boolean,
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    register: () => Promise.resolve()
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
    // ** States
    const [user, setUser] = useState(defaultProvider.user)
    const [loading, setLoading] = useState(defaultProvider.loading)

    // ** Hooks
    const router = useRouter()
    useEffect(() => {
        const initAuth = async () => {
            const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
            if (storedToken) {
                setLoading(true)
                await axios
                    .get(authConfig.meEndpoint, {
                        headers: {
                            Authorization: storedToken
                        }
                    })
                    .then(async response => {
                        setLoading(false)
                        setUser({ ...response.data.userData })
                    })
                    .catch(() => {
                        localStorage.removeItem('userData')
                        localStorage.removeItem('refreshToken')
                        localStorage.removeItem('accessToken')
                        setUser(null)
                        setLoading(false)
                        if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
                            router.replace('/login')
                        }
                    })
            } else {
                setLoading(false)
            }
        }
        initAuth()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleLogin = (params, errorCallback) => {
        const authParams = { username: params.email, password: params.password }
        axios
            .post(authConfig.loginEndpoint, authParams)
            .then(async response => {
                params.rememberMe
                    ? window.localStorage.setItem(authConfig.storageTokenKeyName, response.data.accessToken)
                    : null
                const returnUrl = router.query.returnUrl
                setUser({ ...response.data.userData })
                params.rememberMe ? window.localStorage.setItem('userData', JSON.stringify(response.data.userData)) : null
                const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/home'
                router.replace(redirectURL)
            })
            .catch(err => {
                if (errorCallback) errorCallback(err)
            })
    }

    const handleLogout = () => {
        setUser(null)
        window.localStorage.removeItem('userData')
        window.localStorage.removeItem(authConfig.storageTokenKeyName)
        router.push('/login')
    }

    const handleRegister = (params, errorCallback) => {
        axios
            .post(authConfig.registerEndpoint, params)
            .then(res => {
                if (res.data.error) {
                    if (errorCallback) errorCallback(res.data.error)
                } else {
                    handleLogin({ email: params.email, password: params.password })
                }
            })
            .catch(err => (errorCallback ? errorCallback(err) : null))
    }

    const values = {
        user,
        loading,
        setUser,
        setLoading,
        login: handleLogin,
        logout: handleLogout,
        register: handleRegister
    }

    return <AuthContext.Provider value={ values }>{ children }</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
