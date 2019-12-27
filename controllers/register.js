const handleRegister=(req,res,db)=>{
const {email,name,password}=req.body;

	console.log('sdfada',email,name,password);
  


	db('users')
		.returning('*')
		.insert({
			email:email,
			name:name,
			pass:password,
			joined:new Date()
		})
		.then(user=>{
			res.json(user[0]);
		})
		.catch(err=>res.status(400).json(err));
	/*database.users.push({
		id:3,
		name:name,
		password:password,
		email:email,
		joined:new Date(),
	})
	res.json(database.users[database.users.length-1]);*/
}

module.exports={
	handleRegister:handleRegister
}