let limitWarningEl = document.querySelector( "#limit-warning" );
let issueContainerEl = document.querySelector( "#issues-container" );

let displayWarning = function( repo ) {
   // Add text to warning container
   limitWarningEl.textContent = "To see more than 30 issues, visit ";

   let linkEl = document.createElement( "a" );
   linkEl.textContent = "See More Issues on GitHub.Com";
   linkEl.setAttribute( "href", "https://github.com/" + repo + "/issues" );
   linkEl.setAttribute( "target", "_blank" );

   // Append to warning container
   limitWarningEl.appendChild( linkEl );
};

let displayIssues = function( issues ) {

   if ( issues.length === 0 ) {
      issueContainerEl.textContent = "This repo has no open issues!";
      return;
   };

   for ( let i = 0; i < issues.length; i++ ) {
      // Create a link element to take users to the issue on github
      let issueEl = document.createElement( "a" );
      issueEl.classList = "list-item flex-row justify-space-between align-center";
      issueEl.setAttribute( "href", issues[ i ].html_url );
      issueEl.setAttribute( "target", "_blank" );

      // Create a <span> to hold issue title
      let titleEl = document.createElement( "span" );
      titleEl.textContent = ( i + 1 ) + ".) " + issues[ i ].title;

      // Append to container
      issueEl.appendChild( titleEl );

      // Create a type element
      let typeEl = document.createElement( "span" );

      // Check if issue is an acutal issue or a pull request
      if ( issues[ i ].pull_request ) {
         typeEl.textContent = "(Pull request)";
      } else {
         typeEl.textContent = "(Issue)";
      };

      // Append to container
      issueEl.appendChild( typeEl );

      issueContainerEl.appendChild( issueEl );
   };
};


let getRepoIssues = function( repo ) {
   console.log( repo );
   let apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

   fetch( apiUrl ).then( function( response ) {
      // Request was successful
      if ( response.ok ) {
         response.json().then( function( data ) {
            // Pass response data to DOM function
            displayIssues( data );

            // Check if api has paginated issues
            if ( response.headers.get( "Link" )) {
               displayWarning( repo );
            };
         });
      } else {
         alert( "There was a problem with your request!" );
      };
   });
};

getRepoIssues( "expressjs/express" );