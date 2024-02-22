"use client"

import { api } from "@/libs/api"
import { Alert, Box, Button, TextField, Typography } from "@mui/material"
import { FormEvent, useState } from "react"

const Page = () => {

    const [info, setInfo] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [passwordField, setPasswordField] = useState('')
    const [passwordField2, setPasswordField2] = useState('')

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        if(!passwordField || !passwordField2) {
            setError('Preencha as senhas')
            return
        }

        if(passwordField !== passwordField2) {
            setError('Senhas diferentes!')
            return
        }

        setError('')
        setLoading(true)
        setInfo('')
        const result = await api.redefinePassword(passwordField)
        setLoading(false)
        if(result.error) {
            setError(result.error)
        } else {
            setPasswordField('')
            setPasswordField2('')
            setInfo('Senha redefinida com sucesso')
        }
    }

    return(
        <>
            <Typography
             component="p"
             sx={{ textAlign: 'center', mt: 2, mb:2, color:'#555'}}
            >Digite suas credenciais para entrar no painel administrativo</Typography>

            <Box component="form" onSubmit={handleSubmit} sx={{width: '100%'}}>
                <Box sx={{ display: 'flex', flexDirection:'column', gap:2, mb:3}}>
                    <TextField
                        label="Digite sua senha"
                        name="password"
                        type="password"
                        fullWidth
                        autoFocus
                        onChange={e => setPasswordField(e.target.value)}
                        value={passwordField}
                        disabled={loading}
                    />
                    <TextField
                        label="Confirme sua senha"
                        name="password2"
                        type="password"
                        fullWidth
                        autoFocus
                        onChange={e => setPasswordField2(e.target.value)}
                        value={passwordField2}
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
                    <Alert variant="standard" severity="success" sx={{mt:2}}>{info}</Alert>
                }

            </Box>
        </>
    )
}

export default Page