// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
/*var getElementsByClassName = function(className
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
*/

var getElementsByClassName = function(className
) {
  // your code here
  function getElementsByClassNameInHtmlCollection (htmlElement,className) {
    var targetElements=[];
    if (htmlElement.classList.contains(className)) {
      targetElements.push(htmlElement);
    }
    if (htmlElement.childNodes.length>0) {
      for (let i=0;i<htmlElement.childNodes.length;i++) {
        htmlElement.childNodes[i].nodeType===1 ? targetElements.push(...getElementsByClassNameInHtmlCollection(htmlElement.childNodes[i],className)) : null;
      }
    }
    return targetElements;
  };
  var htmlElement=document.body;
  return getElementsByClassNameInHtmlCollection(htmlElement,className);
};
