Template.layout.helpers({
  owns_class:function(){
    console.log('in owns_class');
    var class_id = Session.get('class_id');
    var theClass = ClassInfo.findOne(class_id);
    console.dir(['owns_class',class_id,theClass]);
    return theClass.createdBy==Meteor.userId();
  },

  current_class:function(){
    var class_name = Session.get('class_name');
    var class_id = Session.get('class_id');
    var owns_class = ClassInfo.findOne({_id:class_id,createdBy:Meteor.userId()});
    var student_info = StudentInfo.findOne(
      {class_id:class_id,
       student_id:Meteor.userId()})
    var zz = class_name & student_info;
    console.dir(['current_class',class_name,class_id,student_info,zz])
    if (class_name && (owns_class || student_info)) return class_name;
    else {
      console.log('logging out!!');
      Session.set('class_name',undefined);
      Session.set('class_id',undefined);
      return "no class selected";
    }
  }
})
