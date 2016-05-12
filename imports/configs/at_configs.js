AccountsTemplates.configure({
  showForgotPasswordLink: true,
  defaultLayoutType: 'blaze', // Optional, the default is 'blaze'
  defaultTemplate: 'authContent',
  defaultLayout: 'layout1',
  defaultLayoutRegions: {
      nav: 'navigation',
      footer: 'footer'
  },
  defaultContentRegion: 'main'
})

AccountsTemplates.configureRoute('signIn', {name: 'signIn'});
AccountsTemplates.configureRoute('signUp', {name: 'signUp'});