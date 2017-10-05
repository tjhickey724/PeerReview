Template.home.helpers({
  classes:function(){
    return StudentInfo.find({student_id:Meteor.userId(), role:"student"})
  },

  mytaclasses:function(){
    return StudentInfo.find({student_id:Meteor.userId(),role:"teacher"})
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
    var status = 'student';
    if (!theClass){
      theClass = ClassInfo.findOne({teacherPin:classcode})
      status = 'teacher';
    }

    if (!theClass){
      alert("There is no class with PIN ="+classcode)
      return
    }

    var sinfo = StudentInfo.findOne(
           {student_id:Meteor.userId(),
              class_id:theClass._id})
    if (sinfo) {
      if (sinfo.role!=status) {
          alert("Switching roles from "+sinfo.role+" to "+status);
          StudentInfo.update(sinfo._id,{$set:{role:status}})
      } else {
          alert("You are already in that class!");
      }
    } else {
      var student =
      {class_id:theClass._id,
       class_name:theClass.name,
       student_id:Meteor.userId(),
       createdAt:new Date(),
       role:status
       }
      StudentInfo.insert(student);
    }
  },

})
