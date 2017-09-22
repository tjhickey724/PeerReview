Template.showStudents.helpers({
  students:function(theClass){
    return StudentInfo.find({class_id:theClass._id});
  },
  questions:function(theClass){
    return Questions.find({class_id:theClass._id})
  }
})

Template.showStudent.helpers({
  profile:function(){
    var profile = Profiles.findOne({id:this.student.student_id});
    return profile},

  answers:function(){
    return Answers.find({createdBy:this.student.student_id})
  },

  questions:function(class_id){
    return Questions.find({class_id:class_id})
  },

  numReviews:function(question){
    var z = {createdBy:this.student.student_id,question:question._id}
    console.dir(z)
    var a = Answers.findOne(z)
    console.dir(a);
    return a.myReviews.length;
  }

})
