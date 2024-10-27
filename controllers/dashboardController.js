const { body, validationResult } = require("express-validator");
const folderService = require("../queries/Folder");
const fileService = require("../queries/File");
const asyncHandler = require("express-async-handler")
const upload = require("../middleware/multerMiddleware");
const getBreadcrumbs = require("../utils/breadcrumb");
const uploadImage = require("../middleware/cloudinary")


exports.dashboard = asyncHandler(async(req,res) => {
    const user = req.user? req.user : undefined
   
    if(user){
        const result = await folderService.getHomeSubFoldersFiles(user.id)
        console.log(result)
        res.render("dashboard",{
            title: "dashboard",
            folders: result,
            breadcrumbs: null
        })
    }
})

// post controller for handle creation of folder
exports.postCreateFolder = asyncHandler(async(req, res, next) => {
    const userId = req.user.id;
    const fName = req.body.folderName;
    const parentId = req.body.parentId;
    const result = await folderService.createNewFolderForUser(fName, userId, parentId)
    if(result.success = true) {
        res.redirect(`/dashboard/folder/${result.data.id}`)
    }else{
        res.json({message: result.message, error: error? error : "Couldn't Create Folder "})
    }
})

// get single folder details
exports.getSingleFolder = asyncHandler(async(req, res, next) => {
    const folderId = req.params.id;
    
    const result = await folderService.getFolderById(folderId);
    const breadcrumbResult = await getBreadcrumbs(folderId);
    console.log(breadcrumbResult)
    res.render("dashboard",{
        title: "dashboard",
        folders: result,
        breadcrumbs:breadcrumbResult
    })
})

// post for creating new file
const uploadSingleImage = upload.single("uploadImage");
exports.postCreateFile = asyncHandler(async(req, res, next) => {
    const uploadPromise = new Promise((resolve, reject) => {
        uploadSingleImage(req, res, function (err){
            if(err) {
                reject(err);
            }else {
                resolve();
            }
        })
    })
    try {
        await uploadPromise;
        // Check if file exists
        if (!req.file) {
            return res.json({
                title: "Test Upload File",
                errorMessage: "Need a file to upload"
            });
        }
       
        const { publicId, url } = await uploadImage(req.file.path);
        const {parentId,ownerId } = req.body
        const result = await fileService.uploadNewFile(
            req.file.filename,
            url,
            parentId,
            ownerId
        )
        if(result.success = true) {
           return res.redirect(`/dashboard/folder/${parentId}`)
        }
        else{
           return res.json({message: result.error})
        }
    } catch (error) {
        console.error(error)
        return next(error)
    }        
})

// delete file routes
// get route
exports.getDeleteFile = asyncHandler(async(req, res, next) =>{
    const id = req.params.id;
    res.render("confirmDelete", {
        title: "delete confirmation",
        id : id
    })

})
// post route
exports.postDeleteFile = asyncHandler(async(req, res, next) => {
    const fileId = req.body.fileId
    const result = await fileService.deleteFileById(fileId)
    if(result.success === true){
        return res.json({message:" deleted successfully"})
    }
    return res.json({message: "error in deleting file"})
}) 


    