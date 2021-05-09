const Express = require('express');
const cors = require('cors');
var jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');


const app = Express();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())
// app.use(bodyParser.json())


app.get('/', (req, resp) => {
    resp.send('Welcome!!')
})



app.post('/login', (req, resp) => {
    try {
        // setTimeout(() => {
        const { body: reqBody } = req;
        if (reqBody.user_name && reqBody.password === '123') {
            const tokenObj = {
                user_name: reqBody.user_name,
                user_role: 'admin'
            }
            const jwtToken = jwt.sign(tokenObj, 'emokey', { expiresIn: 30 })
            resp.status(200).send({ success: true, token: jwtToken })
        } else {
            resp.status(401).send({ success: false, message: 'Invalid Credentials' })
        }
        // }, 2000)
    } catch (err) {
        resp.status(500).send(err)
    }
})


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log('==== listening to port:', PORT)
})