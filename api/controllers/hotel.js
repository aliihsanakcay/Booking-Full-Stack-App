import Hotel from "../models/Hotel.js";

const createHotel = async (req, res, next) => {
    const newHotel = new Hotel(req.body);
    try {
        //newHotel.validate();
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel);
    } catch (error) {
        next(error);
    }
}

const updateHotel = async (req, res, next) => {
    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new: true});
        res.status(200).json(updatedHotel);
    } catch (error) {
        next(error);
    }
}

const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted.");
    } catch (error) {
        next(error);
    }
}

const getHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    } catch (error) {
        next(error);
    }
}

const getHotelList = async (req, res, next) => {
    try {
        const hotelList = await Hotel.find();
        res.status(200).json(hotelList);
    } catch (error) {
        next(error);
    }
}

export {createHotel, updateHotel, deleteHotel, getHotel, getHotelList};