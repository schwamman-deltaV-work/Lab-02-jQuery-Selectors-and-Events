'use strict';

const image = [];

function Image(url, title, description, keyword, horns) {
  this.url = url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
}

$.get('../data/page-1.json', function(data) {
  let $data = data;
  $data.forEach(function(element){
    image.push(new Image(element.image_url, element.title, element.description, element.keyword, element.horns));
  });
  image.forEach(function(element){
    renderImage(element.url, element.title, element.description, element.horns);
  });
});

console.log(image);

function renderImage(url, title, description, horns) {
  let $title = $('<h2>').text(title);
  let $img = $('<img>').attr('src', url).attr('alt', description);
  let $text = $('<p>').text(`Number of horns: ${horns}`);
  $('#photo-template').append($title, $img, $text);

}


