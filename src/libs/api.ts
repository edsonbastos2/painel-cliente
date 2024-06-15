import axios, { AxiosError} from 'axios'
import { parseCookies } from 'nookies'
import { AuthTokenError } from './errors/AuthTokenError'

import { signOut } from '@/contexts/AuthContext'

import { Category } from "@/types/Category"
import { Order } from "@/types/Order"
import { OrderStatus } from "@/types/OrderStatus"
import { Product } from "@/types/Product"

const tempProduct = {
    id: 888,
    image: 'https://imgs.search.brave.com/CAzYKIQGiO3oIcf1hR-VJqrurCbheqfGaDkHj12I6h0/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jbXMt/Y2RuLnNhaXBvcy5j/b20vYXNzZXRzLzIw/MjIvMDcvMjAvVGlw/b3MtZGUtaGFtYnVy/Z3Vlci1TQUlQT1Mt/c2lzdGVtYS1wYXJh/LXJlc3RhdXJhbnRl/cy0xLTFfdWlkXzYy/ZDgwNmFlYjVmMzku/anBn',
    category:{
        id:77,
        name:'Burges'
    },
    name:'Muito Louco',
    price:24.56,
    description:'Bacon, Queijo, salada'
} as Product


export const setupAPIClient = (ctx = undefined) => {
    let cookies = parseCookies(ctx)

    const api = axios.create({
        baseURL:'http://localhost:8089',
        headers: {
            Authorization: `Bearer ${cookies['@delivered.token']}`
        }
    })

    api.interceptors.response.use(response => {
        return response
    }, (error: AxiosError) => {
        if(error.response?.status === 401) {
            // Qualquer erro 401 deve deslogar o usuário
            if(typeof window !== undefined) {
            //  chamar a funcção para deslogar usuário
            signOut()
            } else {
                return Promise.reject(new AuthTokenError())
            }
        }

        return Promise.reject(error)
    })

    return api
}

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
    },

    getCategories: async():Promise<Category[]> => {
        const list = [
            {id:77, name:'Burges'},
            {id:78, name:'Bebidas'},
            {id:79, name:'Sobremesa'},
        ] as Category[]

        return new Promise( resolve => {
            setTimeout(() => {
                resolve(list)
            }, 200)
        })
    },

    getProducts: async():Promise<Product[]> => {
        const list = [
            {...tempProduct, id:123},
            {...tempProduct, id:125},
            {...tempProduct, id:155},
            {...tempProduct, id:432},
            {...tempProduct, id:657},
            {...tempProduct, id:453},
            {...tempProduct, id:122},
            {...tempProduct, id:111},
        ] as Product[]

        return new Promise( resolve => {
            setTimeout(() => {
                resolve(list)
            }, 500)
        })
    },

    deleteProduct: (id: number):Promise<boolean> => {
        return new Promise( resolve => {
            setTimeout(() => {
                resolve(true)
            }, 1000)
        })
    },
    createProduct: (form:FormData) => {
        return new Promise( resolve => {
            setTimeout(() => {
                resolve(true)
            }, 1000)
        })
    },
    updateProduct: (form:FormData) => {
        return new Promise( resolve => {
            setTimeout(() => {
                resolve(true)
            }, 1000)
        })
    }
}