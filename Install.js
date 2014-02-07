function init() {
  if(!DriveApp.getFoldersByName(storageFolder).hasNext()) {
    rootFolder = DriveApp.createFolder(storageFolder);
    rootFolder.setSharing(DriveApp.Access.ANYONE, DriveApp.Permission.EDIT);
  } else {
    rootFolder = DriveApp.getFoldersByName(storageFolder).next();
  }
}
