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
        //console.log(Session.equals('currentDev', this._id))
        return Session.equals('currentDev', this._id) ? 'indigo lighten-4' : ''
    }
})


Template.devsList.events({
    'click td.devName': function(e) {
        Session.set('currentDev', this._id)
    },
    'click button.voteBtn': function(e) {
        //console.log(Session.get('currentDev'))
        let devId = Session.get('currentDev')
        Devs.update(devId, {$inc: {votes : 1}})
    }
})