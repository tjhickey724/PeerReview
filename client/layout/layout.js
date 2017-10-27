Template.layout.onCreated(function () {

   var instance = Template.instance();
    // subscribe to the posts publication
    var subscription = instance.subscribe('myProfiles');
    this.state = new ReactiveDict();
    this.state.set("stats",[]);

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
  },

  stats:function(){
    var instance = Template.instance();
    console.dir(instance);
    Meteor.call(
        "site_stats",
        [],
        function(err,result){
          console.dir(["stats",err,result])
          instance.state.set("stats",result)
        }
    )

    return JSON.stringify(instance.state.get("stats"));
  },

})
