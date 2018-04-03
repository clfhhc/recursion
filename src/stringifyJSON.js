// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

var stringifyJSON = function(obj) {
  // your code goes here
  var stringDescription = "";
  if (obj===undefined) {
    stringDescription="undefined";
  } else if (typeof obj==='function') {
    stringDescription="undefined";
  } else if (obj===null) {
    stringDescription="null";
  } else if (["number","boolean"].includes(typeof obj)) {
    stringDescription=obj.toString();
  } else if (typeof obj==='string') {
    stringDescription='\"' + obj.toString()+ '\"';
  } else if (Array.isArray(obj)) {
    stringDescription="[";
    obj.forEach((item)=>{
      if (item===undefined) {
        stringDescription+="null,";
      } else if (typeof item==='function') {
        stringDescription+="null,";
      } else {
        stringDescription+=stringifyJSON(item)+",";
      }
    });
    stringDescription=(obj.length>0 ? stringDescription.slice(0,-1) : stringDescription)+"]";
  } else {
    stringDescription="{";
    let counter=0
    Object.keys(obj).forEach((item)=>{
      if (obj[item]===undefined) {
        stringDescription+="";
      } else if (typeof obj[item]==='function') {
        stringDescription+="";
      } else {
        stringDescription+=stringifyJSON(item)+":"+stringifyJSON(obj[item])+",";
        counter++;
      }
    });
    stringDescription=(counter>0 ? stringDescription.slice(0,-1) : stringDescription)+"}";
  }
  return stringDescription;
};
