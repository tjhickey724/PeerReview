Template.home.helpers({
  classes:function(){
    return StudentInfo.find({student_id:Meteor.userId(),})
  },

  myclasses:function(){
    return ClassInfo.find({createdBy:Meteor.userId()})
  },

  theClass:function(){
    return Session.get('class_name');
  },

})

Template.home.events({
  "click #viewClass"(event,instance){
    console.dir(this.class);
    Session.set('class_id',this.class.class_id);
    Session.set('class_name',this.class.class_name);
  },

  "click #viewMyClass"(event,instance){
    console.log('clicking on view my class');
    console.dir(this.class);
    Session.set('class_id',this.class._id);
    Session.set('class_name',this.class.name);
  },

  "click #joinclass"(event,instance){
    console.log('setting the class');
    var classcode = instance.$("#classcode").val();
    console.dir(classcode);
    var theClass = ClassInfo.findOne({studentPin:classcode});
    console.dir(theClass);
    Session.set('class_id',theClass._id);
    Session.set('class_name',theClass.class_name);
    var student =
    {class_id:theClass._id,
     class_name:theClass.name,
     student_id:Meteor.userId(),
     createdAt:new Date(),
     role:'student'
     }
    StudentInfo.insert(student);
  },

})
