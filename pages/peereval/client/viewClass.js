Template.viewClass.helpers({
  owns_class:function(theClass){
    return theClass.createdBy == Meteor.userId()

  }
})
