"use client"

import { OrderItem } from "@/components/OrderItem"
import { api } from "@/libs/api"
import { dateformat } from "@/libs/dateFormat"
import { Category } from "@/types/Category"
import { Order } from "@/types/Order"
import { OrderStatus } from "@/types/OrderStatus"
import { Product } from "@/types/Product"
import {  Refresh, Search } from "@mui/icons-material"
import { Alert, Box, Button, ButtonBase, CircularProgress, Grid, InputAdornment, Skeleton, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material"
import { FormEvent, KeyboardEvent, useEffect, useState } from "react"

const Page = () => {

    const [loading, setLoading] = useState(false)
    const [produts, setProduts] = useState<Product[]>([])
    const [categories, setCategoris] = useState<Category[]>([])

    useEffect(() => {
        getProducts()
    },[])


    const getProducts = async() => {
        setLoading(true)
        setProduts(await api.getProducts())
        setCategoris(await api.getCategories())
        setLoading(false)
    }

    return(
        <>
            <Box sx={{ my: 3}}>
                <Box sx={{mb:3, display: 'flex', alignItems: 'center', justifyContent:'space-between'}}>
                    <Typography sx={{color:'#242424'}} component='h5' variant='h5'>Produtos</Typography>
                    <Button variant="outlined">Novo Produto</Button>
                </Box>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{width:50, display:{xs:'none', md:'table-cell'}}}>ID</TableCell>
                            <TableCell>Imagem</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell>Preço</TableCell>
                            <TableCell sx={{display:{xs:'none', md:'table-cell'}}}>Categoria</TableCell>
                            <TableCell>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody></TableBody>
                </Table>
            </Box>
        </>
    )
}

export default Page