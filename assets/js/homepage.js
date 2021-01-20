let getUserRepos = function( user ) {
   // Format the github apir url
   let apiUrl = "https:/api.github.com/users/" + user + "/repos";

   // Make a requst to the url
   fetch( apiUrl ).then( function( response ) {
      response.json().then( function( data ) {
         console.log( data );
      });
   });
};

getUserRepos( "microsoft" );
getUserRepos( "facebook" );
getUserRepos( "shellie" );