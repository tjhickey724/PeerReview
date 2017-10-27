Template.datasize.onCreated(function(){
   this.state = new ReactiveDict();
   this.state.set("stats",[]);
})


Template.datasize.helpers({

  questions(){return Questions.find().count()},
  answers(){return Answers.find().count()},
  reviews(){return Reviews.find().count()},
  students(){return StudentInfo.find().count()},
  classes(){return ClassInfo.find().count()},
  profiles(){return Profiles.find().count()},
  problemsets(){return ProblemSets.find().count()},
  stats:function(){
    var instance = Template.instance();
    var stats = instance.state.get("stats");
    Meteor.call(
        "site_stats",
        [],
        function(err,result){
          console.dir(["stats",err,result])
          instance.state.set("stats",result)
        }
    )

    return instance.state.get("stats");
  },

})
