const folderService = require("../queries/Folder");


const findBreadcrumb = async(folderId) => {
    let breadcrumbs = [];
    let currentFolder = await folderService.getBreadcrumbFolderById(folderId)

    do{
        breadcrumbs.unshift({
            id:currentFolder.id,
            fname:currentFolder.folderName
        })
        currentFolder =await folderService.getBreadcrumbFolderById(currentFolder.parentId)
    }while(currentFolder && currentFolder.parentId !== null);

    return breadcrumbs

}

module.exports = findBreadcrumb