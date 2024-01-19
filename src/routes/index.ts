import express from "express";
import routerAu from './authrouter';
import routerUs from './userrouter';
import routerRole from "./rolerouter";

const router = express()


router.use('/user', routerUs);
router.use('/auth', routerAu);
router.use('/role', routerRole);

export default router;