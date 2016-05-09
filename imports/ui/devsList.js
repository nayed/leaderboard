import { Devs } from '../api/devs.js'

Template.devsList.helpers({
    devs() {
        console.log(Devs)
        return Devs.find()
    }
})