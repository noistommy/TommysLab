import express from 'express';
import instagram from 'instagram-node';



const router = express.Router();



router.get('/', (req, res) => {
	const insta = instagram.instagram();
	insta.use({
		access_token : "197987201.6985782.2027d39e66fe40e2a74d71c467babcac"
	});

	insta.media_popular(function(err, medias, remaining, limit) {
	    if (err)
	    	res.json(err.body);
	    else
	    	res.send("medias");
	});
});



export default router;
