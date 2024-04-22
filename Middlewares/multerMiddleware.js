const multer = require('multer')

//setting up storage to store in server
const storage = multer.diskStorage({
    destination : (req,file,callback)=>{
        callback(null,'./uploads')
    },
    filename : (req,file,callback)=>{
        const filename = `image-${Date.now()}-${file.originalname}`
        callback(null,filename)
    }
})

//middleware config
const multerConfig = multer({
    storage
})

module.exports = multerConfig