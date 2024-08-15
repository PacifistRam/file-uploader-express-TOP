const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {
    // const result = await prisma.user.create({
    //     data:{
    //         userName: "Pacif",
    //         email: "pacif@mail.com",
    //         password: "HelloWorld"
    //     }
    // })
    // const result = await prisma.user.findUnique({
    //     where:{ id : 1}
    // })
    // await prisma.folder.create({
    //     data:{
    //         folderName: 'Picnic',
    //         ownerId: 1
    //     }
    // })
    // const result =await prisma.user.update({
    //     where: {
    //         id:1
    //     },
    //     data:{
    //         folders:{
    //             deleteMany: {}
    //         }
    //     }
    // })
    // const result = await prisma.user.delete({
    //     where:{ id:1 }
    // })
    
    const result = await prisma.user.findMany({
       
    })
//     console.dir(allUsers, { depth: null });
console.log(result)
}


main()
.then(async () => {
    await prisma.$disconnect()
})
.catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
})