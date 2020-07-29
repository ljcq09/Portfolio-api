const express =require('express');
const bodyParser =require('body-parser');
const cors =require('cors');

const sendgrid =require('@sendgrid/mail');


const app =express();

app.use(bodyParser.json());

app.use(cors());

app.use((req,res,next) =>{
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Methods', 'Content-Type, Authorization')
    next();

});

app.get('/api', (req, res, next)=> {
    res.send('API Status: Running')
})

app.post('/api/email', (req, res, next)=>{

    sendgrid.setApiKey('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');
    const msg ={
        to: 'leninj09@gmail.com',
        from: 'leninj09@gmail.com',
        //from: req.body.email,
        subject: 'WEBSITE CONTACT',
        text: req.body.message +'\n from: ' + req.body.email
    }

    sendgrid.send(msg)
    .then(result =>{
        
        res.status(200).json({
            success: true
        })
    })
    .catch(err=>{
        console.log('error: ', err)
        res.status(401).json({
            success: false
        })
    });


} )

// app.listen(3030, '0.0.0.0');
app.listen('https://frozen-refuge-06762.herokuapp.com');