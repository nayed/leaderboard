import { Meteor } from 'meteor/meteor'
import { Devs } from '../imports/api/devs.js'
import { Votes } from '../imports/api/votes.js'

import '../imports/configs/at_configs.js'


if (Meteor.isServer) {
    Meteor.methods({
        nbVotesLeft: function() {
            let pipeline = [{
                $group: {
                    _id: {userId: "$userId", dateVote: "$dateVote"},
                    count: {$sum: 1}
                }
            }]
            console.log(Votes.aggregate(pipeline))
        }
    })
}


Meteor.startup(() => {
  // code to run on server at startup
})