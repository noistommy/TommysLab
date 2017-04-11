import express from 'express';
import Fs from 'fs';

const router = express.Router();

// WRITE BLOG
router.post('/', (req, res) => {
    // CHECK LOGIN STATUS
   if(typeof req.session.loginInfo === 'undefined') {
       return res.status(403).json({
           error: "NOT LOGGED IN",
           code: 1
       });
   }

   // CHECK CONTENTS VALID
    if(typeof req.body.contents !== 'string') {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    if(req.body.contents === "") {
        return res.status(400).json({
            error: "EMPTY CONTENTS",
            code: 2
        });
    }

    Fs.readFile(req.files.uploadFile.path, function(err, data){
        let filePath = __dirname + "/Tommyfiles/" + req.files.uploadFile.name;
        Fs.writeFile(filePath, data, function(err){
            if(err){
                return res.status(500).json({
                    error: "UPLAOD FAIL",
                    code: 3
                });
            }else {
                return res.json({success:true});
            }
        });
    });
});
