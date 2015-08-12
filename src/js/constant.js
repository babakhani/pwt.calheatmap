/**
 *
 * @param input
 * @param dict
 * @returns {*|jQuery|HTMLElement}
 */
$.mustache = function(input,dict) {
    // Micro Mustache Template engine
    String.prototype.format = function string_format(arrayInput) {
            function replacer(key){
                  var keyArr =key.slice(2,-2).split("."),firstKey = keyArr[0], SecondKey = keyArr[1];
                   if (arrayInput[firstKey] instanceof Object){
                         return arrayInput[firstKey][SecondKey];
                   }
                   else{
                         return arrayInput[firstKey];
                   }
            }
            return this.replace(/{{\s*[\w\.]+\s*}}/g,replacer);
      };
     return $(input.format(dict));
};
/**
 *
 * @param i
 */
var log = function(i){
    console.log(i);
}