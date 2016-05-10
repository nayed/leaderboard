import { Devs } from '../api/devs.js'
import { Session } from 'meteor/session'

Template.devsList.helpers({
    getDevs() {
        //console.log(Devs)
        return Devs.find({}, {sort: {votes:-1}})
    },

    hasVotes(votes) {
        return votes > 0
    },

    stateClass() {
        //console.log(Session.equals('currentDev', this._id))
        return Session.equals('currentDev', this._id) ? 'indigo lighten-4' : ''
    },

    deleteDev() {
        return Session.equals('currentDev', this._id) ? 
            `<button class="deleteDev waves-effect waves-light btn red darken-4">
            <i class="Petite material-icons">delete</i></button>`
            : ''
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
    },

    'click button.deleteDev' : function(e) {
        let devId = Session.get('currentDev')
        swal({
            title: "Are you sure?",
            text: "This developer will be remove from the board!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            closeOnConfirm: false,
            html: false
            }, function() {
            Devs.remove(devId)
            swal("Deleted!",
            "Your user has been removed",
            "success")
        })

    }
})