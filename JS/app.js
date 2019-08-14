use strict;

function Items (url, title, description, keyword, horns) {
  this.url = url;
  this.title = title;
  this.description = description;
  this.keyword = keyword;
  this.horns = horns;
}

$.get( "data/page-1.json", function ( data ) {
  let $data = data;
  console.log($data);
})