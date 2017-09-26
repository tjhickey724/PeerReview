Template.createQuestion.helpers({
  problemsets(){
    console.dir(this);
    return ProblemSets.find({class_id:this.class._id})
  },

})


Template.createQuestion.events({
  "click .js-add-ps"(event,instance){
    var name = instance.$(".js-new-ps").val();
    ProblemSets.insert({name:name,class_id:this.class._id});
  },

  "click .js-submit-question": function(event,instance){
    event.preventDefault();

    var title = instance.$(".js-title").val();
    var question = instance.$(".js-question-description").val();
    var points = instance.$(".js-points").val();
    var rubric = instance.$(".js-rubric").val();
    var problemset_id = instance.$(".js-problem-set").val();
    console.log("problemset_id = '"+ problemset_id+ "'")


    var dbentry =
      {title:title,
       question:question,
       points:points,
       rubric:rubric,
       problemset_id:problemset_id,
       class_id:this.class._id,
       createdAt:(new Date()),
       createdBy:Meteor.userId()}

    Questions.insert(dbentry);
    Router.go('/viewClass/'+this.class._id);
  }
})
