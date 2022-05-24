import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import '../lib/collection.js';
import bootstrap from 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import './main.html';
import './navBar/navBar.html';
import './viewProfile/viewProfile.html';
import './addProfile/addProfile.html';
import './profiles/profiles.html';
import './confirmDel/confirmDel.html'

Template.nav.events({
  'click .js-add'() {
    $("#addModal").modal("show");
  }
});

Template.main.events({
  'click .js-saveProfile'() {
    // grad data from fields
    let pic = $("#profPic").val();
    let fname = $("#firstN").val();
    let lname = $("#lastN").val();
    let sex = $("#male").prop("checked") ? "male" : "female";

    if (validateAddForm(fname, lname)) {
      socialdb.insert({
        "picPath": pic,
        "fname": fname,
        "createdOn": new Date().getTime()
      });
      $("#addModal").modal("hide");
    }
  },
  'input #profPic'() {
    let path = $("#profPic").val();
    path = !path ? "unisex-avatar.png" : path;
    $("#displayPic").prop("src", path);
    console.log(path);
  },
  'click .js-view'() {
    let that = this;
    $("#docId").val(that._id);
    $("#chkMe").html("<h2>" + $("#chkMe").html() + "</h2>profile picture<br>first<br>last<br>age<br>sex<br>description");
    //console.table(that);
    $("#viewModal").modal("show");
  },
  "click .js-delete"() {
    let dId = $("#docId").val();
    $("#viewModal").modal("hide");
    $("#conDelModal").modal("show");
   // $("#" + dId).fadeOut("slow",() => {
  // socialdb.remove({
  //    "_id": dId
   // });
 // });
}
});

let validateAddForm = (fn, ln) => {
  let valid = true;
  $("#firstN").removeClass("errorBox");
  $("#lastN").removeClass("errorBox");

  if (!fn) {
    $("#firstN").addClass("errorBox");
    valid = false;
  }
  if (!ln) {
    $("#lastN").addClass("errorBox");
    valid = false;
  }
  return valid;
}

Template.profile.helpers({
  profiles() {
    return socialdb.find();
  }
});

// Template.hello.onCreated(function helloOnCreated() {
//   // counter starts at 0
//   this.counter = new ReactiveVar(0);
// });

// Template.hello.helpers({
//   counter() {
//     return Template.instance().counter.get();
//   },
// });

// Template.hello.events({
//   'click button'(event, instance) {
//     // increment the counter when button is clicked
//     instance.counter.set(instance.counter.get() + 1);
//   },
// });
