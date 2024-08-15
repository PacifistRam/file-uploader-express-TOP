
const { PrismaClient } = require("@prisma/client")

class User {
    constructor() {
        this.prisma = new PrismaClient();
    }
    
    // get single user for auth
    async getUserForAuth(uName) {
        try {
            return await this.prisma.user.findUnique({
                where:{
                    userName: uName
                },
            })
        } catch (error) {
            
        }
    }
    
    // get all users
    async getAllUsers() {
        try {
            return await this.prisma.user.findMany()
        } catch (error) {
            console.log(error)
        }
    }

    // get single user by id
    async getUserById(id) {
        try {
            const result  = await this.prisma.user.findUnique({
                where:{ id: +id },
            })
            return result
        } catch (error) {
            console.log(error)           
        }
    }

    // create new user
    async createNewUser(uName, email, password) {
        try {
            const result = await this.prisma.user.create({
                data: {
                    userName: uName,
                    email: email,
                    password: password
                }
            })
            if(result) {
             return {
                success: true,
                data: result
             }
             
            }else{
                return {
                    success: false,
                    message: "error in adding new user"
                }
            }       
                
        } catch (error) {
            console.error("error with database:",error)
        }
    }
}


const userService = new User();

module.exports = userService