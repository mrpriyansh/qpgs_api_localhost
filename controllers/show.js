const handleShow=(req,res,db)=>{
	const {uid}=req.body;
	const A=[];

	db.select('*').from('questions').where({uid})
	  .then(questions=>{
	  	if(questions.length){
	  		res.json(questions);
	  	}
	  	else
	  		res.status(400).json('Not FOund');
	  });
	/*database.questions.forEach(question=>{
		if(question.uid===uid)
			A.push(question);

	})
	if(A.length)
	res.json(A);
	else
		res.status(400);*/
}

module.exports={
	handleShow:handleShow
}