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
    }
}