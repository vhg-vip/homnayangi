$(document).ready(function(){
    // $('form').on('submit', function(event) {
    //     event.preventDefault();
    // }); 
    let url = location.pathname;
  if(url === '/recipe'){
    $('#home').addClass('active')
  }
  else if(url === '/recipe/ingredient'){
    $('#suggestion').addClass('active');
  }
  else if(url === '/user/favorite'){
    $('#favorite').addClass('active');
  }
  else{
    $('#add').addClass('active');
  }
})