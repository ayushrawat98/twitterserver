import multer from "multer";

const filefilter = (req, file, cb) => {
    let allowed = ['image/jpg','image/jpeg','image/png','image/gif']
    if(allowed.includes(file.mimetype)){
        cb(null,true);
    }else{
        cb({message: 'Unsupported File Format'}, false)
    }
};

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/files')
    },
    filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + "-" + file.originalname)
    }
  })

export const upload = multer({storage : storage, limits : {fileSize : 10*1024*1024}, fileFilter : filefilter})
