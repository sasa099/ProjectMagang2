module.exports = (app) => {
    const absensi = require("../controller/absensi.controller.js");
    
    var router = require("express").Router();
    
    router.post("/", absensi.create);
    
    router.get("/", absensi.findAll);
    
    router.get("/:id", absensi.findOne);
    
    router.put("/:id", absensi.update);
    
    router.delete("/:id", absensi.delete);

    //router.get("/laporan", absensi.laporan);

    router.get("/detail", absensi.detail);
    
    app.use("/api/absensi", router);
   };
   