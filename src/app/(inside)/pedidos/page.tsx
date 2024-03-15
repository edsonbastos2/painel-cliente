"use client"

import { OrderItem } from "@/components/OrderItem"
import { api } from "@/libs/api"
import { Order } from "@/types/Order"
import { OrderStatus } from "@/types/OrderStatus"
import { Refresh, Search } from "@mui/icons-material"
import { Alert, Box, Button, ButtonBase, CircularProgress, Grid, InputAdornment, Skeleton, TextField, Typography } from "@mui/material"
import { FormEvent, KeyboardEvent, useEffect, useState } from "react"

const Page = () => {

    const [searchInput, setSearchinput] = useState('')
    const [mensage, setMensage] = useState('')
    const [loading, setLoading] = useState(false)
    const [orders, setOrders] = useState<Order[]>([])
    const [filteredOrders, setFilteredOrders] = useState<Order[]>([])

    const getOrders = async() => {
        setSearchinput('')
        setOrders([])

        setLoading(true)
        const orders:Order[] = await api.getOrders()
        setOrders(orders)
        setLoading(false)
    }

    useEffect(() => {
        getOrders()
    },[])


    useEffect(() => {
        setSearchinput('')
        setFilteredOrders(orders)
    },[orders])

    const handleKeyup = (event: KeyboardEvent<HTMLInputElement>) => {
        if(event.code.toLowerCase() === 'enter') {
            if(searchInput !== '') {
                let newOrders = orders.filter((item) => item.id.toString() === searchInput )
                setFilteredOrders(newOrders)
            } else {
                setFilteredOrders(orders)
            }
        }
    }

    const handleChangestatus = async(id: number, status:OrderStatus) => {
        const newStatus = await api.changeOrderstatus(id, status)
        getOrders()
    }
    

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
                            onClick={getOrders}
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
                    onChange={e => setSearchinput(e.target.value)}
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

                {!loading &&  filteredOrders.map((item, index) =>(
                    <Grid key={index} item xs={1}>

                        <OrderItem
                            item={item}
                            onChangeStatus={handleChangestatus}
                        />
                    </Grid>
                ))
                }
            </Grid>
        </Box>
    )
}

export default Page