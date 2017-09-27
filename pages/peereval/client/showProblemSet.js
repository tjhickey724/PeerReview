Template.showProblemSet.helpers({
  questions(psid){
    return Questions.find({problemset_id:this.problemset._id,class_id:this.problemset.class_id})
},
owns_question:function(createdBy){
  return createdBy == Meteor.userId()
},
})
