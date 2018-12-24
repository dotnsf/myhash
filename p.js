//. p.js

//. 65536 未満で最大の素数 (=65521)
var max_p = 0;
for( var j = 2; j < 65536; j ++ ){
  if( isPrime( j ) ){
    max_p = j;
  }
}

console.log( '' + max_p );


function isPrime( n ){
  if( n > 1 ){
    var m = Math.floor( Math.sqrt( n ) );
    var b = true;
    for( var i = 2; i <= m && b; i ++ ){
      var a = n % i;
      b = ( a > 0 );
    }

    return b;
  }else{
    return false;
  }
}

