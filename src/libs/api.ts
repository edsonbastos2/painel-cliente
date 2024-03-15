import { Order } from "@/types/Order"
import { OrderStatus } from "@/types/OrderStatus"
import { Product } from "@/types/Product"

const tempProduct = {
    id: 888,
    image: '',
    category:{
        id:77,
        name:'Burgers'
    },
    name:'Muito Louco',
    price:24.56,
    description:'Bacon, Queijo, salada'
} as Product

export const api = {

    login: async(email: string, password: string):Promise<{error:string, token?:string}> => {

        return new Promise(resolve => {
            setTimeout(() => {
                if( email !== 'edson@gmail.com' || password !== '123456') {
                    resolve({
                        error: 'E-mail e/ou senha incorreto'
                    })
                } else {
                    resolve({
                        error:'', 
                        token: '123456'
                    })
                }
            }, 1000)
        })
    },

    forgotPassword: (email: string):Promise<{error:string, token?:string}> => {

        return new Promise( resolve => {
            setTimeout(() => {
                if(email) {
                    resolve({
                        error:''
                    })
                }
            }, 1000)
        })
    },

    redefinePassword: (password: string, token?: string):Promise<{error:string, token?:string}> => {

        return new Promise( resolve => {
            setTimeout(() => {
                if(password) {
                    resolve({
                        error:''
                    })
                }
            }, 1000)
        })
    },

    getOrders: async():Promise<Order[]> => {

        return new Promise( resolve => {
            setTimeout(() => {
                const orders = [] as Order[]
                const status = ['delivered', 'preparing', 'sent'] as OrderStatus[]

                for(let i=0;i<6;i++) {
                    orders.push({
                        id: parseInt('22' + i),
                        status: status[Math.floor(Math.random() * 3)],
                        orderDate:'2023-02-12 19:30',
                        userId: '1',
                        userName: 'Pedro',
                        shippingAddress: {
                            id: 99,
                            cep: '999999999',
                            address: 'Rua ABC',
                            number: '1233',
                            neighborhood: 'Algum lugar',
                            city: 'Fortaleza',
                            state: 'Ceará',
                            complement: ''
                        },
                        shippingPrice: 12,
                        changeValue:0,
                        cupom:'AA',
                        cupomDiscount: 2,
                        paymentType:'cash',
                        products: [
                            {
                                id: 111,
                                qtd: 2,
                                product: tempProduct,
                            },
                            {
                                id: 3333,
                                qtd: 3,
                                product: {...tempProduct, id:345, name:'Burge Cabuloso'},
                            }
                        ],
                        subtotal: 99,
                        total: 120
                    })
                }

                resolve(orders)
            }, 1000)
        })
    },

    changeOrderstatus: async(id:number, status: OrderStatus) => {
        return true
    }
}