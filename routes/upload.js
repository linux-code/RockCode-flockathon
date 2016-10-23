var express = require('express');
var fileUpload = require('express-fileupload');
var router = express.Router();
const fs = require('fs');
// default options
router.use(fileUpload());

router.post('/', function(req, res) {
    var sampleFile;
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
              });
              res.render('graph' ,{graphData:modifiedData});


            });
        }
    });
});
module.exports = router;
