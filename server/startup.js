Meteor.startup(function(){

  Reviews._ensureIndex({answer_id:1})
  Reviews._ensureIndex({createdBy:1,class_id:1})
  Reviews._ensureIndex({question_id:1})

  Answers._ensureIndex({question:1})
  Answers._ensureIndex({question:1,createdBy:1})
  Answers._ensureIndex({createdBy:1})
  Answers._ensureIndex({createdBy:1,class_id:1})

  StudentInfo._ensureIndex({student_id:1,role:1})

  Questions._ensureIndex({class_id:1})
  Questions._ensureIndex({problemset:1,class_id:1})
  Questions._ensureIndex({problemset:1})
  
});
