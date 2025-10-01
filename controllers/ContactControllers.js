const ContactModel = require("../model/ContactModel");

const SubmitForm = async(req,res)=>{
    const {name,email,message} = req.body;
    if(!name || !email || !message){
        return res.status(400).json({message:"All fields are required"});
    }
    try {
        const contact = new ContactModel({name, email, message});
        await contact.save();
        res.status(200).json({ message: 'Message received successfully.' });
    } catch (error) {
        console.error(error);
    res.status(500).json({ error: 'Server error. Please try again later.' });
    }
}

module.exports = {SubmitForm}