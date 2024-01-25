const express = require("express");
const router = express.Router();
const multer = require('multer');
const FrontController = require('../controllers/FrontController');
const fs = require('fs');
// Multer configuration for storing uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Files will be stored in the 'uploads' directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // File naming scheme
  }
});

const upload = multer({ storage: storage });

router.get("/users", (req, res) => {
  res.send("all users");
});

router.get('/show', FrontController.show);

// Route to handle inserting title and image using controller method
router.post('/insert', upload.single('image'), FrontController.insert);



router.get('/display', FrontController.display);
router.get('/edit/:id',FrontController.edit);
//router.post('/update/:id', FrontController.update);
router.post('/update/:id', upload.single('image'), FrontController.update);



module.exports = router;







