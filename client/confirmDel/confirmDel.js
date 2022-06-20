Template.confirmDel.events({
    'click .js-conDel'() {
        console.log("confirming");
        $("#conDelModal").modal("hide");
        let cId = $("#conId").val();
        $("#" + cId).fadeOut("slow", () => {
          socialdb.remove({
                "_id": cId
           });
        });
    }
});