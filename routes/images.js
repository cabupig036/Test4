const router = require("express").Router();
const Image = require("../models/Image");
const multer = require("multer");
const fs = require('fs');
const path = require('path');
//Storage
const Storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'img')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({
    storage: Storage
});
// router.post('/upload',upload.single('ImageFile'), async (req, res) => {
//     const img = {
//         imgName:req.file.originalname,
//         image:{
//             data: fs.readFileSync(path.join('img/' + req.file.filename)),
// 			contentType: 'image/png'
//         }
//     }
//     Image.create(img,(err,item)=>{
//         if(err){
//             res.status(401).json(err);
//         }else{
//             item.save();
//             res.status(200).json({message:"Upload Complete"});
//         }
//     });
// });
router.get('/:imgName', async (req, res) => {
    const filePath = await Image.findOne({
        imgName: req.params.imgName
    });
    // console.log(filePath.contentType);
    res.contentType(filePath.image.contentType);
    res.send(filePath.image.data);
});
module.exports = router;