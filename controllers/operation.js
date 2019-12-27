const handleOperation=(req,res,db)=>{
		const {uid,difficulty}=req.body;
	const A=[];
	db.select('*').from('questions').where({'uid':uid,'difficulty':difficulty})
	  .then(questions=>{
	  	if(questions.length){
	  		res.json(questions);
	  		// console.log(questions);
	  	}
	  	else
	  		res.json('Not FOund');
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
	handleOperation:handleOperation
}