"use client"

import { Refresh, Search } from "@mui/icons-material"
import { Alert, Box, Button, ButtonBase, InputAdornment, TextField, Typography } from "@mui/material"
import { FormEvent, useState } from "react"

const Page = () => {

    const [searchInput, setSearchinput] = useState('')
    const handleChangeInput = () => {
        setSearchinput(searchInput)
    }
    const handleKeyup = () => {}

    return(
        <Box sx={{ my: 3}}>
            <Box sx={{ display: 'flex', justifyContent:'space-between'}}>
                <Box sx={{ display:'flex', alignContent:'center'}}>
                    <Typography
                        component="h5"
                        variant="h5"
                        sx={{ color:'#555', mr:4, lineHeight: {xs:2.334}}}
                    >
                        Pedidos
                    </Typography>
                    <Button size="small" variant="contained" sx={{ justifyContent:{xs: 'flex-start', md:'center'}}}>
                        <Refresh/>
                        <Typography component="div" sx={{ color:'#FFF', display: {xs:'none', sm:'block'}}}>
                            Atualizar
                        </Typography>
                    </Button>
                </Box>

            <TextField
                value={searchInput}
                onChange={handleChangeInput}
                onKeyUp={handleKeyup}
                placeholder="Pesquisar pedido"
                variant="standard"
                InputProps={{
                    endAdornment:(
                        <InputAdornment position="end">
                            <Search/>
                        </InputAdornment>
                    )
                }}
            />
            </Box>
        </Box>
    )
}

export default Page