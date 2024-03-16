import { Category } from "@/types/Category"
import { Product } from "@/types/Product"
import { Box, Button, Dialog, DialogContent, DialogTitle, IconButton, Input, InputLabel, MenuItem, Select, TextField, } from "@mui/material"
import CloseIcon from '@mui/icons-material/Close';
import { FormEvent } from "react"

type Props = {
    open: boolean
    onClose: () => void
    onSave: (event: FormEvent<HTMLFormElement>) => void
    product?: Product
    categories: Category[]
    disabled?: boolean
}


export const ProductEditDialog = ({ open, onClose, product, categories, onSave, disabled}:Props) => {

    const handleformsubmit = (event: FormEvent<HTMLElement>) => {
        event.preventDefault()
    }

    return(
        <Dialog open={open} onClose={onClose} fullWidth>
            <Box sx={{ display:'flex', justifyContent: 'space-between' ,alignItems:'center'}}>
                <DialogTitle sx={{ mr: 8, p: 2 }}>{product ? 'Editar Produto' : 'Novo Produto'}</DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={onClose}
                    sx={{
                    position: 'absolute',
                    right: 8,
                    top: 10,
                    color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            </Box>
            <DialogContent>
                <Box component='form' onSubmit={handleformsubmit} encType='multipart/form-data'>
                    <Box sx={{mb:2}}>
                        <InputLabel variant="standard" htmlFor="imgField">Imagem</InputLabel>
                        <Input
                            id="imgField"
                            name="image"
                            type="file"
                            fullWidth
                            disabled={disabled}
                            inputProps={{ accept: 'image/*'}}
                        />
                    </Box>
                    <Box sx={{mb:2}}>
                        <InputLabel variant="standard" htmlFor="nameField">Nome</InputLabel>
                        <TextField
                        id="nameField"
                        variant="standard"
                        name="name"
                        defaultValue={product?.name}
                        required
                        fullWidth
                        disabled={disabled}
                        />
                    </Box>
                    <Box sx={{mb:2}}>
                        <InputLabel variant="standard" htmlFor="priceField">Preço (R$)</InputLabel>
                        <TextField
                        id="priceField"
                        variant="standard"
                        name="price"
                        type="number"
                        defaultValue={product?.price}
                        required
                        fullWidth
                        disabled={disabled}
                        />
                    </Box>
                    <Box sx={{mb:2}}>
                        <InputLabel variant="standard" htmlFor="categoriesField">Categorias</InputLabel>
                        <Select
                            id="categoriesField"
                            variant="standard"
                            name="category"
                            defaultValue={product?.category.id || categories[1]?.id}
                            required
                            fullWidth
                            disabled={disabled}
                        >
                            {categories.map((item) => (
                                <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
                            ))}
                        </Select>
                    </Box>
                    <Box sx={{mb:2}}>
                        <InputLabel variant="standard" htmlFor="descField">Descrição</InputLabel>
                        <TextField
                        id="descField"
                        variant="standard"
                        name="description"
                        defaultValue={product?.description}
                        multiline
                        rows={4}
                        required
                        fullWidth
                        disabled={disabled}
                        />
                    </Box>
                    <Box sx={{display:'flex', justifyContent:'flex-end'}}>
                        <Button disabled={disabled} onClick={onClose}>Cancela</Button>
                        <Button disabled={disabled} type="submit">Salvar</Button>
                    </Box>
                </Box>
            </DialogContent>
        </Dialog>
    )
}