import { Devs } from '../api/devs.js'
import { Votes } from '../api/votes.js'
import { Session } from 'meteor/session'

let dayOfToday = new Date()
let strDayToday = `${dayOfToday.getDate()}-${dayOfToday.getMonth()}-${dayOfToday.getFullYear()}`

Template.vote.helpers({
    getDevs() {
        return Devs.find({}, {sort: {votes:1}})
    },

    hasVotes(votes) {
        return votes > 0
    },

    stateClass() {
        return Session.equals('currentDev', this._id) ? 'indigo lighten-4' : ''
    },

    deleteDev() {
        return Session.equals('currentDev', this._id) ? 
            `<button class="deleteDev waves-effect waves-light btn red darken-4">
            <i class="small material-icons">delete</i></button>`
            : ''
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
    },

    nbVotesLeft() {
        let maxVote = 3
        let leftVotes = 0
        Meteor.call("nbVotesLeft", function(err, response) {
            if (err) return err
            console.log(response.length)
            if (response.length > 0) {
                Session.set("votedToday", response[0].count)
            }
        })
        
        if (Session.get("votedToday")) {
            leftVotes = maxVote - Session.get("votedToday")
        }
        else {
            leftVotes = maxVote
        }
        return leftVotes
    }
})

Template.registerHelper('greaterThan', function(a, b) {
    //console.log(a > b)
    return a > b
})

Template.registerHelper('lessThan', function(a, b) {
    return a < b
})

Template.vote.events({
    'click td.devName': function(e) {
        Session.set('currentDev', this._id)
    },

    'click button.voteBtn': function(e) {
        let devId = Session.get('currentDev')
        Devs.update(devId, {$inc: {votes : 1}})
        Votes.insert({userId: Meteor.userId(), dateVote: strDayToday})
    },

    'click button.deleteDev': function(e) {
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
                swal("Deleted!", "Your user has been removed", "success")
        })
    },

    'click #modalAdd': function(e) {
        e.preventDefault()
        $('.modal-trigger').leanModal()
    },

    'submit form#formAddDev': function(e) {
        e.preventDefault()
        let devName = e.target.fieldName.value
        Devs.insert({name: devName, votes: 0})
        swal("Added!", `Developer ${devName} was created`, "success")
        e.target.fieldName.value = ''
    }
})