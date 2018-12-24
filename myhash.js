//. myhash.js
//. 任意のアスキー文字列を４桁のハッシュ値に変換する

const P = 65521; //. 65536 未満で最大の素数
const h = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];



//. 頭２文字のアスキーコードを整数化
function str2int( str ){
  var r = 0;

  if( typeof str != 'string' ){
    switch( typeof str ){
    case 'number':
      str = '' + str;
      break;
    case 'boolean':
      str = '' + str;
      break;
    case 'object':
      str = JSON.stringify( str );
      break;
    }
  }

  for( var i = 0; i < 2 && i < str.length; i ++ ){
    var c = str.charCodeAt( i );
    r = r * 16 + c;
  }

  if( str.length < 2 ){
    r *= 16;
  }

  return r;
}

//. アスキー文字列を整数化（0以上P未満）する
function str2mod( str ){
  var mod = 0;

  for( var i = 0; i < str.length; i += 2 ){
    var s = str.substring( i, i + 2 );
    var m = str2int( s );
    mod = ( mod * 65536 + m ) % P;
  }

  return mod;
}

//. 整数をハッシュ文字列に変換
function mod2myhash( mod ){
  var hash = '';

  var b = 1;
  var c = 0;
  var d = 1;
  while( b < 65536 ){
    var x = b & mod;
    c += ( x / d );
    if( b == 8 || b == 128 || b == 2048 || b == 32768 ){
      var s = h[c];
      hash = s + hash;
      c = 0;
      d *= 16;
    }

    b *= 2;
  }

  return hash;
}

//. アスキー文字列をハッシュ文字列に変換する
function str2myhash( str ){
  var v1 = str2mod( str );
  var v2 = mod2myhash( v1 );
  return v2;
}
exports.hash = str2myhash;


/*
//. 変換テスト出力
function test( str ){
  console.log( str + '(' + str.length + ') -> ' + str2myhash( str ) );
}


var str0 = '$';
var str1 = 'Kei.';
var str2 = 'K.Kimura';
var str3 = 'Hello. My name is K.Kimura';
var str4 = 'Kei';
var str5 = 'nei';

test( str0 );  //. 1文字
test( str1 );  //. 4文字
test( str2 );  //. 8文字
test( str3 );  //. 26文字
test( str4 );  //. 3文字（str2 に似た文字）
test( str5 );  //. 3文字（str4 に似た文字）
*/


