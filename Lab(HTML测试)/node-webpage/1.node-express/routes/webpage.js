const express = require('express'),
	   router = express.Router()

router.get('/blog',(req,res,next)=>{
	res.send('blog')
	console.log('visited=>blog')
	next()
})

router.get('/webpage',(req,res,next)=>{
	res.send('webpage')
	console.log('visited=>webpage')
	next()
})

module.exports = router