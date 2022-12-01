const router = require('express').Router()
const paquete = require('../models/paquete')

//MOSTRAR TODOS LOS PAQUETES DEL USUARIO metodo GET
router.get('/', async (req, res) => {
  const paquetes = await paquete.find({ id_user: req.user.id })
    .sort({ date: "desc" })
    .lean();
   res.json({
        error: null,
        data: { 
            title: 'PAQUETES REGISTRADOS',
            user: req.user,
            packs: paquetes
        }
    });
   
});

//AGREGAR PAQUETES metodo POST
router.post('/add', async (req, res) => {
    const Paquete = new paquete({
        id_user: req.user.id,
        fecha: req.body.fecha,
        hora: req.body.hora,
        ancho: req.body.ancho,
        alto: req.body.alto,
        largo: req.body.largo,
        delicado: req.body.delicado,
        peso: req.body.peso,
        direccion: req.body.direccion,
        ciudad: req.body.ciudad,
        nameEnvia: req.body.nameEnvia,
        idEnvia: req.body.idEnvia,
        direccionDestino: req.body.direccionDestino,
        ciudadDestino: req.body.ciudadDestino,
        nameRecibe: req.body.nameRecibe,
        idRecibe: req.body.idRecibe,
        estado: req.body.estado
    
    });
    await Paquete
    .save()
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error
    
}));
    });
    
   // update a paquete
   router.put("/update/:id", (req, res) => {
       const { id } = req.params;
       const { 
    id_user,fecha,hora,ancho,alto,largo,delicado,peso,direccion,nameEnvia,idEnvia,direccionDestino,ciudadDestino,nameRecibe,idRecibe,estado
       } = req.body;
    paquete
    .updateOne({ _id: id }, { $set: { id_user,fecha,hora,ancho,alto,largo,delicado,peso,direccion,nameEnvia,idEnvia,direccionDestino,ciudadDestino,nameRecibe,idRecibe,estado } })
    .then((data) => res.json(data))
    .catch((error) => res.json({ message: error }));
   });
//EXPORTAR RUTAS
module.exports = router;