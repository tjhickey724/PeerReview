Template.showProfile.helpers({
  profile:function(){
    var profile = Profiles.findOne({id:Meteor.userId()})
    var u =  Meteor.users.findOne({_id:Meteor.userId()})
    // this is backward compatability code to add accountType to old existing accounts
    if (profile && !profile.accountType) {
      if (u.services && u.services.google){
        profile.rname = u.services.google.name;
        profile.remail = u.services.google.email;
        profile.accountType = "google"
      }
      else if (u.emails) {
        profile.remail = u.emails[0].address;
        profile.rname =  profile.remail.split("@")[0];
        profile.accountType="password"
      }
      Profiles.update(profile._id,profile);
    }
    return profile;
  },

})

Template.showProfile.events({
  "click .js-submit"(event, instance){
    name = instance.$(".js-name").val();
    email= instance.$(".js-email").val();
    id = Meteor.userId();
    profile = {name:name,email:email,id:id}
    var u =  Meteor.users.findOne({_id:Meteor.userId()})
    if (u.services && u.services.google){
      profile.rname = u.services.google.name;
      profile.remail = u.services.google.email;
      profile.accountType = "google"
    }
    else if (u.emails) {
      profile.remail = u.emails[0].address;
      profile.rname =  profile.remail.split("@")[0];
      profile.accountType="password"
    }
    Profiles.insert(profile);
  },

  "click .js-update"(event, instance){
    name = instance.$(".js-name").val();
    email= instance.$(".js-email").val();
    id = Meteor.userId();
    profile = Profiles.findOne({id:id});
    profile.name=name
    profile.email=email
    Profiles.update(profile._id,profile);
    alert("Profile has been updated!\nname:"+name+"\nemail: "+email+"\n");
    Router.go('home')
  }
})
