Meteor.methods({

    site_stats(){
      var qs = Questions.find().count();
      var as = Answers.find().count();
      var rs = Reviews.find().count();
      var ps = ProblemSets.find().count();
      var cs = ClassInfo.find().count();
      var ss = StudentInfo.find().count();
      var prs = Profiles.find().count();
      return {Questions:qs,Answers:as,Reviews:rs,ProblemSets:ps,Classes:cs,Students:ss,Profiles:prs};
    },

    submit_all_answers(question){
      //console.log("here is where I set the submitted flag to True for all answers to this question!")
      var a = Answers.update({question:question._id},{$set:{submitted:true}},{multi:true})
      //console.dir(a)
    },

    update_summary(class_id){

      // this updates the summary info for each student in a class
      // get all students in the class
      var z = {class_id:class_id}
      var students = StudentInfo.find(z).fetch();
      // get all questions from the class
      var qs = Questions.find({class_id:class_id}).fetch()
      students.forEach(function(s){

        // all answers by student s in this class
        var as = Answers.find({createdBy:s.student_id,class:class_id}).fetch()
        // all reviews by student s in this class
        var rs = Reviews.find({createdBy:s.student_id,class_id:class_id}).fetch()
        // for each answer, find the average review value
        var profile = Profiles.findOne({id:s.student_id})

        var numReviewed=0;
        var total=0.0
        var reviews=[];
        as.forEach(function(a){
            var rs = Reviews.find({answer_id:a._id}).fetch();
            if (rs.length>0){
              numReviewed = numReviewed+1
              var question = Questions.findOne(a.question)
              var sum=0.0;
              rs.forEach(function(r){sum = sum+r.rating})
              var z =  sum/question.points/rs.length;
              reviews.push(z);
              total = total + z
            }
        })
        var avgR = -1
        if (numReviewed>0)
          avgR =  Math.round(total/numReviewed*100)
        else {
          avgR = "no reviews yet"
        }

        s.numAnswers = as.length;
        s.numReviewedAnswers = numReviewed;
        s.avgReview = avgR;
        s.numReviews = rs.length;
        s.email = profile.email.toLowerCase();
        StudentInfo.update(s._id,s);


      })
      //console.log("summary updated")
    },



    update_summary_ps(psid){
      //console.log("update_summary_ps: "+psid)
      // this updates the summary info for each student in a class
      // get all students in the class
      var ps = ProblemSets.findOne(psid)
      var class_id = ps.class_id
      var z = {class_id:class_id}
      var students = StudentInfo.find(z).fetch();
      // get all questions from the class
      var qs = Questions.find({problemset_id:psid}).fetch()
      var qids = _.pluck(qs,'_id')
      //console.log("qids=")
      //console.dir(qids)
      students.forEach(function(s){

        // all answers by student s in this class
        var as = Answers.find({createdBy:s.student_id,
                question:{$in:qids}}).fetch()
        // all reviews by student s in this class
        var rs = Reviews.find({createdBy:s.student_id,
                question_id:{$in:qids}}).fetch()
        // for each answer, find the average review value

        var numReviewed=0;
        var total=0.0
        var reviews=[];
        as.forEach(function(a){
            var rs = Reviews.find({answer_id:a._id}).fetch();
            if (rs.length>0){
              numReviewed = numReviewed+1
              var question = Questions.findOne(a.question)
              var sum=0.0;
              rs.forEach(function(r){sum = sum+r.rating})
              var z =  sum/question.points/rs.length;
              reviews.push(z);
              total = total + z
            }
        })
        var avgR = -1
        if (numReviewed>0)
          avgR =  Math.round(total/numReviewed*100)
        else {
          avgR = "no reviews yet"
        }

        s.numAnswers = as.length;
        s.numReviewedAnswers = numReviewed;
        s.avgReview = avgR;
        s.numReviews = rs.length;
        StudentInfo.update(s._id,s);


      })
      //console.log("summary updated")
    },

})
