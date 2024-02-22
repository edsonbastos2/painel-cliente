"use client"

import { api } from "@/libs/api"
import { Alert, Box, Button, TextField, Typography } from "@mui/material"
import { FormEvent, useState } from "react"

const Page = () => {

    const [info, setInfo] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [emailField, setEmailField] = useState('')
    const [passwordField, setPasswordField] = useState('')

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if(!emailField) {
            setError('Preencha o e-mail')
            return
        }

        setError('')
        setLoading(true)
        setInfo('')
        const result = await api.forgotPassword(emailField)
        setLoading(false)
        if(result.error) {
            setError(result.error)
        } else {
            setInfo('Enviamos um e-mail para redefinir sua senha.')
        }
    }

    return(
        <>
            <Typography
             component="p"
             sx={{ textAlign: 'center', mt: 2, mb:2, color:'#555'}}
            >Digite suas credenciais para entrar no painel administrativo</Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{width: '100%'}}>
                <Box sx={{ display: 'flex', flexDirection:'column', mb:3}}>
                    <TextField
                        label="Digite seu e-mail"
                        name="email"
                        fullWidth
                        autoFocus
                        onChange={e => setEmailField(e.target.value)}
                        value={emailField}
                        disabled={loading}
                    />
                </Box>
                <Button
                    type="submit"
                    variant="contained"
                    fullWidth
                    disabled={loading}
                >
                    { loading ? 'Carregando...' : 'Recuperar senha'}
                </Button>

                { error &&
                    <Alert variant="standard" severity="error" sx={{mt:2}}>{error}</Alert>
                }

                { info &&
                    <Alert variant="standard" severity="info" sx={{mt:2}}>{info}</Alert>
                }

            </Box>
        </>
    )
}

export default Page