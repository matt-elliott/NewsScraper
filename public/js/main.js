$('form').submit(function(event) {
  event.preventDefault();
  let data = $(this).serializeArray();
  
  $.post(`/comment/${data[1].value}`, data, function(result) {
    console.log(result);
  });
});