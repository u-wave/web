var domify = require('domify'),
    templates = require("./templates");

module.exports = render;

function render(src){
  return domify(templates['audio.html']);
}
