var express = require('express');
var router = express.Router();
const axios = require('axios');

router.get('/',function (req ,res ,next) {
  res.render('upload');
})
router.post('/', function(req, res, next) {
  console.log("nreeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
  axios.post('https://api.flock.co/hooks/sendMessage/8cc8c808-0111-4ae6-8225-e1d6a4ece07f',{
    "text": "hey here is the graph",
      "attachments": [{
          "title": "SVG graph",
          "description": "Bar chart",
          "views": {
              "html": { "inline": "<div><form  action='https://d6b42422.ngrok.io/api 'method='get' > <input type='submit'  value='upload'> </form></div>", "width": 400, "height": 400 }
          }
      }]
  }).
  then(function (response) {
    console.log("sent success");
    res.send("success");
  }).
  catch(function (err) {
    console.log('error');
    res.send(err);
  })

});
module.exports = router;
