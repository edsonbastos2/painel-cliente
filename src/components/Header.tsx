import { AppBar, Box, Button, IconButton, Toolbar, Typography } from "@mui/material"
import { Menu } from '@mui/icons-material'
import Link from "next/link"
import { useRouter } from "next/navigation"

const Header = () => {
    const pagetitle = 'Painel Administrativo'
    const router = useRouter()

    const handleDrawerToggle = () => {}

    const handleLogout = () => {
        router.push('/login')
    }


    return(
        <>
            <AppBar component="nav" position="relative">
                <Toolbar>
                    <IconButton
                        color="inherit"
                        edge="start"
                        sx={{ display: {sm:'none'}}}
                        onClick={handleDrawerToggle}
                    >
                        <Menu />
                    </IconButton>
                    <Typography
                    component="div"
                    variant="h6"
                    sx={{ flexGrow:1, display:{ xs:'none', sm:'block'}}}
                    >
                        <Link
                            href="/"
                            style={{ color: '#fff', textDecoration:'none'}}
                        >
                            { pagetitle }
                        </Link>
                    </Typography>
                    <Box sx={{ display: {xs:'none', sm:'block'}}}>
                        <Link href="/pedidos" style={{ textDecoration:'none'}}>
                            <Button sx={{ color:'#fff'}}>Pedidos</Button>
                        </Link>
                        <Link href="/pedidos" style={{ textDecoration:'none'}}>
                            <Button sx={{ color:'#fff'}}>Produtos</Button>
                        </Link>
                        <Link href="/pedidos" style={{ textDecoration:'none'}}>
                            <Button sx={{ color:'#fff'}}>Categorias</Button>
                        </Link>
                        <Button sx={{ color:'#fff'}} onClick={handleLogout}>Sair</Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    )
}

export default Header