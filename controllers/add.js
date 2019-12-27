const handleAdd=(req,res,db)=>{
	const {uid,statement,difficulty,offsett}=req.body;

	db('questions')
		.returning('*')
		.insert({
			uid:uid,
			statementt:statement,
			difficulty:difficulty,
			offsett:offsett
		})
		.then(questions=>{
			res.json('success');
		})
		.catch(err=>res.status(400).json(err));
	/*database.questions.push({
		qid:2,
		uid:uid,
		statement:statement,
		difficulty:difficulty,
		offsett:offsett
	})
	res.json('success');*/
}

module.exports={
	handleAdd:handleAdd
}