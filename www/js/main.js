$(document).on("ready", function(){
    databaseHandler.createDatabase();
});

function addFiche(){
    var nom = $("#nom").val();
    var prenom = $("#prenom").val();
    var email = $("#email").val();
    var adresse = $("#adresse").val();
    var telephone = $("#telephone").val();
    var postal = $("#postale").val();
    var enseigne = $("#enseigne").val();
    var detail  = $("#detail").val();
    var image = $("#image").val();
    var date= $("#date").val();

     if(!nom && !prenom && !email)
     {  alert(" veuillez saisir les champs vide !!!!!  "); }
     else{
        var r = confirm("Name: " + nom + "\n" + "enseigne: " + enseigne);
        if(r==true){
            FicheHandler.addFiche( nom , prenom , email , telephone ,enseigne , postal , adresse , date , image , detail);
            $("#nom").val("");
            $("#enseigne").val("");

            alert("les donnees sont ajoutes avec succes !!!!!! ");
        }
    }
}
    
var currentFiche={
id: -1,
nom: "fff",
enseigne:"ff",
prenom: "ff" , 
email:"ffff",
}

function displayFiche(results){
    var length = results.rows.length;
    var lstProducts = $("#lstProducts");
    var div_client = "";
    lstProducts.empty();//Clean the old data before adding.
    div_client +='<div data-role="collapsibleset" data-filter="true" data-inset="true" id="collapsiblesetForFilter" data-input="#searchForCollapsibleSet">' ;
    for(var i = 0; i< length; i++){ 
        item = results.rows.item(i);
        var enseigne = '<li class="list-group-item">' + item.enseigne + '</li>';
        div_client +='<div class="show-custom" data-role="collapsible" dt-show="collapse-'+i+'" data-filtertext="'+i+'">'+'<h3> ' + enseigne +  '</h3>'+'<ul class="modal-show" name_id="'+item._id+'"  name_nom="'+item.nom+'"   name_prenom="'+item.prenom+'"  name_enseigne="'+item.enseigne+'"   name_email="'+item.email+'"  name_adresse="'+item.adresse+'"  name_postal="'+item.postal+'"  name_telephone="'+item.telephone+'"  name_detail="'+item.detail+'" name_date="'+item.date+'"   data-role="listview" data-filter="false"  data-input="#txtKeyword" data-inset="true"  id="lstProducts" style="display:none;" dt-show="collapse-'+i+'" dt-etat="none"> ' ;  
    //div_client += item = results.rows.item(i);

    div_client += "<li class='list-group-item list-group-item-success'>Nom: "+ item.nom +"</li>";
    div_client += "<li>prenom: "+ item.prenom+" </li>";
    div_client += "<li>email: "+item.email+" </li>";
    div_client += "<li>adresse: "+ item.adresse+"</li>";
    div_client += "<li>telephone: "+ item.telephone+" </li>";
    div_client += "<li>postal:   "+ item.postal+" </li>";
    div_client += "<li>detail: "+ item.detail+"</li>";
    div_client += "<li>date Renouvellement : "+ item.dateAniversaire+" </li>";
    div_client += "<li>Numero de fiche : </li>"; 
    
      /*  var item_nom  = $("<span/>").text(item.nom);
        item_nom.attr("name", "nom");

        var item_prenom  = $("<span/>").text(item.prenom);
        item_prenom.attr("name", "prenom");

        var spanId = $("<span />").text(item._id);
         spanId.attr("name", "_id");

         var item_email = $("<span />").text(item.email);
         spanId.attr("name", "email");

        nom.append(item_nom);
        prenom.append(item_prenom);
        email.append(item_email);
        num.append(spanId);
        a.append(nom);
        a.append(prenom);
        a.append(num);
        a.append(email); */
       
        
        // var li = $("<li/>");
        // li.attr("data-filtertext", item.nom);
        // li.append(a);
        // lstProducts.append(li);
        div_client += '</ul>  </div> ';
    }
     
    div_client += '</div>';
    $("#listeclient").append(div_client);


    //lstProducts.listview("refresh");
    $(document).on("click", ".modal-show", function(){
        //currentFiche.id = $(this).find("[name='_id']").text();
        currentFiche.id = $(this).attr("name_id");
        currentFiche.nom = $(this).attr("name_nom");
        currentFiche.prenom=$(this).attr("name_prenom");
        currentFiche.email=$(this).attr("name_email");
        currentFiche.date=$(this).attr("name_date");
        currentFiche.adresse=$(this).attr("name_adresse");
        currentFiche.postal=$(this).attr("name_postal");
        currentFiche.enseigne=$(this).attr("name_enseigne");
        currentFiche.telephone=$(this).attr("name_telephone");
        currentFiche.detail=$(this).attr("name_detail");

        //Set event for the list item
        $("#popupUpdateDelete").popup("open");
    });
}


if($("#listeclient")[0]){
    var liste = FicheHandler.loadFiche(displayFiche);
    $('#listeclient').append(liste);
}

 $(document).on("pagebeforeshow", "#loadpage", function(){
    FicheHandler.loadFiche(displayFiche);
 });

function deleteFiche(){
    var r = confirm("Delete Enseigne: "+currentFiche.enseigne+
                    "\n nom : " + currentFiche.nom);
    if(r==true){
        FicheHandler.deleteFiche(currentFiche.id);
        FicheHandler.loadFiche(displayFiche);
    }
    $("#popupUpdateDelete").popup("close");
}

$(document).on("pagebeforeshow", "#updatedialog", function(){
    $("#nom").val(currentFiche.nom);
    $("#prenom").val(currentFiche.prenom);
    $("#enseigne").val(currentFiche.enseigne);
    $("#email").val(currentFiche.email);
    $("#telephone").val(currentFiche.telephone);
    $("#postale").val(currentFiche.postal);
    $("#adresse").val(currentFiche.adresse);
    $("#detail").val(currentFiche.detail);
    $("#date").val(currentFiche.dateAniversaire);
    $("#image").val(currentFiche.image);

   
});

function updateFiche(){
    var nom = $("#nom").val();
    var enseigne = $("#enseigne").val();
    var prenom = $("#prenom").val();
    var email = $("#email").val();
    var telephone = $("#telephone").val();
    var postal = $("#postale").val();
    var adresse = $("#adresse").val();
    var date = $("#date").val();
    var image = $("#image").val();
    var detail = $("#detail").val();
    FicheHandler.updateFiche(currentFiche.id, nom  ,  prenom ,email , telephone ,enseigne ,  postal , adresse , date , image , detail);
    $("#updatedialog").dialog("close");
}

function collapseCustom(){
    var id = $(this).attr("dt-show");
  var statut = $('ul[dt-show="'+id+'"]').attr('dt-etat');
switch(statut){
    case "none":
        $('ul[dt-show="'+id+'"]').attr('dt-etat', 'show').removeAttr('style');
    break;
    case "show":
        $('ul[dt-show="'+id+'"]').attr('dt-etat', 'none').attr('style', 'display:none;');
    break;
}
}
$(document).on("click", ".show-custom", collapseCustom);


function login(){
    var email = $("#email").val();
    var pass = $("#passe").val();
 if(email == "" && pass == "") {
     alert("veuiller remplir ce champs ");

 } else{
     if(email == "admin" && pass == "admin") {
         location.replace("index.html");

     }else{
         alert("les identifiants sont incorrect");
     }
 }
}