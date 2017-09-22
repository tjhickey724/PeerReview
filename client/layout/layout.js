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
