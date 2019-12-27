const handleLogin=(req,res,db)=>{
	
	const {email,password}=req.body;

	db.select('*').from('users').where({
					email:email,
					pass:password}
					)
	  .then(user=>{
	  	if(user.length){
	  		res.json(user[0]);
	  	}
	  	else
	  		res.status(400).json('Not Found');
	  })
	
	/*if(req.body.email===database.users[0].email && req.body.password===database.users[0].password)
	 res.json(database.users[0]);
	else{
		res.status(400).json('Cannot');
	}*/
}

module.exports={
	handleLogin:handleLogin
}