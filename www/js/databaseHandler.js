//dans cette fichier nous allons cree la table de la base de donnees 
var databaseHandler = {
    db: null,
    createDatabase: function(){
        this.db = window.openDatabase(
            "fiche.db",
            "1.0",
            "fiche database",
            1000000);
        this.db.transaction(
            
            function(tx){
                
                //Run sql here using tx
                tx.executeSql(
                    "create table if not exists Fiche(_id integer primary key, nom  text, prenom text , email text , telephone text , postal integer, enseigne text , adresse text , dateAniversaire date  , image text ,  detail text    )",
                    [],
                    function(tx, results){},
                    function(tx, error){
                        console.log("Error while creating the table: " + error.message);
                    }
                );
               
                
            },
            function(error){
                console.log("Transaction error: " + error.message);
            },
            function(){
                console.log("Create DB transaction completed successfully");
            }
        );
    
    }
    }