const handleDelete=(req,res,db)=>{
	const {qid}=req.body;

	db('questions')
		.where('qid',qid)
		.del()
		.then(response=>{
			res.json('success');
		})
	/*let flag=0;
	for(let i=0;i<database.questions.length;i++){
		console.log(database.questions[i].qid,qid);
		if(database.questions[i].qid===qid){
			flag=1;
			database.questions.splice(i,1)
			res.json('success')
		}
	}
	database.questions.forEach(question=>{
		if(question.qid===qid){
			question.statement=statement;
			question.difficulty=difficulty;
			flag=1;
			res.json('success');
		}

	})
	if(!flag)
		res.status(400).json('not found');*/

}

module.exports={
	handleDelete:handleDelete
}