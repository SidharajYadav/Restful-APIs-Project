 
const asyncHandler = require("express-async-handler");
const router = require("../routes/contactRoutes");
const Contact = require("../models/contactModel");

const getContact = asyncHandler(async(req, res) => {
    const contacts = await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts);
  });


  const createContact = asyncHandler(async(req, res) => {
    console.log("The request body is",req.body);
    const {name, email, phone} = req.body;
    if (!name || !email || !phone){
        res.status(400);
        throw new Error("All Fields are mandatory");
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
    });
    res.status(201).json(contact);
  });

 
  const personContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
  });


  const updateContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user.id.toString() !== req.user.id){
      res.status(403);
      throw new Error("User don't have permissions to update other user contacts");
  }
    const updatedContact = await Contact.findByIdAndUpdate(req.params.id,req.body,{new: true});
    res.status(200).json(contact);
  });


  const delectContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user.id.toString() !== req.user.id){
      res.status(403);
      throw new Error("User don't have permissions to delect other user contacts");
  }
    await Contact.remove();

    res.status(200).json(contact);
  });


  module.exports = {getContact, 
    createContact,
    personContact,
    updateContact,
    delectContact}; 
