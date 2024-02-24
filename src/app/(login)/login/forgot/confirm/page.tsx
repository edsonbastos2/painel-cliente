"use client"

import { api } from "@/libs/api"
import { Alert, Box, Link as MuiLink } from "@mui/material"
import Link from "next/link"

const Page = () => {

    

    return(
        <>
            <Box component="div" sx={{width: '100%', display:'flex', flexDirection:'column', gap:2}}>
                <Alert variant="standard" severity="error" sx={{mt:2}}>"Link expirado, refaça o procedimento. "</Alert>
                <MuiLink href="/login/forgot" component={Link} variant="button">Esqueci minha senha</MuiLink>
            </Box>
        </>
    )
}

export default Page