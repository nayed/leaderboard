import { Devs } from '../api/devs.js'
import { Session } from 'meteor/session'

Template.devsList.helpers({
    getDevs() {
        return Devs.find({}, {sort: {votes:1}})
    },

    hasVotes(votes) {
        return votes > 0
    },

    stateClass() {
        return Session.equals('currentDev', this._id) ? 'indigo lighten-4' : ''
    },

    countDevs() {
        let nbDevs = Devs.find().count()
        //console.log(nbDevs)
        return nbDevs > 0 ? Spacebars.SafeString(`There are ${nbDevs} developers <i class="tiny material-icons">person_pin</i>`) : 'There are no developer'
    },

    getVoteCount() {
        let votesCount = 0
        Devs.find().map(doc => {
            votesCount += doc.votes
        })
        return Spacebars.SafeString(`${votesCount} votes <i class="tiny material-icons">email</i>`)
    }
})


Template.devsList.events({
    'click td.devName': function(e) {
        Session.set('currentDev', this._id)
    },

    'click button.voteBtn': function(e) {
        let devId = Session.get('currentDev')
        Devs.update(devId, {$inc: {votes : 1}})
    }
})