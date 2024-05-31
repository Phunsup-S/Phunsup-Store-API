import mongoose from "mongoose";


const ProductSchema  = new mongoose.Schema({
    
    imgUrl: {
        type:String,
        default: "none"
    },
    albumName: {
        type:String,
        require:true
    },
    albumDesc:  {
        type:String,
        require:true
    },
    yearReleased:  {
        type:String,
        require:true
    },
    albumPrice:{
        type: Number,
        require:true
    },
    youtubeLink:{
        type:String
    },
    spotifyLink:{
        type:String
    },
    reccomSong:{
        type:String
    },
    update_at: { type: Date, default: Date.now },
});
export default mongoose.model("Product", ProductSchema) ;