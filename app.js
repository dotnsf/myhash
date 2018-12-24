//. app.js

var express = require( 'express' ),
    cfenv = require( 'cfenv' ),
    fs = require( 'fs' ),
    app = express();
var myhash = require( './myhash' );

var appEnv = cfenv.getAppEnv();

app.use( express.Router() );
app.use( express.static( __dirname + '/public' ) );

app.get( '/hash', function( req, res ){
  res.contentType( 'application/json; charset=utf-8' );

  var q = req.query.q;
  var hash = myhash.hash( q );

  res.write( JSON.stringify( { q:q, hash: hash }, 2, null ) );
  res.end();
});


app.listen( appEnv.port );
console.log( "server stating on " + appEnv.port + " ..." );
