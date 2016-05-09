import { Devs } from '../api/devs.js'
import { Session } from 'meteor/session'

Template.devsList.helpers({
    getDevs() {
        //console.log(Devs)
        return Devs.find()
    },

    hasVotes(votes) {
        return votes > 0
    },

    stateClass() {
        // let currentDevId = Session.get('currentDev')
        // let rowDevId = this._id

        // if (currentDevId === rowDevId) {
        //     return "active"
        // }
        // 
        console.log(Session.equals('currentDev', this._id))
        return Session.equals('currentDev', this._id) ? 'active' : ''
    }
})


Template.devsList.events({
    'click td.devName' : function(e) {
        Session.set('currentDev', this._id)
    }
})