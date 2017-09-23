Meteor.methods({
  add_classids(){
    qs = Questions.find().fetch();
    qs.forEach(function(q){
      as = Answers.find({question:q._id}).fetch();
      rs = Reviews.find({question_id:q._id}).fetch();
      as.forEach(function(a){
        Answers.update(a._id,{$set:{class_id:q.class_id}})
      })
      rs.forEach(function(r){
        Reviews.update(r._id,{$set:{class_id:q.class_id}})
      })
    })
  }
})
