function redirection(url){
  window.location.replace(url);
}

$(document).ready(function(){
  $("#btn").click(function(){
    $("#text-cache").hide("slow" , function(){
      setInterval(3000);
    });
  });
  
});