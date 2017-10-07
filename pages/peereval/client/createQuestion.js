Template.createQuestion.helpers({
  problemsets(){
    var z = {class_id:this.class._id};
    var w = ProblemSets.find(z);
    return w
  },

})


Template.createQuestion.events({
  "click .js-add-ps"(event,instance){
    var name = instance.$(".js-new-ps").val();
    var ps = {name:name,class_id:this.class._id}
    ProblemSets.insert(ps);
  },

  "click .js-submit-question": function(event,instance){
    event.preventDefault()

    var title = instance.$(".js-title").val()
    var question = instance.$(".js-question-description").val()
    var points = instance.$(".js-points").val()
    var rubric = instance.$(".js-rubric").val()
    var problemset_id = instance.$(".js-problem-set").val()
    var visible = instance.$("js-visible").prop('checked')

    var dbentry =
      {title:title,
       question:question,
       points:points,
       rubric:rubric,
       problemset_id:problemset_id,
       visible:visible,
       class_id:this.class._id,
       createdAt:(new Date()),
       createdBy:Meteor.userId()}


    if (this.question.question)
      Questions.update(this.question._id,dbentry)
    else
      Questions.insert(dbentry);
    Router.go('/viewClass/'+this.class._id);
  }
})
