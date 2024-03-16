"use client"

import { OrderItem } from "@/components/OrderItem"
import { ProductEditDialog } from "@/components/ProductEditDialog"
import { ProductTableRow } from "@/components/ProductTableRow"
import { ProductTableSkeleton } from "@/components/ProductTableSkeleton"
import { api } from "@/libs/api"
import { dateformat } from "@/libs/dateFormat"
import { Category } from "@/types/Category"
import { Order } from "@/types/Order"
import { OrderStatus } from "@/types/OrderStatus"
import { Product } from "@/types/Product"
import {  Refresh, Search } from "@mui/icons-material"
import { Alert, Box, Button, ButtonBase, CircularProgress, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, InputAdornment, Skeleton, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material"
import { FormEvent, KeyboardEvent, useEffect, useState } from "react"

const Page = () => {

    const [loading, setLoading] = useState(false)
    const [produts, setProduts] = useState<Product[]>([])

    const [categories, setCategoris] = useState<Category[]>([])
    const [showDialog, setShowdialog] = useState(false)

    const [loadingDelete, setLoadingDelete] = useState(false)
    const [productOnDelete, setProductOnDelete] = useState<Product>()

    const [editDialogOpen, seteditDialogOpen] = useState(false)
    const [productToEdit, setProductToEdit] = useState<Product>()
    const [loadingRditDialog, setLoadinEditDialog] = useState(false)

    useEffect(() => {
        getProducts()
    },[])


    const getProducts = async() => {
        setLoading(true)
        setProduts(await api.getProducts())
        setCategoris(await api.getCategories())
        setLoading(false)
    }

    const handleDelete = (item:Product) => {
        setShowdialog(true)
        setProductOnDelete(item)
    }

    const handleDeletProduct = async() => {
        setLoadingDelete(true)
        if(productOnDelete) {
            await api.deleteProduct(productOnDelete?.id)
            setLoadingDelete(false)
            setShowdialog(false)
            getProducts()
        }
    }

    const handleclose = () => {
        seteditDialogOpen(false)
    }

    // Edit/New Product
    const handleNewProduct = () => {
        setProductToEdit(undefined)
        seteditDialogOpen(true)

    }

    const handleEditProduct = (item:Product) => {
        console.log('Product: ', item)
        setProductToEdit(item)
        seteditDialogOpen(true)
    }

    const handleSaveProductDialog = () => {}

    return(
        <>
            <Dialog
                open={showDialog}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">Deletar Produto?</DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Você tem certeza que deseja deletar esse produto?
                </DialogContentText>
                <DialogActions>
                    <Button disabled={loadingDelete} variant="contained" onClick={() => setShowdialog(false)} autoFocus>Não</Button>
                    <Button disabled={loadingDelete} variant="outlined" color="error" onClick={handleDeletProduct} >Sim</Button>
                </DialogActions>
                </DialogContent>
            </Dialog>
            <ProductEditDialog
                open={editDialogOpen}
                onClose={handleclose}
                onSave={handleSaveProductDialog}
                categories={categories}
                product={productToEdit}
                disabled={loadingRditDialog}
            />
            <Box sx={{ my: 3}}>
                <Box sx={{mb:3, display: 'flex', alignItems: 'center', justifyContent:'space-between'}}>
                    <Typography sx={{color:'#242424'}} component='h5' variant='h5'>Produtos</Typography>
                    <Button onClick={handleNewProduct} variant="outlined">Novo Produto</Button>
                </Box>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell sx={{width:50, display:{xs:'none', md:'table-cell'}}}>ID</TableCell>
                            <TableCell sx={{ width: {xs:50, md:100}}}>Imagem</TableCell>
                            <TableCell>Nome</TableCell>
                            <TableCell sx={{display:{xs:'none', md:'table-cell'}}}>Preço</TableCell>
                            <TableCell sx={{display:{xs:'none', md:'table-cell'}}}>Categoria</TableCell>
                            <TableCell sx={{ width: {xs:50, md:130}}}>Ações</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { loading && 
                            <>
                                <ProductTableSkeleton/>
                                <ProductTableSkeleton/>
                                <ProductTableSkeleton/>
                            </>
                        
                        }

                        { !loading &&
                        
                            produts.map((item) => (
                                <ProductTableRow
                                key={item.id}
                                    item={item}
                                    onEdit={handleEditProduct}
                                    onDelete={handleDelete}
                                />
                            ))
                        }
                    </TableBody>
                </Table>
            </Box>
        </>
    )
}

export default Page