import { Template } from 'meteor/templating'

import '../imports/ui/layout.html'
import '../imports/ui/body.js'
import './main.html'
import '../imports/configs/at_configs.js'
import '../imports/configs/routes.js'


BlazeLayout.setRoot('body')

//T9n.setLanguage('fr_FR')

$(document).ready(function() {
    //$('.modal-trigger').leanModal()
})
