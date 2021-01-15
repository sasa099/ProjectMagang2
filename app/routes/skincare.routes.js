module.exports = (app) => {
    const skincares = require("../controller/skincare.controller.js");
    
    var router = require("express").Router();
    
   // router.post("/", skincares.create);
   var multer = require("multer");
   var path = require("path");
   const generateFileName = () => {
       const dateNow = Date.now();
       const random = Math.floor(Math.random() * 9000000000000) + 1000000000000;
       return `${dateNow}-${random}`;
   };
   var upload = multer({
       storage: multer.diskStorage({
           destination: function (req, file, callback) {
               callback(null, "./uploads/gambar");
           },
           filename: function (req, file, callback) {
               callback(
                   null,
                   Date.now() +
                   Math.floor(Math.random() * 9000000000000) +
                   1000000000000 +
                   path.extname(file.originalname)
               );
           },
       }),
       fileFilter: function (req, file, callback) {
           var ext = path.extname(file.originalname);
           if (
               ext !== ".png" &&
               ext !== ".jpg" &&
               ext !== ".gif" &&
               ext !== ".jpeg"
           ) {
               return callback(/*res.end('Only images are allowed')*/ null, false);
           }
           callback(null, true);
       },
   });
   router.post("/", upload.any(), skincares.create);

    router.get("/", skincares.findAll);
    
    router.get("/:id", skincares.findOne);
    
    router.put("/:id", skincares.update);
    
    router.delete("/:id", skincares.delete);
    
    app.use("/api/skincare", router);
   };
   