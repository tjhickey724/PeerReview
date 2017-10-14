Meteor.publish("theProfiles",function(){return Profiles.find();});
Meteor.publish("theQuestions",function(){return Questions.find({visible:true});});
Meteor.publish("theAnswers",function(){return Answers.find();});
Meteor.publish("theReviews",function(){return Reviews.find();});
Meteor.publish("theClassInfo",function(){return ClassInfo.find();});
Meteor.publish("theStudentInfo",function(){return StudentInfo.find();});
Meteor.publish("theProblemSets",function(){return ProblemSets.find();});


Meteor.publish('TAview',function(data){

  var course = ClassInfo.findOne(data.cid);


  var s = StudentInfo.findOne(data.sid)


  if (course.createdBy==this.userId){


    var rs=  Reviews.find({createdBy:s.student_id})
    var as=  Answers.find({createdBy:s.student_id})
    var qs=  Questions.find()

    return [rs,as,qs]
  } else {
    return this.ready()
  }
})


Meteor.publish("myProfiles",function(){
  return Profiles.find({id:this.userId});});

Meteor.publish("myQuestions",function(){
  return Questions.find({createdBy:this.userId})
})

Meteor.publish("theQuestionData",function(){
  return QuestionData.find()
})

Meteor.publish("myAnswers",function(){
  return Answers.find({createdBy:this.userId})
})

Meteor.publish("answersReviewedBy",function(sid){
  var sinfo = StudentInfo.findOne(sid);
  var myReviews =
   Reviews.find({createdBy:sinfo.student_id});
   var ans = _.pluck(myReviews.fetch(),'answer_id')
   return Answers.find({_id:{$in:ans}});
})

Meteor.publish("answers2question",function(qid){
  return Answers.find({question:qid})
})

Meteor.publish("myReviewedAnswers",function(qid){
  return Answers.find({myReviewers:this.userId,question:qid})
})

Meteor.publish("myReviews",function(qid){
  return Reviews.find({createdBy:this.userId,question_id:qid})
});

Meteor.publish("reviewsOfMe",function(aid){
  var ans = Answers.findOne({_id:aid,createdBy:this.userId});
  if (ans){
    return Reviews.find({answer_id:aid})
  } else {
    return ans
  }
});

Meteor.publish("allReviewsOfMe",function(){
  var ans = Answers.find({createdBy:this.userId});
  if (!ans) return this.ready()

  myAnswers = _.pluck(ans.fetch(),'_id')
  if (myAnswers != []){
    return Reviews.find({answer_id:{$in:myAnswers}})
  } else {
    return this.ready();
  }
});



Meteor.publish("reviewsOfanswer2",function(aid){
  var reviews = Reviews.find({answer_id:aid});
  if (reviews.count()==0){
    return this.ready()
  } else {
    return reviews
  }
});

Meteor.publish("allReviewsOfStudent",function(sid){
  console.log("*****/n/n/n/n******/n/n/n****roS="+sid)
  var sinfo = StudentInfo.findOne(sid);
  console.dir(sinfo)
  var answers = Answers.find({createdBy:sinfo.student_id}).fetch();
  var reviews = Reviews.find({answer_id:{$in:_.pluck(answers,'_id')}})
  console.log('revs='+reviews.count())
  if (reviews.count()==0){
    return this.ready()
  } else {
    return reviews
  }
});

Meteor.publish("reviewsOfAnswersIreviewed",function(sid){
  console.log("*****/n/n/n/n******/n/n/n****roair="+sid)
  var sinfo = StudentInfo.findOne(sid);
  console.dir(sinfo)
  var reviews = Reviews.find({createdBy:sinfo.student_id})
  console.log("numreviews = "+reviews.count())
  var ansids = _.pluck(reviews,'answer_id')
  var reviews = Reviews.find({answer_id:{$in:ansids}})
  if (reviews)
    return reviews
  else {
    console.log('problem in roair')
    return this.ready()
  }
})

Meteor.publish("reviewsOfquestion",function(qid){
  var reviews = Reviews.find({question_id:qid});
  if (reviews.count()==0){
    return this.ready()
  } else {
    return reviews
  }
});

