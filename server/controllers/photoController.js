const Photo= require("../models/Photo")
const createNewPhoto= async(req, res)=>{
    const{title,imageUrl}= req.body
    if(!title){
        return res.status(400).json({message: 'title is required'})
    }
    if(!imageUrl){
        return res.status(400).json({message: 'imageUrl is required'})
    }
    const photo= await Photo.create({title, imageUrl})
    if(photo){
        return res.status(201).json({ message: 'New photo created'})
    }
    else{
        return res.status(400).json({ message: 'Invalid photo'})
    }
}

const getAllPhotos= async(req,res)=>{
    const photos=await Photo.find().lean()
    if(!photos?.length){
        return res.status(400).json({message: 'No photos found'})
    }
    res.json(photos)
}

const updatePhoto= async(req,res)=>{
    const {_id, title, imageUrl}= req.body
    if(!_id&&(!title || !imageUrl)){
        return res.status(400).json({message: 'fields are required'})
    }
    const photo= await Photo.findById(_id).exec()
    if(!photo){
        return res.status(400).json({ message: 'Photo not found'})
    }
    photo.title= title
    photo.imageUrl= imageUrl
    const updatePhoto= await photo.save()
    res.json(`'${updatePhoto.title}'update`)
}

const deletePhoto= async(req,res)=>{
    const{id}=req.body
    const photo= await Photo.findById(id).exec()
    if(!photo){
        return res.status(400).json({ message: 'Photo not found'})
    }
    const result= await photo.deleteOne()
    const reply= `Photo '${result.title}' ID '${result._id}' deleted`
    res.json(reply)
}
const getPhotoById= async(req,res)=>{
    const {id}= req.params
    const photo=await Photo.findById(id).lean()
    if(!photo){
        return res.status(400).json({ message: 'Photo not found'})
    }
    res.json(photo)
}

module.exports = {
    getAllPhotos,
    createNewPhoto,
    getPhotoById,
    updatePhoto,
    deletePhoto
    }