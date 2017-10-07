Template.viewClass.helpers({

  owns_class:function(theClass){
    if (theClass.createdBy == Meteor.userId()) {
      return true;
    }
    var s = StudentInfo.findOne(
      {class_id:theClass._id,student_id:Meteor.userId()}
    )
    return s && s.role=="teacher";
  },

  student_id: function(theClass){

    var s = StudentInfo.findOne(
      {class_id:theClass._id,student_id:Meteor.userId()}
    )

    if (s) {
      return s._id;
    }
    return "";
  }
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
