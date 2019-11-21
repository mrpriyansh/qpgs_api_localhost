const express=require('express');
const bodyParser=require('body-parser');
const app =express();
app.use(bodyParser.json());

const database={
	users:[
		{
			id:'1',
			name:'Aman',
			email:'aman@gmail.com',
			password:'sdf',
			joined:new Date(),
		},
		{
			id:'2',
			name:'Anuj',
			email:'Anuj@gmail.com',
			password:'sdf',
			joined:new Date(),
		},
	
	]
}


app.get('/',(req,res)=>{
	res.send(database.users);
})

app.post('/login',(req,res)=>{
	if(req.body.email===database.users[0].email && req.body.password===database.users[0].password)
	 res.json('success');
	else{
		res.status(400).json('Cannot');
	}
})

app.post('/register',(req,res)=>{
	const {email,name,password}=req.body;
	database.users.push({
		id:'3',
		name:name,
		password:password,
		email:email,
		joined:new Date(),
	})
	res.json(database.users[database.users.length-1]);
})

app.post('/register',(req,res)=>{
	const {email,name,password}=req.body;
	database.users.push({
		id:'3',
		name:name,
		password:password,
		email:email,
		joined:new Date(),
	})
	res.json(database.users[database.users.length-1]);
})

app.get('/profile/:id',(req,res)=>{
	const {id}=req.params;
	let flag=0;
	database.users.forEach(user=>{
		if(user.id===id)
		flag=1;
		res.json(user);
	});
	if(flag==0)
		res.status(400).json('not found');
	
});
app.listen(3000,()=>{
	console.log('app is running');
});
