import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";

const createRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    try {
        const newRoom = new Room(req.body);
        const savedRoom = await newRoom.save();
        try {
            await Hotel.findByIdAndUpdate(hotelId, {$push: { rooms: savedRoom._id }});
        } catch (error) {
            next(error);
        }
        res.status(200).json(savedRoom);
    } catch (error) {
        next(error);
    }
}

const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(updatedRoom);
    } catch (error) {
        next(error);
    }
}

const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId;
    try {
        await Room.findByIdAndDelete(req.params.id);
        try {
            await Hotel.findByIdAndUpdate(hotelId, {$pull: { rooms: req.params.id }});
        } catch (error) {
            next(error);
        }
        res.status(200).json("Room has been deleted.");
    } catch (error) {
        next(error);
    }
}

const getRoom = async (req, res, next) => {
    try {
        const room = await Room.findById(req.params.id);
        res.status(200).json(room);
    } catch (error) {
        next(error);
    }
}

const getRoomList = async (req, res, next) => {
    try {
        const roomList = await Room.find();
        res.status(200).json(roomList);
    } catch (error) {
        next(error);
    }
}





export {createRoom, updateRoom, deleteRoom, getRoom, getRoomList};