"use client"

import { Refresh, Search } from "@mui/icons-material"
import { Alert, Box, Button, ButtonBase, CircularProgress, Grid, InputAdornment, Skeleton, TextField, Typography } from "@mui/material"
import { FormEvent, useState } from "react"

const Page = () => {

    const [searchInput, setSearchinput] = useState('')
    const [loading, setLoading] = useState(false)
    const handleChangeInput = () => {
        setSearchinput(searchInput)
    }
    const handleKeyup = () => {}

    return(
        <Box sx={{ my: 3}}>
            <Box sx={{mb:3, display: 'flex', alignItems: 'center', justifyContent:'space-between'}}>
                <Box sx={{ display:'flex', alignItems:'center'}}>
                    <Typography
                        component="h5"
                        variant="h5"
                        sx={{ color:'#555', mr:{xs:2, md:4}}}
                    >
                        Pedidos
                    </Typography>
                    { loading &&
                        <CircularProgress size={24} sx={{ padding: {xs:1, sm:3}}}/>
                    }
                    {!loading &&
                        <Button
                            size="small"
                            sx={{ paddingY:0, justifyContent:{xs: 'flex-start', md:'center'}}}
                        >
                            <Refresh/>
                            <Typography
                                component="div"
                                sx={{ color:'#242424', display: {xs:'none', sm:'block'}}}
                            >
                                Atualizar
                            </Typography>
                        </Button>
                    }
                </Box>

                <TextField
                    value={searchInput}
                    onChange={handleChangeInput}
                    onKeyUp={handleKeyup}
                    placeholder="Pesquisar pedido"
                    InputProps={{
                        endAdornment:(
                            <InputAdornment position="end">
                                <Search/>
                            </InputAdornment>
                        )
                    }}
                />
            </Box>


            <Grid container spacing={3} columns={{xs:1, sm:2, md:4}}>
                {loading &&
                    <>
                        <Grid item xs={1}>
                            <Skeleton variant="rectangular" height={220}/>
                        </Grid>
                        <Grid item xs={1}>
                            <Skeleton variant="rectangular" height={220}/>
                        </Grid>
                        <Grid item xs={1}>
                            <Skeleton variant="rectangular" height={220}/>
                        </Grid>
                        <Grid item xs={1}>
                            <Skeleton variant="rectangular" height={220}/>
                        </Grid>
                        <Grid item xs={1}>
                            <Skeleton variant="rectangular" height={220}/>
                        </Grid>
                    </>
                }
            </Grid>
        </Box>
    )
}

export default Page