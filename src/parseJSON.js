// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  // your code goes here
  var index=0;
  var character=' ';

  function next(number) {
    number>0 ? index+=number : index+=1;
    character=json.charAt(index-1);
  }

  function skip(skipType) {
    var skipList=[' ','\b','\f','\r','\n','\t'];

    if (skipType==='array') {
      skipList.push(',');
    } else if (skipType==='object') {
      skipList.push(',',':');
    }

    while (character && skipList.includes(character)) {
      next();
    }
  }

  var escapeChar={
    '"':'\"',
    '\\':'\\',
    '/':'\/',
    'b':'\b',
    'f':'\f',
    'n':'\n',
    'r':'\r',
    't':'\t'
  };

  function parseString() {
    var result="";

    if (character==='"') {
      next();
      while (character) {
        if (character==='"') {
          next();
          return result;
        } else if (character==='\\') {
          next();
          if (escapeChar[character]) {
            result+=escapeChar[character];
          } else if (character==='u') {
            result+=json.slice(index-2,index+4);
            next(4);
          } else {
            result+=character;
          }
        } else {
          result+=character;
        }
        next();
      }
      throw new SyntaxError(`Error parsing string at ${index-1}`);
    }
  }

  function parseNumber() {
    var numberString="";
    var result;

    if (character==='-') {
      numberString+=character;
      next();
      if (!(character>='0' && character<=9)) {
        throw new SyntaxError(`Error parsing number at ${index-1}`);
      }
    }
    while (character>='0' && character<='9') {
      numberString+=character;
      next();
    }
    if (character==='.') {
      numberString+=character;
      next();
      if (!(character>='0' && character<=9)) {
        throw new SyntaxError(`Error parsing number at ${index-1}`);
      }
      while (character>='0' && character<='9') {
        numberString+=character;
        next();
      }
    }
    if (['e','E'].includes(character)) {
      numberString+=character;
      next();
      if (['+','-'].includes(character)) {
        numberString+=character;
        next();
      }
      if (!(character>='0' && character<=9)) {
        throw new SyntaxError(`Error parsing number at ${index-1}`);
      }
      while (character>='0' && character<='9') {
        numberString+=character;
        next();
      }
    }

    result=Number(numberString);
    return result;
  }

  function parseArray() {
    var result=[];
    
    if (character==='[') {
      next();
      skip();
      while (character) {
        if (character===']') {
          next();
          return result;
        }
        result.push(parseValue());
        skip('array');
      }
      throw new SyntaxError(`Error parsing Array at ${index-1}`);
    }
  }

  function parseObject() {
    var result={};

    if (character==='{') {
      next();
      skip();
      while (character) {
        if (character==='}') {
          next();
          return result;
        }
        var key=parseString();
        skip('object');
        var value=parseValue();
        result[key]=value;
        skip('array');
      }
      throw new SyntaxError(`Error parsing Object at ${index-1}`);
    }
  }

  function parseNullAndBoolean() {
    if (character==='n') {
      if (json.slice(index-1,index+3)==='null') {
        next(4);
        return null;
      } else {
        throw new SyntaxError(`Error parsing null at ${index-1}`);
      }
    } else if (character==='t') {    
      if (json.slice(index-1,index+3)==='true') {
        next(4);
        return true;
      } else {
        throw new SyntaxError(`Error parsing boolean at ${index-1}`);
      }
    } else if (character==='f') {
      if (json.slice(index-1,index+4)==='false') {
        next(5);
        return false;
      } else {
        throw new SyntaxError(`Error parsing boolean at ${index-1}`);
      }
    } else {
      throw new SyntaxError(`Error parsing null or boolean at ${index-1}`);
    }
  }

  function parseValue() {
    skip();
    if(character === '"'){
      return parseString();
    } else if (character === '-' || character >= '0' && character <= '9'){
      return parseNumber();
    } else if (character === '[') {
      return parseArray();
    } else if (character === '{') {
      return parseObject();
    } else {
      return parseNullAndBoolean();
    }
  }

  return parseValue();
};
