var FicheHandler ={
    addFiche: function(nom , prenom , email , telephone , enseigne , postal , adresse  , dateAniversaire , image , detail ){
        databaseHandler.db.transaction(
            function(tx){
                tx.executeSql(
                    "insert into Fiche(nom, prenom , email ,  telephone , enseigne , postal , adresse ,  dateAniversaire , image ,detail ) values(?,?,?,?,?,?,?,?,? ,? )",
                    [nom , prenom , email , telephone , enseigne , postal , adresse , dateAniversaire , image , detail  ],
                    function(tx, results){},
                    function(tx, error){
                        console.log("add fiche error: " + error.message);
                    }
                );
            },
            function(error){},
            function(){}
        );
    },
    loadFiche: function(displayFiche){
        databaseHandler.db.readTransaction(
            function(tx){
                tx.executeSql(
                    "select * from Fiche  order by nom  ASC  ",
                    [],

                    function(tx, results){
                        //Do the display
                        displayFiche(results);
                    },
                    function(tx, error){//TODO: Alert the message to user
                        console.log("Error while selecting the products" + error.message);
                    }
                   
                );
               
            }

        );
    },
    deleteFiche:function(_id){
        databaseHandler.db.transaction(
            function(tx){
                tx.executeSql(
                    "delete from Fiche where _id = ?",
                    [_id],
                    function(tx, results){},
                    function(tx, error){//TODO: Could make an alert for this one.
                        console.log("Error happen when deleting: " + error.message);
                    }
                );
            }
        );
    },
    updateFiche: function(_id, nom , prenom , email , telephone , enseigne , postal , adresse  , dateAniversaire , image , detail){
        databaseHandler.db.transaction(
            function(tx){
                tx.executeSql(
                    "update Fiche set nom=?, prenom=? , email=? , telephone=? , enseigne=? , postal=? , adresse=? , image=? , detail=?  , dateAniversaire = ?  where  _id = ?",
                    [nom, prenom , email , telephone , enseigne , postal , adresse , image ,detail , dateAniversaire ,  _id],
                    function(tx, result){},
                    function(tx, error){//TODO: alert/display this message to user
                        console.log("Error updating product" + error.message);
                    }
                );
            }
        );


    }
};
