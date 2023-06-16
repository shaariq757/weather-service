const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geoCode = require('./utils/geocode')
const foreCast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

const publicDir = path.join(__dirname,'../public')
const viewDir = path.join(__dirname,'../templates/views')
const partialsDir = path.join(__dirname,'../templates/partials')

app.set('view engine','hbs')
app.set('views',viewDir)
hbs.registerPartials(partialsDir)

app.use(express.static(publicDir))

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather app',
        name:'Shaariq almaas'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Shaariq almaas'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        message:'Please describe your problem!',
        title:'Help page',
        name:'Shaariq almaas'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please enter an address'
        })
    }

    geoCode(req.query.address,(error,{latitude,longitude,place} = {})=>{
           if(error){
            return res.send({error})
           }
           foreCast(latitude,longitude,(error,dataForecast)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast:dataForecast,
                location:place,
                address:req.query.address
            })
           })     
        })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title:'404',
        message:'Help article not found',
        name:'Shaariq'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        message:'Page not found',
        name:'Shaariq almaas'
    })
})


app.listen(port,()=>{
    console.log('Server is running on '+ port)
})