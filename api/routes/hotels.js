import express from "express";
import { createHotel, updateHotel, deleteHotel, getHotel, getHotelList } from "../controllers/hotel.js";
import { verifyUser, verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//CREATE
router.post("/", verifyAdmin, createHotel);

//UPDATE
router.put("/:id", verifyAdmin, updateHotel);

//DELETE
router.delete("/:id", verifyAdmin, deleteHotel);

//GET
router.get("/:id", getHotel);

//GET ALL
router.get("/", getHotelList);


export default router;