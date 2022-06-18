Template.profile.events({
    'click .js-rate'(event) {
        let that = this;
        let rating = $(event.currentTarget).data('userrating');
        let rId = $(that).attr("data-id");
        console.log(rId, rating);
        socialdb.update(
            { "_id": rId },
            {
                $set: {
                    "rating": rating
                }
            }
        );
    }
});
















Meteor.subscribe("name");

Template.profile.helpers({
    profiles() {
        return socialdb.find();
    }
});