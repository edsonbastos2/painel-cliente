"use client"

import { OrderItem } from "@/components/OrderItem"
import { api } from "@/libs/api"
import { dateformat } from "@/libs/dateFormat"
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
    const [printOrder, setPrintOrder] = useState<Order | null>(null)

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

    const handlePrintAction = (order:Order) => {

        setPrintOrder(order)

        setTimeout(() => {
            if(window) window.print()
        }, 200)
    }
    

    return(
        <>
            <Box sx={{ my: 3, displayPrint:'none'}}>
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
                                onPrint={handlePrintAction}
                            />
                        </Grid>
                    ))
                    }
                </Grid>
            </Box>
            <Box sx={{display: 'none', displayPrint:'block'}}>
                { printOrder &&
                    <>
                        <Typography component='h5' variant='h5'>Pedido</Typography>
                        <Box>ID: #{printOrder.id}</Box>
                        <Box>Data: {dateformat(printOrder.orderDate)}</Box>
                        <Box>Cliente: {printOrder.userName}</Box>
                        
                        <Typography component='h5' variant='h5'>Pagamento</Typography>
                        <Box>Tipo de pagamento: {printOrder.paymentType === 'card' ? 'Cartão' : 'Dinheiro'}</Box>
                        <Box>Subtotal: {printOrder.subtotal}</Box>
                        <Box>Taxa de entrega: {printOrder.shippingPrice.toFixed(2)}</Box>
                        { printOrder.cupomDiscount && <Box>Desconto: -R$ {printOrder.cupomDiscount.toFixed(2)}</Box>}
                        <Box>Total: R$ {printOrder.total.toFixed(2)}</Box>

                        <Typography component='h5' variant='h5'>Endereço</Typography>
                        <Box>Rua: {printOrder.shippingAddress.address}</Box>
                        <Box>Número: {printOrder.shippingAddress.number}</Box>
                        <Box>Complemento: {printOrder.shippingAddress.complement}</Box>
                        <Box>Cep: {printOrder.shippingAddress.cep}</Box>
                        <Box>Bairro: {printOrder.shippingAddress.neighborhood}</Box>
                        <Box>Cidade: {printOrder.shippingAddress.city}</Box>
                        <Box>Estado: {printOrder.shippingAddress.state}</Box>
                    </>
                }
            </Box>
        </>
    )
}

export default Page