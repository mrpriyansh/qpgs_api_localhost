const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const knex=require('knex');
const app =express();
app.use(bodyParser.json());
app.use(cors());


const show=require('./controllers/show');
const register=require('./controllers/register');
const login=require('./controllers/login');
const add=require('./controllers/add');
const operation=require('./controllers/operation');
const modify=require('./controllers/modify');
const del=require('./controllers/del');



const db=knex({

  client: 'pg',
  connection: {
    host : '127.0.0.1',
    user : 'Priyansh',
    password : '123',
    database : 'qpgs'
  }
});
/*
console.log(db.select('*').from('users'));*/
const database={
	users:[
		{
			uid:1,
			name:'Aman',
			email:'aman@gmail.com',
			password:'sdf',
			joined:new Date(),
		},
		{
			uid:2,
			name:'Anuj',
			email:'Anuj@gmail.com',
			password:'sdf',
			joined:new Date(),
		},
	
	],
	questions:[
			{
				qid:1,
				uid:1,
				statement:'What is your name?',
				difficulty:'low',
				offsett:0,

			},
			{
				qid:2,
				uid:1,
				statement:'What is your name?',
				difficulty:'high',
				offsett:0,

			},
			{
				qid:3,
				uid:1,
				statement:'What is your name?',
				difficulty:'medium',
				offsett:0,

			}
	],

	login:[
			{uid:1,
			 hash:'',
			 email:'aman@gmail.com'
			}
	]

}

// app.get('/',(req,res)=>{
// 	res.send(database.users);
// })

app.get('/',(req,res)=>{res.send('it is working')});

app.post('/login',(req,res)=>{login.handleLogin(req,res,db)});

app.post('/register',(req,res)=>{register.handleRegister(req,res,db)});

app.post('/profile/add',(req,res)=>{add.handleAdd(req,res,db)});

app.post('/profile/show',(req,res)=>{show.handleShow(req,res,db)});

app.post('/profile/operation',(req,res)=>{operation.handleOperation(req,res,db)});

app.put('/profile/modify',(req,res)=>{modify.handleModify(req,res,db)});

app.delete('/profile/delete',(req,res)=>{del.handleDelete(req,res,db)});

app.post('/profile/add',(req,res)=>{add.handleAdd(req,res,db)});

app.post('/profile/show',(req,res)=>{show.handleShow(req,res,db)});

app.post('/profile/operation',(req,res)=>{operation.handleOperation(req,res,db)});

app.put('/profile/modify',(req,res)=>{modify.handleModify(req,res,db)});



/*app.get('/profile/:id',(req,res)=>{
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
*/

/*app.put('/profile/on',(req,res)=>{
	const {qid}=req.body;
	console.log('dsf',qid);
	res.json(qid);
	db('questions')
		.where({'qid':qid})
		.update({offsett:1})
		.then(response=>{
			console.log('sdf');
			res.json('success')
		})
		.catch(err=>res.status(400).json(res));
})*/





/*app.delete('/profile/delete',(req,res)=>{
	const {qid}=req.body;
	dat
})*/
app.listen(process.env.PORT || 3000,()=>{
	console.log(`app is running ${process.env.PORT || 3000}`);
});
