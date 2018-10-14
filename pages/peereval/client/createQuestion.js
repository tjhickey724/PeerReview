Template.createQuestion.helpers({
  problemsets(){

    var z = {class_id:this.class._id};

    var w = ProblemSets.find(z).fetch();

    return w.reverse()
  },

  selectedPS(psid){
    if (this.question.problemset_id==psid) {
      return "selected"
    } else {
      return ""
    }

  },

  visible(){

    if (this.question.visible)
    return "checked"
    else return ""
  },

  quizQuestion(){

    if (this.question.quizQuestion)
    return "checked"
    else return ""
  }

})


Template.createQuestion.events({

  "click .js-endQuiz"(event, instance){
    // set the .submitted field of all answers to this question to True
    // but this has to be a meteor method ... as it is affecting all
    // answers to this question ...
    console.dir(this);
    Meteor.call('submit_all_answers',[this.question])
  },

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
    var visible = instance.$(".js-visible").prop('checked')
    var quizQuestion = instance.$(".js-quizQuestion").prop('checked');

    var dbentry =
      {title:title,
       question:question,
       points:points,
       rubric:rubric,
       problemset_id:problemset_id,
       visible:visible,
       quizQuestion:quizQuestion,
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
