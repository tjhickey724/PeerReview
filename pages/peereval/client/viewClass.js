Template.viewClass.helpers({
  owns_class:function(theClass){
    return theClass.createdBy == Meteor.userId()
  },
})

Template.viewClass.events({
  "click .js-showStudentPin"(event,instance){
    alert("Student Pin: "+this.class.studentPin);
  },
  "click .js-showTeacherPin"(event,instance){
    alert("Teacher Pin: "+this.class.teacherPin);
  },

})

Template.showProblemSets.helpers({
  problemsets(){
    return ProblemSets.find({class_id:this.class._id});
  }
})
