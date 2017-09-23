Template.home.helpers({
  classes:function(){
    return StudentInfo.find({student_id:Meteor.userId(),})
  },

  myclasses:function(){
    return ClassInfo.find({createdBy:Meteor.userId()})
  },


})

Template.home.events({

  "click #joinclass"(event,instance){

    var classcode = instance.$("#classcode").val();
    instance.$("#classcode").val("")

    var theClass = ClassInfo.findOne({studentPin:classcode});
    var sinfo = StudentInfo.findOne({student_id:Meteor.userId()});
    if (!theClass){
      alert("There is no class with PIN ="+classcode);
    }else if (sinfo) {
      alert("You are already in that class!");
      return;
    } else {
      var student =
      {class_id:theClass._id,
       class_name:theClass.name,
       student_id:Meteor.userId(),
       createdAt:new Date(),
       role:'student'
       }
      StudentInfo.insert(student);
    }
  },

})
