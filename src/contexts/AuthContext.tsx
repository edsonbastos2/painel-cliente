import { createContext, ReactNode, useState} from 'react'
import { api } from '@/libs/apiClient'
import { destroyCookie, setCookie, parseCookies } from 'nookies'
import Router from 'next/router'

type AuthContextData = {
    user: UserProps | undefined
    isAuthenticated: boolean
    signIn: (credentials:SignInProps) => Promise<void>
    signOut: () => void
}

type UserProps = {
    id: string
    name: string
    email: string
}

type SignInProps = {
    email: string
    password: string
}

export const AuthContext = createContext({} as AuthContextData)

type Props = {
    children: ReactNode
}

export const signOut = () => {
    try {
        destroyCookie(undefined, '@delivered.token')
        Router.push('/login')
    } catch (error) {
        console.log('erro ao deslogar: ',{ error})
    }
}

export function AuthProvider({children}:Props) {

    const [user, setUser] = useState<UserProps>()
    const isAuthenticated = !!user

    const signIn = async({email, password}:SignInProps) => {
        const body = {email, password}
        try {
            const resp = await api.post('/login',{
                body
            })

            // console.log(resp.data)
            const { id, name, token } = resp.data

            setCookie(undefined, '@delivered.token', token, {
                maxAge: 60 * 60 * 24 * 30,
                path:'/'
            })

            setUser({id, name, email})

            api.defaults.headers['Authorization'] = `Bearer ${token}`

            Router.push('/pedidos')
        } catch (error) {
            console.log('erro ao logar: ', error)
        }
    }

    return(
        <AuthContext.Provider value={{user, isAuthenticated, signIn, signOut}}>
            { children }
        </AuthContext.Provider>
    )
}