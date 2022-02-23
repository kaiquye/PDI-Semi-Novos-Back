const multer = require('multer')
class UploadImage {
    constructor(){
        this.Upload();
    }
    
   Upload(){
      return multer({
            storage : multer.diskStorage({
                destination :  function(req, file, cb){
                    console.log(req)
                    cb(null, 'src/controller/image_ctrll/image')
                },
                filename : function(req, file, cb){
                    cb(null, Date.now().toString() + '_'+ file.originalname)
                }, 
                
            }),
       })
   }
}

module.exports = new UploadImage().Upload()
