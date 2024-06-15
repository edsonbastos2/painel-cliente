"use client"
import Header from '@/components/Header';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { Box, Container, Typography } from '@mui/material';
import { AuthProvider } from '@/contexts/AuthContext'
import { getServerSession } from 'next-auth';
import { nextAuthOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

type Props = {
    children: React.ReactNode
}


const Layout = async ({ children }:Props) => {
    const session = await getServerSession(nextAuthOptions)

    if(!session) {
        redirect('/login')
    }
    return(
        <html lang="pt-br">
            <body style={{ margin:0}}>
                <AuthProvider>
                    <Header/>
                    <Container component="section" maxWidth="lg">
                        {children}
                    </Container>
                </AuthProvider>
            </body>
        </html>
    )
}

export default Layout