const UserModel = require('../models/Users');
const fs = require('fs');
class FrontController {
  
  
    static show = (req, res) => {
    try {
      res.render('user');
    } catch (err) {
      console.log(err);
    }
    
    
  }

  
  
  static insert = async (req, res) => {
    try {
      if (!req.file || !req.body.title) {
        return res.status(400).send('Title and image are required');
      }

      const { title } = req.body;
      const imagePath = req.file.path; // Accessing the uploaded image path

      // Creating a new instance of UserModel with 'title' and 'image' data
      const result = new UserModel({
        title: title,
        image: imagePath // Assuming 'image' is the field in your UserModel schema for storing the image path
      });

      await result.save();
      res.render('user');
    } catch (err) {
      console.log(err);
      res.status(500).send('Internal Server Error');
    }
  }
  
  
  
  static display = async (req,res)=>{
    const data = await UserModel.find().sort({_id:-1})
    res.render('display',{d:data})
    
  }
  
  
  
  static edit = async(req,res)=>{
    
    try{
        const result = await UserModel.findById(req.params.id)
        res.render('edit',{d:result})

    }catch(err){
      console.log(err)
    }

}

static update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    let imagePath = req.body.old_image; // Get the old image path

    // Check if a new image has been uploaded
    if (req.file) {
      imagePath = req.file.path; // If a new image has been uploaded, update the imagePath
      // Delete the old image from the filesystem
      if (fs.existsSync(req.body.old_image)) {
        fs.unlinkSync(req.body.old_image);
      }
    }

    // Find the user by ID and update the title and image
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      { title, image: imagePath },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).send('User not found');
    }

    res.redirect('/display'); // Redirect to the display page after successful update
  } catch (err) {
    console.error(err); // Log the specific error for debugging
    res.status(500).send('Internal Server Error');
  }
};


}

module.exports = FrontController;
