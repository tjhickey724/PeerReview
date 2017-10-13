Meteor.methods({

  //MIGRATIONS FOR SCHEME CHANGES

  add_classids(){
    // this adds the class_id to all answers and reviews of each question
    //
    qs = Questions.find().fetch();
    qs.forEach(function(q){
      as = Answers.find({question:q._id}).fetch();
      rs = Reviews.find({question_id:q._id}).fetch();
      console.log("in add_classids, about to set");
      as.forEach(function(a){
        Answers.update(a._id,{$set:{class_id:q.class_id}})
      })
      rs.forEach(function(r){
        Reviews.update(r._id,{$set:{class_id:q.class_id}})
      })
    })
  },

  update_answers(){
    // this adds a few fields to each answer document
    var answers = Answers.find().fetch();
    answers.forEach(function(a){
      var numReviews = a.myReviewers.length;
      var numTAreviews = 0;
      a.myReviewers.forEach(function(r){
        var s = StudentInfo.findOne({student_id:r});
        if (s && (s.role=="teacher")) {
          numTAreviews = numTAreviews + 1
        }
      })

      Answers.update(a._id,{$set:{numReviews:numReviews,numTAreviews:numTAreviews}});
    })

  },

  update_students(){ // this sets all users to student mode
    console.log("updating students!")
    StudentInfo.update({},{$set:{role:"student"}},{multi:true})
  },

  show_all_questions(){
    // we need this to add the visible field to all questions
    // as we migrate to a new scheme
    Questions.update({},{$set:{visible:true}},{multi:true})
  },


/*
  getAnswers(qid){
    var z = Answers.find({question:qid}).count();
    QuestionData.update({question_id:qid},{$set:{answers:z}},{upsert:true})
    return z;
  },

  getReviews(qid){
    var answers = Answers.find({question:qid}).fetch();
    var ansids = _.pluck(answers,'_id')
    var z = Reviews.find({answer_id:{$in:ansids}}).count();
    QuestionData.update({question_id:qid},{$set:{reviews:z}},{upsert:true})
    return z;
  },
*/
  getAllQuestionData(){
    var Qs = Questions.find().fetch();
    Qs.forEach(function(q){getQuestionData(q._id)})
  },

  getQuestionData:function(qid){
    getQuestionData(qid)
  },




})

function getQuestionData(qid){
  var answers = Answers.find({question:qid}).fetch();
  var numAnswers = answers.length
  var ansids = _.pluck(answers,'_id')
  var reviews = Reviews.find({answer_id:{$in:ansids}}).fetch();
  var numReviews = reviews.length
  var sum=0;
  for (var i=0;i<reviews.length;i++){
    sum = sum + reviews[i].rating;
  }
  var rating = (sum/reviews.length*100);

  QuestionData.update(
    {question_id:qid},
    {$set:{rating:rating,answers:numAnswers,reviews:numReviews}},{upsert:true})
}
