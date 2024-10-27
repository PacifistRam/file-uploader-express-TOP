const { PrismaClient } = require("@prisma/client")

class File {
constructor(){
    this.prisma = new PrismaClient()
}
    async uploadNewFile(fileName,fileUrl,folderId,userId) {
        try {
            const result = await this.prisma.fileImage.create({
                data:{
                    fileName:fileName,
                    fileUrl:fileUrl,
                    folderId:+folderId,
                    userId: +userId
                }
            })
            return{
                success: true,
                data: result
            }
        } catch (error) {
            console.error(error)
            return{
                success: false,
                error: error
            }
        }
    }
    
    async deleteFileById(id) {
        try {
            const result = await this.prisma.fileImage.delete({
                where:{
                    id: +id
                }
            })
            return {
                success: true,
                data: result
            }
        } catch (error) {
            console.error(error);
            return{
                success:false,
                error: error
            }
        }
    }
}


const fileService = new File();

module.exports = fileService