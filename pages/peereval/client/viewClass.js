Template.viewClass.helpers({
  owns_class:function(theClass){
    return theClass.createdBy == Meteor.userId()

  }
})

Template.viewClass.events({
  "click .js-showStudentPin"(event,instance){
    console.dir(this);
    alert("Student Pin: "+this.class.studentPin);
  },
  "click .js-showTeacherPin"(event,instance){
    console.dir(this);
    alert("Teacher Pin: "+this.class.teacherPin);
  },

})
