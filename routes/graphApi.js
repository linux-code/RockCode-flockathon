var express = require('express');
var router = express.Router();
var fs = require('fs');
var fileUpload = require('express-fileupload');
const axios = require('axios');
router.use(fileUpload());
/* GET users listing. */
router.post('/barChart', function(req, res, next) {
  console.log(req.body.indicator);
  var filename="./dataJson/"+req.body.indicator+".json";
  fs.readFile(filename, 'utf8', function (err, data) {
    if (err) throw err;
    data=JSON.parse(data);
    var modifiedData=data;
    if(filename=="./dataJson/commercialCrops.json"){
      modifiedData=[];
      data.map(function(d) {
        var date=Number(d.x.split('_')[1]);
        if(date>=req.body.startDate && date<=req.body.endDate){
          modifiedData.push(d);
        }
      });
    }
    res.render('graph' ,{graphData:modifiedData});
  });
});
router.post('/upload', function(req, res, next) {
  var sampleFile;
   console.log(req.body.inp);
   if (!req.files) {
       res.send('No files were uploaded.');
       return;
   }

   sampleFile = req.files.sampleFile;
   sampleFile.mv('./upload/'+sampleFile.name, function(err) {
       if (err) {
           res.status(500).send(err);
       }
       else {
         fs.readFile('./upload/'+sampleFile.name,'utf8',function (err ,data) {
           data=JSON.parse(data);
           var modifiedData=[];
           data.map(function(d) {
             var date=Number(d.x.split('_')[1]);
             if(date>=req.body.startDate && date<=req.body.endDate){
               modifiedData.push(d);
             }
             res.render('graph' ,{graphData:modifiedData});
           });
         })
       }
   });
});
router.get('/lineChart',function(req,res,next) {
  res.json({});
});
router.get('/pieChart',function(req,res,next) {
  res.render('pie');
});
router.post('/stackChart',function(req,res,next) {
  var filename="./dataJson/"+req.body.indicator+".json";
  fs.readFile(filename, 'utf8', function (err, data) {
    if (err) throw err;
    data=JSON.parse(data);
    var modifiedData=data;
    if(filename=="./dataJson/riceSouthernProduction.json"){
      modifiedData=[];
      data.map(function(d) {
        var date=Number(d.x.split('_')[1]);
        if(date>=req.body.startDate && date<=req.body.endDate){
          modifiedData.push(d);
        }
      });
    }
    res.json(modifiedData);
  });
});
module.exports = router;
