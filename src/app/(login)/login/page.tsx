"use client"

import { api } from "@/libs/api"
import { Alert, Box, Button, Link as MuiLink, TextField, Typography } from "@mui/material"
import Link from "next/link"
import { FormEvent, useState } from "react"
import { AuthContext } from '@/contexts/AuthContext'
import { useContext } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from "next/navigation"

const Page = () => {

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [emailField, setEmailField] = useState('')
    const [passwordField, setPasswordField] = useState('')

    const router = useRouter()


    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if(!emailField || !passwordField) {
            setError('Preencha o e-mail e senha')
            return
        }

        setError('')

        setLoading(true)
        const result = await signIn('credentials', {
            email: emailField,
            password: passwordField,
            redirect: false
        })
        setLoading(false)

        if(result?.error) {
            setError('Erro ao realizar login')
            console.error(result.error)
            return
        }

        router.replace('/pedidos')
    }

    return(
        <>
            <Typography
             component="p"
             sx={{ textAlign: 'center', mt: 2, mb:2, color:'#555'}}
            >Digite suas credenciais para entrar no painel administrativo</Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{width: '100%'}}>
                <Box sx={{ display: 'flex', flexDirection:'column', gap:2}}>
                    <TextField
                        label="Digite seu e-mail"
                        name="email"
                        fullWidth
                        autoFocus
                        onChange={e => setEmailField(e.target.value)}
                        value={emailField}
                        disabled={loading}
                    />
                    <TextField
                        label="Digite sua senha"
                        name="password"
                        type="password"
                        fullWidth
                        sx={{ mb:3}}
                        onChange={e => setPasswordField(e.target.value)}
                        value={passwordField}
                        disabled={loading}
                    />
                </Box>
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                >
                    { loading ? 'Carregando...' : 'Entrar'}
                </Button>

                { error &&
                    <Alert variant="filled" severity="error" sx={{mt:2}}>{error}</Alert>
                }

                <Box sx={{mt:3}}>
                    <MuiLink href="/login/forgot" variant="body2" component={Link}>Esqueceu sua senha?</MuiLink>
                </Box>
            </Box>
        </>
    )
}

export default Page