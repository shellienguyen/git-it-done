let userFormEl = document.querySelector( "#user-form" );
let nameInputEl = document.querySelector( "#username" );

let formSubmitHandler = function( event ) {
   // Prevetns the browser from sending the form's input data to a URL
   //   as we will handle what happens with the form input data ourselves
   event.preventDefault();

   // get value form input element
   let username = nameInputEl.value.trim();

   if (username ) {
      getUserRepos( username );
      nameInputEl.value = "";
   } else {
      alert( "Please enter a GitHub username" );
   };

   console.log( event );
};

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

userFormEl.addEventListener( "submit", formSubmitHandler );