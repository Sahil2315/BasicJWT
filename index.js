const express = require('express')
const app = express()
let jwt = require('jsonwebtoken')
const path = require('path')

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/tokenMe', (req, res) => {
    const user = {Name: "Sahil Nigam", Age: "Almost 21"}
    const token = jwt.sign({user}, 'ABCDEF')
    res.json({
        token: token
    })
})

let ensureToken = (req,res,next) =>{
    bearerHeader = req.headers['authorization']
    if(typeof(bearerHeader) != 'undefined'){
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        req.token = bearerToken
        next()
    }else{
        res.sendStatus(403)
    }
}

app.get('/protected', ensureToken, (req,res) => {
    jwt.verify(req.token, 'ABCDEF', (err, data) => {
        if(err){
            res.sendStatus(403)
        }
        else{
            res.json({
                text: "This is Protected!",
                data: data
            })
        }
    })
})

app.listen(5000)