Meteor.publish("reviewsOfmyanswer",function(qid){

  var answer = Answers.findOne({question:qid,createdBy:this.userId})

  var reviews = Reviews.find({answer_id:answer._id});
  if (reviews.count()==0){
    return this.ready()
  } else {
    return reviews
  }
});

Meteor.publish("reviewsOfanswer",function(qid){

  var myAns = Answers.findOne({question:qid,createdBy:this.userId}); // find the answer

  // check to see if the user has answered this question
  if (myAns.reviewing) {
      var reviews = Reviews.find({answer_id:myAns.reviewing});
      myAns = Answers.find({question:qid,createdBy:this.userId})

      return [reviews,myAns]
  } else {
    return this.ready()
  }
});

Meteor.publish("myClassInfo",function(){
  var sinfo = StudentInfo.find({student_id:this.userId}).fetch();
  var myclassids = _.pluck(sinfo,'class_id')
  var myclasses = ClassInfo.find({_id:{$in:myclassids}});
  return myclasses
});

Meteor.publish("classesOwnedByMe",function(){
  var myclasses = ClassInfo.find({createdBy:this.userId});
  return myclasses
});

Meteor.publish("myStudentInfo",function(){
  return StudentInfo.find({student_id:this.userId});});

Meteor.publish("myProblemSets",function(){
  var sinfo = StudentInfo.find({student_id:this.userId}).fetch();
  var cinfo = ClassInfo.findOne({createdBy:this.userId})
  var myclasses = _.pluck(sinfo,'class_id')
  var classIown = _.pluck(cinfo,'_id');
  return ProblemSets.find({class_id:{$in:_.union(myclasses,classesIown)}});});

  Meteor.publish("myProblemSet",function(cid){
    var sinfo = StudentInfo.findOne({student_id:this.userId,class_id:cid});
    var cinfo = ClassInfo.findOne({_id:cid,createdBy:this.userId})

    if (sinfo || cinfo)
      return ProblemSets.find({class_id:cid})
    else {
      return this.ready();
    }
  });

process.env.HTTP_FORWARDED_COUNT = 1


Meteor.publish('toReview',function(qid){

  var q = Questions.findOne({_id:qid});
  var toReview={}
  var query = {question:qid,createdBy:this.userId};
  var myAns = Answers.findOne(query)
  var myInfo = StudentInfo.findOne({student_id:this.userId})
  var amTA = (myInfo && (myInfo.role="teacher"))  // or I own the class ...


  if (!myAns){
    return this.ready() // I can only review if I have answered the question
  }

  // first look for a reviewing field in myAns which specifies
  // which answer I'm currently reviewing... when I'm done
  // reviewing it I'll set this to undefined.
  if (myAns.reviewing){
    var nextReview = Answers.findOne(myAns.reviewing);
    toReview = {r:{rating:-1,review:""},q:q,a:nextReview,test:"This is a test!"}

    if (_.contains(nextReview.myReviewers,this.userId)) {
      // if I've just reviewed this on, the change the reviewing flag!

      Answers.update(myAns._id,{$unset:{reviewing:""}})
      myAns.reviewing = undefined
    } else {

        toReview = Answers.find(myAns.reviewing)

        return toReview
      }
  }

  // in this case, I am not currently reviewing any answers, so time to find a new one
  var toReviewList = [];
  // first we look at the case of a TA!
  if (amTA){
    toReviewList = Answers.find(
      {
        question:qid,
        createdBy:{$ne:this.userId,$nin:myAns.myReviews},
      },
      { sort:{numTAreviews:1}
      }
    )
  } else {
    toReviewList = Answers.find(
      {
        question:qid,
        createdBy:{$ne:this.userId,$nin:myAns.myReviews},
      },
      { sort:{numReviews:1}
      }
    )
  }

  if (toReviewList==[])
    return this.ready()

  var k = _.random(0,toReviewList.length-1)

  var nextReview = toReviewList[k]


  Answers.update(myAns._id,{$set:{reviewing:nextReview._id}})

  return [nextReview]

})
