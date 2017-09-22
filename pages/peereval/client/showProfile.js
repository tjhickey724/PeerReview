Template.showProfile.helpers({
  profile:function(){
    return Profiles.findOne({id:Meteor.userId()})
  },

})

Template.showProfile.events({
  "click .js-submit"(event, instance){
    name = instance.$(".js-name").val();
    email= instance.$(".js-email").val();
    id = Meteor.userId();
    profile = {name:name,email:email,id:id}
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
