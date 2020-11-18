#!node


const parseJson=require('parse-json');
const fs=require('fs');

//parse the command line arguments
const { hideBin } = require('yargs/helpers');
const yargs = require('yargs/yargs')(hideBin(process.argv))
    .usage('$0 [--countryCode=AU] [--startRest]')
    .example('$0 --countryCode=YE', "#returns yemen")
    .option( 'countryCode', {
        describe: 'the country code for the requested country.',
        type: 'string'
    })
    .option( 'startRest', {
        describe: 'determines if the rest api should be started',
        type: 'boolean'
    })
const argv=yargs.argv

const data=parseJson(fs.readFileSync('data.json'));
const jso=data['data'];
//if we are missing both countryCode and startRest print help
if (! argv.countryCode && ! argv.startRest ){
    yargs.showHelp();
}

// if a countryCode request is passed in print it
if (argv.countryCode) {
    if( jso[argv.countryCode] ){
        console.log(jso[argv.countryCode]['name']);
    } else{
        console.error(argv.countryCode+" is an unknown country code");
    }
}

//reverse hash for easier lookups by coutry name
byName=[];
Object.keys(jso).forEach( (key) => {
    byName[jso[key].name]=key;
} );
if (argv.startRest) {
    const express = require('express');
    const app = express();
    const port = argv.port || 3000;

    //our current application health
    app.get('/health', (req, res) => {
        console.log('/health')
        res.send('OK');
    });
    //return raw jason used for lookups
    app.get('/diag', (req, res) => {
        console.log('/diag')
        res.json(data);
    });
    //just returning a empty string at the base, might want to remove
    app.get('/', (req, res) => {
        console.log('/')
        res.send('')
    })
    //convert from coutry code to name or vice versa
    app.get('/convert', (req,res) => {

        name=req.query.name;
        cc=req.query.cc;
        if(req.query.name) {
            //lookup country code from name
            if(byName[name]){
                res.send(byName[name]);
            }else {
                res.status(404).send('unknown coutry name');
            }
        } else if(cc){
            //lookup country name from code
            if(jso[cc]){
                res.send(jso[cc]['name']);
            }else {
                res.status(404).send('unknown coutry name');
            }
        }else {
            res.status(404).send('unable to process request');
        }

    });
    //start service
    app.listen(port, () => {
      console.log('starting REST api');
    })

}
