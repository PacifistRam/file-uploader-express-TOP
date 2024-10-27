const { PrismaClient } = require("@prisma/client")

class Folder {
    constructor() {
        this.prisma = new PrismaClient();
    }

    async getHomeSubFoldersFiles(ownerId) {
        try {
            return await this.prisma.folder.findUnique({
                where:{
                        ownerId_folderName:{
                            ownerId : +ownerId,
                            folderName: "Home"
                        }
                },
                include:{
                    subFolders: true,
                    files: true
                }
            })
        } catch (error) {
            console.error(error);
            return{
                error: error
            }
        }
    }


    async getAllFoldersForUser(userId) {
        try {
            return await this.prisma.folder.findMany({
                include:{
                    files: true
                },
                where:{
                    ownerId: +userId
                }
            }) 
        } catch (error) {
            console.error(error)
            return{
                error: error
            }
        }
    }

    async createNewFolderForUser(fName, ownerId,parentId) {
        try {
            const result = await this.prisma.folder.create({
                data:{
                    folderName: fName,
                    ownerId: +ownerId,
                    parentId: +parentId
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
            return{
                success: false,
                message: "Server Error Please try again",
                error: error
            }
        }
    }
    async getFolderById(folderId) {
        try {
            return await this.prisma.folder.findUnique({
                where: {
                    id: +folderId
                },
                include:{
                    subFolders: true,
                    files: true,
                }
            })
        } catch (error) {
            console.error(error);
            return{
                error: error
            }
        }
    }
    async getBreadcrumbFolderById(folderId) {
        try {
            return await this.prisma.folder.findUnique({
                where: {
                    id: +folderId
                },
                include:{
                    parent:true
                }
            })
        } catch (error) {
            console.error(error);
            return{
                error: error
            }
        }
    }
}

const folderService = new Folder();

module.exports = folderService