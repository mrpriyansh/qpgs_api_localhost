const handleModify=(req,res,db)=>{
	const {qid,statement,difficulty}=req.body;

	let flag=0;
	db('questions')
		.where({qid:qid})
		.update({
			statementt:statement,
			difficulty:difficulty
		})
		.then(response=>{
			console.log(qid)
			res.json('success');
		})
		
	/*question=>{
			res.json(question);
		})
		.catch(res.status(400).json('not updated'));*/
	/*database.questions.forEach(question=>{
		if(question.qid===qid){
			question.statement=statement;
			question.difficulty=difficulty;
			flag=1;
			res.json('success');
		}

	})*/
	/*if(!flag)
		res.status(400).json('not found');*/

}

module.exports={
	handleModify:handleModify
}