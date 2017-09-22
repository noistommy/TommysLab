import express from 'express';

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

    // CREATE NEW BLOG
    let blog = new Blog({
        writer: req.session.loginInfo.username,
        file: req.body.file,
        title: req.body.title,
        content: req.body.content
    });
    // // SAVE IN DATABASE
    // memo.save( err => {
    //     if(err) throw err;
    //     return res.json({ success: true });
    // });

    // Fs.readFile(req.files.uploadFile.path, function(err, data){
    //     let filePath = __dirname + "/Tommyfiles/" + req.files.uploadFile.name;
    //     Fs.writeFile(filePath, data, function(err){
    //         if(err){
    //             return res.status(500).json({
    //                 error: "UPLAOD FAIL",
    //                 code: 3
    //             });
    //         }else {
    //             return res.json({success:true});
    //         }
    //     });
    // });
});
export default router;
