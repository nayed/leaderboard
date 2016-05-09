import { Devs } from '../api/devs.js'

Template.devsList.helpers({
    getDevs() {
        console.log(Devs)
        return Devs.find()
    },

    hasVotes(votes) {
        return votes > 0
    }
})
