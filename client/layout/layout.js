Template.layout.onCreated(function () {

   var instance = Template.instance();
    // subscribe to the posts publication
    var subscription = instance.subscribe('myProfiles');

});

Template.layout.helpers({
  owns_class:function(){
    return true;
  },

  current_class:function(){
    return "????";
  },

  profile: function(){
    return Profiles.findOne({id:Meteor.userId()});
  }
})
