import { dateformat } from "@/libs/dateFormat"
import { Order } from "@/types/Order"
import { OrderStatus } from "@/types/OrderStatus"
import { Box, Button, MenuItem, Select, SelectChangeEvent, Typography } from "@mui/material"

type Props = {
    item:Order
    onChangeStatus: (id:number, status: OrderStatus) => void
}

export const OrderItem = ({ item, onChangeStatus }:Props) => {

    const getStackUtilityClass = (status:OrderStatus) => {
        const typeStatus = {
            preparing: '#2787BA',
            sent:'#27BA3A',
            delivered:'#999999'
        }

        return typeStatus[status]
    }

    const handleStatuschange = (event: SelectChangeEvent) => {
        onChangeStatus(item.id, event.target.value as OrderStatus)
    }

    return(
        <Box sx={{
            border: '1px solid #eee',
            color:'#fff',
            borderRadius: 2,
            overflow: 'hidden'
        }}
        >
            <Box sx={{
                display: 'flex',
                justifyContent:'space-between',
                alignItems: 'center',
                p:1,
                backgroundColor:getStackUtilityClass(item.status)
            }}>
                <Box>
                    <Typography component='p'>{dateformat(item.orderDate)}</Typography>
                    <Typography component='p'>{item.userName}</Typography>
                    <Button size='small' sx={{ color:'#fff', p:0, mt:2}}>Imprimir</Button>
                </Box>
                <Box>
                    <Typography>#{item.id}</Typography>
                </Box>
            </Box>
            <Box>
                <Select
                value={item.status}
                variant='filled'
                fullWidth
                onChange={handleStatuschange}
                >
                    <MenuItem value='preparing'>Preparando</MenuItem>
                    <MenuItem value='sent'>Enviando</MenuItem>
                    <MenuItem value='delivered'>Entregue</MenuItem>
                </Select>
            </Box>
            <Box sx={{ backgroundColor:'#fff', p:1}}>
                {item.products.map((product, index) => (
                    <Typography
                        component='p'
                        sx={{p:1,color:'#242424', fontWeight:'bold', borderBottom:'1px solid #ccc'}}
                        key={index}
                    >{`${product.qtd}x ${product.product.name}`}</Typography>
                ))}
            </Box>
        </Box>
    )
}