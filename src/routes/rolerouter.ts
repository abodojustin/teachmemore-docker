import express from "express";
import { createRole, getRoles } from "../database/repositories/RoleRepository";

const router = express.Router();

router.post("/create", async (req, res) => {
    const role = await createRole(req.body);
    
  if (role?.status && role?.status === 400) {

    res.status(400).json({ success: false, message: "une erreur s'est produite" });

  } else if (role?.status && role?.status === 500) {

    res.status(500).json({ success: false });

  } else {

    res.status(201).json({ success: true, message: "role crée avec succès" });

  }
});

router.get("/getAll", async (req, res) => {
    const roles = await getRoles();

    if(roles){

        res.status(200).json({ success: true, data: roles })

    } else {

        res.status(400).json({ success: false, message: "ressource non disponible" })

    }
});

export default router;
