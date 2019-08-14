'use strict';

const image = [];
let keywords = [];

function Image(url, title, description, keyword, horns) {
  this.url = url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
}

$.get('data/page-1.json', function(data) {
  let $data = data;
  $data.forEach(function(element){
    image.push(new Image(element.image_url, element.title, element.description, element.keyword, element.horns));
    keywords.push(element.keyword);
  });
  image.forEach(function(element){
    renderImage(element.url, element.title, element.description, element.horns, element.keyword);
  });
  keywords = new Set(keywords);
  console.log(keywords);
  keywords.forEach(function(element){
    createList(element);
  });
  $('select').change(hideElement);
});

console.log(image);

function renderImage(url, title, description, horns, keyword) {
  let $section = $('<section>').attr('data-keyword', keyword);
  let $title = $('<h2>').text(title);
  let $img = $('<img>').attr('src', url).attr('alt', description);
  let $text = $('<p>').text(`Num of horns: ${horns}`);
  $section.append($title, $img, $text);
  $('main').append($section);
}

function createList(keyword) {
  let $option = $('<option>').text(keyword).attr('value', keyword);
  $('select').append($option);
}

function hideElement() {
  let value = $(this).val();

  if(value !== 'default'){
    $('section').hide();
    $(`section[data-keyword=${value}]`).fadeIn(750);
  } else {
    $('section').fadeIn(750);
  }
}
