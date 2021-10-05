var express = require('express');
var router = express.Router();
 
router.post('/',  function(req, res, next) {
  let key = req.body.key;
  console.log("admKey.js >>>> " + key)
  if(key == 'mesadminkey!!!' || key == '1212')
  { 
      console.log("RIGHT");
       res.status(200).json({});
     // res.json({key:200});
  }
  else
  {    
      console.log("WRONG");
      res.status(404).json({})
  }
  
 }); 

module.exports =  router;