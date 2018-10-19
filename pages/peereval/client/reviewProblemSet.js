Template.reviewProblemSet.helpers({
  isTA(class_id){
    var s = StudentInfo.findOne({class_id:class_id,student_id:Meteor.userId()})
    var c = ClassInfo.findOne(class_id);
    return ((s && s.role=='teacher') || c.createdBy ==Meteor.userId())
  },

  students(class_id){
    return StudentInfo.find({class_id:class_id})},

  tas(class_id){
    return StudentInfo.find({class_id:class_id,role:'teacher'})},

  studentName(student_id){
    var p =  Profiles.findOne({id:student_id})
    return p.name;
  }



})


Template.studentProblemSetData.helpers({
  name(student_id){
    var p =  Profiles.findOne({id:student_id})
    return p.name;
  },
  email(student_id){
    var p =  Profiles.findOne({id:student_id})
    return p.email;
  },

  questions(psid){
    return Questions.find({problemset_id:psid})
  },

  scores(student, problemset){
    // find all problems in the problem set
    // find the student's answers to those problems
    // find all TA reviews of each answer (if any) and average them
    // return the list of TA reviews
    //    use 0 if the student didn't answer the question
    //    use N/A if the student answered it but no TA reviewed it
    var questions = Questions.find({problemset_id:problemset._id}).fetch()
    var answers =
      _.map(questions,
            function(q){
             return Answers.findOne({question:q._id,createdBy:student.student_id})
            }
           )
    var reviewScores =
    _.map(answers,
        function(a){
          if (!a) return 0
          var rs = Reviews.find({answer_id:a._id}).fetch();
          if (rs.length==0) return a._id
          var scores = _.pluck(rs,'rating');
          var sum = _.reduce(scores,function(a,b){return a+b},0)
          return (sum/scores.length)
        })
    var totalScore = 0;
    var sum = 0;
    reviewScores.forEach(
      function(s){
        if (_.isNumber(s)){
          sum = sum + s
        } else {
          totalScore = "N/A"
        }
      })
    if (totalScore==0){
      totalScore = sum;
    }
    //totalScore = sum.toFixed(1);
    reviewScores.push(totalScore)
    reviewScores = _.map(reviewScores,
      function(x){
        if (_.isNumber(x)){
          return {val:x.toFixed(1),link:''}
        } else {
          return {val:'N/A', link:x}
        }
      })

    return reviewScores
  },




})
