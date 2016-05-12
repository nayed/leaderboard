let privateRoutes = FlowRouter.group({
    prefix: '/private',
    name: 'private',
    triggersEnter: [AccountsTemplates.ensureSignedIn],
})

FlowRouter.notFound = {
    action: function() {
        BlazeLayout.render('layout1', {
            nav: 'navigation',
            main: 'notFoundContent'
        })
    }
}

FlowRouter.route('/', {
    name: 'home',
    action: function() {
        console.log('yo index')
        BlazeLayout.render('layout1', {
            nav: 'navigation',
            main: 'devsList'
        })
    }
})


FlowRouter.route('/log-out', {
    name: 'logOut',
    action: function() {
        AccountsTemplates.logout()
    }
})

privateRoutes.route('/vote', {
    name: 'vote',
    action: function() {
        BlazeLayout.render('layout1', {
            nav: 'navigation',
            main: 'vote'
        })
    }
})

