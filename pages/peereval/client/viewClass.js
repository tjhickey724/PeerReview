Template.viewClass.helpers({

  owns_class:function(theClass){
    console.log("in owns_class: ")
    console.dir(theClass)
    if (theClass.createdBy == Meteor.userId()) {
      return true;
    }
    var s = StudentInfo.findOne(
      {class_id:theClass._id,student_id:Meteor.userId()}
    )
    return s && s.role=="teacher";
  },

  student_id: function(theClassId){
    console.log("cid="+theClassId)
    console.log("uid="+Meteor.userId())
    var s = StudentInfo.findOne(
      {class_id:theClassId,student_id:Meteor.userId()}
    )
    console.dir(s)

    if (s) {
      return s._id;
    }
    return "";
  },

  numAnswers: function(theClass){
    var cid = theClass._id
    console.log("class_id = "+cid);
    console.dir(theClass)
    return Answers.find({createdBy:Meteor.userId()}).count()
  },

  numQuestions: function(theClass){
    return Questions.find().count()
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
