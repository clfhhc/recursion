// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className
) {
  // your code here
  function getElementsByClassNameInHtmlCollection (htmlCollection,className) {
    var targetElements=[];
    for (let i = 0;i<htmlCollection.length;i++) {
      if (htmlCollection[i].classList.contains(className)) {
        targetElements.push(htmlCollection[i]);
      }
    };
    return targetElements;
  };
  var htmlCollection=document.querySelectorAll('*');
  return getElementsByClassNameInHtmlCollection(htmlCollection,className);
};
