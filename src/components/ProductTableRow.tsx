import { Product } from "@/types/Product"
import { Delete, Edit } from "@mui/icons-material"
import { Box, Button, TableCell, TableRow } from "@mui/material"

type Props = {
    item: Product
    onEdit: (product:Product) => void
    onDelete: (product:Product) => void
}

export const ProductTableRow = ({ item, onDelete, onEdit}:Props) => {

    return(
        <>
            <TableRow hover>
                <TableCell sx={{width:50, display:{xs:'none', md:'table-cell'}}}>
                    {item.id}
                </TableCell>
                <TableCell sx={{ width: {xs:50, md:100}}}>
                    <img src={item.image} alt={item.name} width={'100%'} />
                </TableCell>
                <TableCell>
                    {item.name}
                    <Box sx={{display: {md:'none'}}}>
                        R$ {item.price.toFixed(2)}
                    </Box>
                </TableCell>
                <TableCell sx={{display:{xs:'none', md:'table-cell'}}}>R$ {item.price.toFixed(2)}</TableCell>
                <TableCell sx={{display:{xs:'none', md:'table-cell'}}}>{item.category.name}</TableCell>
                <TableCell sx={{ width: {xs:50, md:130}}}>
                    <Button onClick={() => onEdit(item)}><Edit/></Button>
                    <Button onClick={() => onDelete(item)} color="error"><Delete/></Button>
                </TableCell>
            </TableRow>
        </>
    )
}