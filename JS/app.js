'use strict';

const image = [];
let keywords = [];
let value;

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
    keywords.push(element.keyword);
  });
  keywords.forEach(function(element){
    createList(element);
  });
  $('select').change(function(event){
    value = event.data.value;
  });
  image.forEach(function(element){
    renderImage(element.url, element.title, element.description, element.horns, element.keyword);
  });
  keywords = new Set(keywords);
  console.log(keywords);
});

console.log(image);

function renderImage(url, title, description, horns, keyword) {
  if(keyword === value) {
    let $title = $('<h2>').text(title);
    let $img = $('<img>').attr('src', url).attr('alt', description);
    let $text = $('<p>').text(`Number of horns: ${horns}`);
    $('#photo-template').append($title, $img, $text);
  }
}

function createList(keyword) {
  let $option = $('<option>').text(keyword).attr('value', keyword);
  $('select').append($option);
}
