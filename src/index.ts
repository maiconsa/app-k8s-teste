import express from 'express';
const app = express();


let started =  false

const router = express.Router();
const data = new Date();
router.get('/',(req,res) => {
    res.status(200).json({'dataInicio' : data.toISOString()})})

router.get('/healthcheck',(req,res) => {
    if(started){
        res.status(200).json({'health' : "ok"})
    }else{
        res.status(500).json({'erro' : "aplicacao not started"})
    }
})

const client = require('prom-client');

// Create a Registry to register the metrics
const register = new client.Registry();
client.collectDefaultMetrics({register});

router.get('/metrics', async (req, res) => {
	try {
		res.set('Content-Type', register.contentType);
		res.status(200).end(await register.metrics());
	} catch (ex) {
		res.status(500).end(ex);
	}
});

app.use(router)
setTimeout(() => app.listen(4000,() => {
    console.log('Aplicação iniciada na porta 4000')
    started = true
}), 10000)
