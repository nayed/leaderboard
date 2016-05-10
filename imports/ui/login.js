Template.loginregister.events({
    'submit form#login-form': function(e) {
        e.preventDefault()
        // let email = e.target.email.value
        // let password = e.target.password.value
        // console.log(email, password)
        console.log(e.target.email, e.target.fieldEmail, e.target.login)
    }
})