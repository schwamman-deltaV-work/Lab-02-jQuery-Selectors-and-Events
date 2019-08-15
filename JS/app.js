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

function getData1(url) {
  $.get(url, function(data) {
    let $data = data;
    $data.forEach(function(element){
      image.push(new Image(element.image_url, element.title, element.description, element.keyword, element.horns));
      keywords.push(element.keyword);
    });
    dynamicSort('title', image);
    image.forEach(function(element){
      renderImage(element.url, element.title, element.description, element.horns, element.keyword);
    });
    keywords = new Set(keywords);
    keywords.forEach(function(element){
      createList(element);
    });
    $('#filter').change(hideElement);
    $('#sort').change(event => rerenderImage1(event));
  });
}

function getData2(url) {
  $.get(url, function(data) {
    let $data = data;
    $data.forEach(function(element){
      image.push(new Image(element.image_url, element.title, element.description, element.keyword, element.horns));
      keywords.push(element.keyword);
    });
    dynamicSort('title', image);
    keywords = new Set(keywords);
    keywords.forEach(function(element){
      createList(element);
    });
    image.forEach(element => {
      let source = $('#image-template').html();
      let template = Handlebars.compile(source);
      let context = {keyword: element.keyword, title: element.title, url: element.url, description: element.description, horns: element.horns,};
      let html = template(context);
      $('main').append(html);
    });
    $('#filter').change(hideElement);
    $('#sort').change(event => rerenderImage2(event));
  });
}

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
  $('#filter').append($option);
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

function dynamicSort(value, arr) {
  if(value === 'horns'){
    arr.sort((a,b) => {
      return a.horns - b.horns;
    });
  } else if(value === 'title'){
    arr.sort((a,b) => {
      return a.title.toUpperCase() > b.title.toUpperCase() ? 1 : a.title < b.title ? -1 : 0;
    });
  }
}

function rerenderImage1(event) {
  console.log(event.target.value);
  dynamicSort(event.target.value, image);
  console.log(image);
  $('main').empty();
  image.forEach(function(element){
    renderImage(element.url, element.title, element.description, element.horns, element.keyword);
  });
}

function rerenderImage2(event) {
  dynamicSort(event.target.value, image);
  $('main').empty();
  image.forEach(element => {
    let source = $('#image-template').html();
    let template = Handlebars.compile(source);
    let context = {keyword: element.keyword, title: element.title, url: element.url, description: element.description, horns: element.horns,};
    let html = template(context);
    $('main').append(html);
  });
}

if($('#page-1').length > 0) {
  getData1('data/page-1.json');
}
else if($('#page-2').length > 0) {
  getData2('data/page-2.json');
}