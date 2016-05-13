import { Meteor } from 'meteor/meteor'
import { Devs } from '../imports/api/devs.js'
import { Votes } from '../imports/api/votes.js'

import '../imports/configs/at_configs.js'


let dayOfToday = new Date()
let strDayToday = `${dayOfToday.getDate()}-${dayOfToday.getMonth()}-${dayOfToday.getFullYear()}`


if (Meteor.isServer) {
    Meteor.methods({
        nbVotesLeft: function() {
            let pipeline = [
            {$match: {userId: Meteor.userId(), dateVote: strDayToday}},
            {
                $group: {
                    _id: {userId: Meteor.userId(), dateVote: strDayToday},
                    count: {$sum: 1}
                }
            }]
            console.log(Votes.aggregate(pipeline))
            return Votes.aggregate(pipeline)
        }
    })
}


Meteor.startup(() => {
  // code to run on server at startup
})