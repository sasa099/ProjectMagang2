const db = require("../models");
const Matkul = db.matkul;
 
exports.create = (req, res) => {
 const matkul = new Matkul({
  kode : req.body.kode,
  matakuliah: req.body.matakuliah,
 });
 
 // Save Matkul in the database
 Matkul.find({
  matakuliah:req.body.matakuliah,
}).then((data)=>{console.log(data[0]);
 if(!data[0]){
 matkul
   .save(matkul)
   .then((data) => {
     res.send(data);
   })
   .catch((err) => {
     res.status(500).send({
       message: err.message || "Some error occurred while creating the Matkul.",
      });
   });
  } else {
    res.status(412).send({ message: "Matakuliah "+ req.body.matakuliah + " Telah Terdaftar" });
  }
}).catch((err) => {
  res.status(500).send({
    message: err.message || "Some error occurred while retrieving.",
  });
});
}
 
exports.findAll = (req, res) => {
 const nama = req.query.nama;
 var condition = nama
   ? { nama: { $regex: new RegExp(nama), $options: "i" } }
   : {}; 
 
 Matkul.find(condition)
   .then((data) => {
     res.send(data);
   })
   .catch((err) => {
     res.status(500).send({
       message: err.message || "Some error occurred while retrieving.",
     });
   });
};
 
exports.findOne = (req, res) => {
 const id = req.params.id;
 
 Matkul.findById(id)
   .then((data) => {
     if (!data) res.status(404).send({ message: "Not found with id " + id });
     else res.send(data);
   })
   .catch((err) => {
     res.status(500).send({ message: "Error retrieving with id=" + id });
   });
};
 
exports.update = (req, res) => {
 const id = req.params.id;
 const matkul2 ={
 kode : req.body.kode,
 matakuliah: req.body.matakuliah,
};

Matkul.find({
  matakuliah:req.body.matakuliah,
}).then((data)=>{console.log(data[0]);
 if(!data[0]){
 Matkul.findByIdAndUpdate(id,matkul2, { useFindAndModify: false })
   .then((data) => {
     if (!data) {
       res.status(404).send({
         message: `Cannot update Matkul with id=${id}. Maybe Matkul was not found!`,
       });
     } else res.send({ message: "Matkul was updated successfully." });
   })
   .catch((err) => {
     res.status(500).send({
       message: "Error updating Matkul with id=" + id,
     });
   });
  } else {
    res.status(412).send({ message: "Matakuliah "+ req.body.matakuliah + " Telah Terdaftar" });
  }
}).catch((err) => {
  res.status(500).send({
    message: err.message || "Some error occurred while retrieving.",
  });
});
};
exports.delete = (req, res) => {
 const id = req.params.id;
 
 Matkul.findByIdAndRemove(id)
   .then((data) => {
     if (!data) {
       res.status(404).send({
         message: `Cannot delete Matkul with id=${id}. Maybe Matkul was not found!`,
       });
     } else {
       res.send({
         message: "Matkul was deleted successfully!",
       });
     }
   })
   .catch((err) => {
     res.status(500).send({
       message: "Could not delete Matkul with id=" + id,
     });
   });
};
 
exports.deleteAll = (req, res) => {};
 
exports.findAllPublished = (req, res) => {};
