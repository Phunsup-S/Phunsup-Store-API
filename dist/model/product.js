"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProductSchema = new mongoose_1.default.Schema({
    imgUrl: {
        type: String,
        default: "none"
    },
    albumName: {
        type: String,
        require: true
    },
    albumDesc: {
        type: String,
        require: true
    },
    yearReleased: {
        type: String,
        require: true
    },
    albumPrice: {
        type: Number,
        require: true
    },
    youtubeLink: {
        type: String
    },
    spotifyLink: {
        type: String
    },
    reccomSong: {
        type: String
    },
    update_at: { type: Date, default: Date.now },
});
exports.default = mongoose_1.default.model("Product", ProductSchema);
