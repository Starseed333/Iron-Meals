$(document).ready(function() {
  // Getting references to our form and inputs
  var loginButton = $("#login-button");
  var loginEmail = $("input#login-email");
  var loginPassword = $("input#login-password");
  var signupButton = $("#signup-button");
  var signupEmail = $("input#signup-email");
  var signupPassword = $("input#signup-password");
  var firstNameInput = $("input#first-name");
  var lastNameInput = $("input#last-name");

  // the "href" attribute of the modal trigger 
      $(".modal-trigger").leanModal();

      $('ul.tabs').tabs();

      $(".button-collapse").sideNav();
  //Upon form submission validate the email and password
  loginButton.on("click", function(event) {
    event.preventDefault();
    var userData = {
      email: loginEmail.val().trim(),
      password: loginPassword.val().trim()
    };

    if (!userData.email || !userData.password) {
        Materialize.toast('Please enter your email address and password to login', 4000)
      return;
    }

    // Clear email and password form for the home page
    loginUser(userData.email, userData.password);
    loginEmail.val("");
    loginPassword.val("");
    $('#login-signup-modal').modal('close');
  });

  // CONSTRUCTION
  // USER post to "api/login" route to the members page
  function loginUser(email, password) {
    $.post("/login", {
      email: email,
      password: password
    }).then(function(data) {
      window.location.replace('/dashboard');
      // If there's an error, log the error
    }).catch(function(err) {
      console.log(err);
    });
  }

    //Validate the email and password upon the signup at the home page
    signupButton.on("click", function(event) {
      event.preventDefault();
      var userData = {
        email: signupEmail.val().trim(),
        password: signupPassword.val().trim(),
        firstName: firstNameInput.val().trim(),
        lastName: lastNameInput.val().trim()
      };

      if (!userData.email || !userData.password || !userData.firstName || !userData.lastName) {
        return;
      }
      // Execute the signUpUser function
      signUpUser(userData.email, userData.password, userData.firstName, userData.lastName);
      signupEmail.val("");
      signupPassword.val("");
      firstNameInput.val("");
      lastNameInput.val("");
      $('#modal1').modal('close');
    });

    // Post to the signup and page and redirect to the members page
    // Use catch to log any errors
    function signUpUser(email, password, firstName, lastName) {
      $.post("/signup", {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName
      }).then(function(data) {
        window.location.replace("/dashboard");
      }).catch(function(err) {
        console.log(err);
      });
    }

});
