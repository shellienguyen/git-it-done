let userFormEl = document.querySelector( "#user-form" );
let nameInputEl = document.querySelector( "#username" );
let repoContainerEl = document.querySelector( "#repos-container" );
let repoSearchTerm = document.querySelector( "#repo-search-term" );

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
      // If request was successful, username found
      if ( response.ok ) {
         response.json().then( function( data ) {
            displayRepos( data, user );
         });
      } else {
         alert( "Error: " + response.statusText );
      };
   }).catch( function( error ) {
      // Notice this .catch() getting chained to the end of the .then()
      alert( "Unable to connect to GitHub" );
   });
};

let displayRepos = function( repos, searchTerm ) {
   // Check if username is found, but there are no repos
   if ( repos.length === 0 ) {
      repoContainerEl.textContent = "No repositories found." ;
      return;
   };

   console.log( repos );
   console.log( searchTerm );
   
   // Clear old content
   repoContainerEl.textContent = "";
   repoSearchTerm.textContent = searchTerm;

   // Loop over repos to display on webpage
   for ( let i = 0; i < repos.length; i++ ){
      // Format repo name
      let repoName = repos[ i ].owner.login + "/" + repos[ i ].name;
      let repoNameDisplay = ( i + 1 ) + ".) " + repos[ i ].owner.login + "/" + repos[ i ].name;

      // Create a link for each repo
      let repoEl = document.createElement( "a" );
      repoEl.classList = "list-item flex-row justify-space-between align-center";
      repoEl.setAttribute( "href", "./single-repo.html?repo=" + repoName );

      // Create a span element to hold repository name
      let titleEl = document.createElement( "span" );
      titleEl.textContent = repoNameDisplay;

      // Append repository name <span> child to <div> container
      repoEl.appendChild( titleEl );

      // Create a status element
      let statusEl = document.createElement( "span" );
      statusEl.classList = "flex-row align-center";

      // Check if current repo has issues or not
      if ( repos [ i ].open_issues_count > 0 ) {
         statusEl.innerHTML = "<i class = 'fas fa-times status-icon icon-danger'></i>"
                              + repos[ i ].open_issues_count + " issues(s)";
      } else {
         statusEl.innerHTML = "<i class = 'fas fa-check-square status-icon icon-success'></i>";
      };

      // Append issues <span> to <div> container
      repoEl.appendChild( statusEl );

      // Append <div> container to DOM
      repoContainerEl.appendChild( repoEl );
   };
};

userFormEl.addEventListener( "submit", formSubmitHandler );