const express=require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const knex=require('knex');
const app =express();
app.use(bodyParser.json());
app.use(cors());

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


app.get('/',(req,res)=>{
	res.send(database.users);
})

app.post('/login',(req,res)=>{

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
})

app.post('/register',(req,res)=>{
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
})


/*app.post('/register',(req,res)=>{
	const {email,name,password}=req.body;
	database.users.push({
		id:3,
		name:name,
		password:password,
		email:email,
		joined:new Date(),
	})
	res.json(database.users[database.users.length-1]);
})
*/
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


app.post('/profile/add',(req,res)=>{

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
})


app.post('/profile/show',(req,res)=>{
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
});


app.post('/profile/operation',(req,res)=>{
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
});

app.put('/profile/modify',(req,res)=>{
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

})

app.put('/profile/on',(req,res)=>{
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
})

app.delete('/profile/delete',(req,res)=>{
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

})




/*app.delete('/profile/delete',(req,res)=>{
	const {qid}=req.body;
	dat
})*/
app.listen(3000,()=>{
	console.log('app is running');
});
