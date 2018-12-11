
//QUESTIONPUBS

Meteor.publish("theQuestions",function(){
  return Questions.find(
    {$or:[{visible:true},{createdBy:this.userId}]}
  );
});

Meteor.publish("theClassQuestions",function(classId){
  //console.log("publishing theClassQuestions")
  var ps = ProblemSets.find({class_id:classId}).fetch()
  var psids = _.pluck(ps,'_id')
  //console.log(JSON.stringify(psids))

  var theQuestions= Questions.find(
     {$and:[
      {problemset_id:{$in:psids}},
      {$or:[{visible:true},{createdBy:this.userId}]}
     ]})
  return theQuestions
});

Meteor.publish("theQuestion",function(qid){
  return Questions.find(qid);
});
Meteor.publish("theQuestionsForPS",function(psid){
  return Questions.find(
    {problemset_id:psid}
  );
});

Meteor.publish("theQuestionForAnswer",function(aid){
  var ans = Answers.findOne(aid)
  if (ans) {
    var q = Questions.find(ans.question);
    return q
  } else {
    return this.ready()
  }

});


Meteor.publish("myQuestions",function(){
  return Questions.find({createdBy:this.userId})
})



Meteor.publish("theQuestionData",function(){
  return QuestionData.find()
})


//ANSWERPUBS

Meteor.publish("theAnswers",function(){
  return Answers.find();});

Meteor.publish("theAnswer",function(aid){
  return Answers.find(aid);});

Meteor.publish("oneAnswer",function(aid){
  var a = Answers.findOne(aid)
  var as = Answers.find({question:a.question})
  return as
});

Meteor.publish("theClassAnswers",function(classId){
  //console.log("publishing theClassQuestions")
  var ps = ProblemSets.find({class_id:classId}).fetch()
  var psids = _.pluck(ps,'_id')
  //console.log(JSON.stringify(psids))

  var theQuestions= Questions.find(
     {$and:[
      {problemset_id:{$in:psids}},
      {$or:[{visible:true},{createdBy:this.userId}]}
    ]}).fetch()
  var qids = _.pluck(theQuestions,'_id')
  return Answers.find({question:{$in:qids},createdBy:this.userId})
});

Meteor.publish("theAnswersToQuestion",function(qid){
  return Answers.find({question:qid});
});

Meteor.publish("thePSanswers",function(psid){
  var ps = ProblemSets.findOne(psid)
  var questions = Questions.find({problemset_id:psid}).fetch()
  var qids = _.pluck(questions,'_id')
  return Answers.find({question:{$in:qids}})
});



Meteor.publish("myAnswers",function(){
  return Answers.find({createdBy:this.userId})
})

Meteor.publish("myAnswerToQuestion",function(qid){
  return Answers.find({question:qid,createdBy:this.userId})
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



//REVIEWPUBS


Meteor.publish("theReviews",function(){return Reviews.find();});



//CLASSPUBS

Meteor.publish("theClassInfo",function(){return ClassInfo.find();});
Meteor.publish("oneClassInfo",function(id){return ClassInfo.find(id);});
Meteor.publish("theClassInfoForPS",function(psid){
  var ps = ProblemSets.findOne(psid);
  return ClassInfo.find(ps.class_id);});


//STUDENTPUBS

Meteor.publish("theStudentInfo",function(){
  return StudentInfo.find();});

Meteor.publish("oneStudentInfo",function(sid){
  return StudentInfo.find(sid);});

Meteor.publish("theStudentInfoForPS",function(psid){
  var ps = ProblemSets.findOne(psid);
  var the_class = ClassInfo.findOne(ps.class_id);
  return StudentInfo.find({class_id:the_class._id});});

Meteor.publish("theStudentInfoForClass",function(cid){
  var the_class = ClassInfo.findOne(cid);
  return StudentInfo.find({class_id:the_class._id});});


//PROBLEMSETPUBS

Meteor.publish("theProblemSets",function(){return ProblemSets.find();});
Meteor.publish("theProblemSet",function(psid){return ProblemSets.find(psid);});



//REVIEWPUBS

Meteor.publish("theTAreviews",function(psid){

  // get the TAs for the class
  // get the reviews written by those TAs
  var tas = StudentInfo.find({role:'teacher'}).fetch()
  if (! tas) {

    return this.ready()
  }
  var taids = _.map(tas,function(ta){return ta.student_id})
  var taReviews = Reviews.find({createdBy:{$in:taids}})

  return taReviews
})

Meteor.publish("theTAreviewsForPS",function(psid){

  // get the TAs for the class
  // get the reviews written by those TAs
  var tas = StudentInfo.find({role:'teacher'}).fetch()
  if (! tas) {

    return this.ready()
  }
  var qs = Questions.find({problemset_id:psid}).fetch()
    var qids = _.map(qs,function(q){return q._id})
    var taids = _.map(tas,function(ta){return ta.student_id})
  var taReviews = Reviews.find({question_id:{$in:qids}, createdBy:{$in:taids}})

  return taReviews
})



Meteor.publish('TAview',function(data){

  var course = ClassInfo.findOne(data.cid);


  var s = StudentInfo.findOne(data.sid)
  var me = StudentInfo.findOne({student_id:this.userId})

  if (course.createdBy==this.userId || (me && me.role=="teacher")){


    var rs=  Reviews.find({createdBy:s.student_id})
    var as=  Answers.find({createdBy:s.student_id})
    var qs=  Questions.find(data.cid)

    return [rs,as,qs]
  } else {
    return this.ready()
  }
})



Meteor.publish("theProfiles",function(){
  //console.log("Publishing theProfiles")
  return Profiles.find();});


Meteor.publish("myProfiles",function(){
  //console.log("publishing myProfiles")
  return Profiles.find({id:this.userId});});

Meteor.publish("profilesForClass",function(cid){
  //console.log('publishing profilesForClass')
  var studentsInClass = StudentInfo.find({class_id:cid}).fetch();
  //console.log('found studentsInClass: '+ studentsInClass.length)
  var studentIds = _.pluck(studentsInClass,'student_id');
  return Profiles.find({id:{$in:studentIds}});
});

Meteor.publish("profilesForProblemSet",function(psid){
  //console.log('publishing profilesForProblemSet')
  var cid = ProblemSets.findOne(psid).class_id
  var studentsInClass = StudentInfo.find({class_id:cid}).fetch();
  //console.log('found studentsInClass: '+ studentsInClass.length)
  var studentIds = _.pluck(studentsInClass,'student_id');
  return Profiles.find({id:{$in:studentIds}});
});

Meteor.publish("profilesForQuestion",function(qid){
  var cid = Questions.findOne(qid).class_id
  //console.log('publishing profilesForQuestion')
  var studentsInClass = StudentInfo.find({class_id:cid}).fetch();
  //console.log('found studentsInClass: '+ studentsInClass.length)
  var studentIds = _.pluck(studentsInClass,'student_id');
  return Profiles.find({id:{$in:studentIds}});
});

Meteor.publish("profilesForQuestionIfTA",function(qid){
  //console.log("publishing profilesForQuestionIfTA")
  var myInfo = StudentInfo.findOne({student_id:this.userId})
  var amTA = (myInfo && (myInfo.role=="teacher"))  // or I own the class ...
  if (!amTA) return this.ready()

  var cid = Questions.findOne(qid).class_id
  //console.log('publishing profilesForClass')
  var studentsInClass = StudentInfo.find({class_id:cid}).fetch();
  //console.log('found studentsInClass: '+ studentsInClass.length)
  var studentIds = _.pluck(studentsInClass,'student_id');
  return Profiles.find({id:{$in:studentIds}});
});

//var myInfo = StudentInfo.findOne({student_id:this.userId})
//var amTA = (myInfo && (myInfo.role=="teacher"))  // or I own the class ...


Meteor.publish("myReviews",function(qid){
  var rs=null
  if (qid)
    rs = Reviews.find({createdBy:this.userId,question_id:qid})
  else
    rs = []
  return rs
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

  var sinfo = StudentInfo.findOne(sid);

  var answers = Answers.find({createdBy:sinfo.student_id}).fetch();
  var reviews = Reviews.find({answer_id:{$in:_.pluck(answers,'_id')}})

  if (reviews.count()==0){
    return this.ready()
  } else {
    return reviews
  }
});

Meteor.publish("reviewsOfAnswersIreviewed",function(sid){

  var sinfo = StudentInfo.findOne(sid);

  var reviews = Reviews.find({createdBy:sinfo.student_id}).fetch()
  if (!reviews) return this.ready()

  var ansids = _.pluck(reviews,'answer_id')
  var reviews2 = Reviews.find({answer_id:{$in:ansids}})
  if (reviews2)
    return reviews2
  else {

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
  if (!answer){
    return this.ready()
  }

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
  if (myAns && myAns.reviewing) {
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
  var amTA = (myInfo && (myInfo.role=="teacher"))  // or I own the class ...


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
      // if I've just reviewed this one, then change the reviewing flag!

      Answers.update(myAns._id,{$unset:{reviewing:""}})
      myAns.reviewing = undefined
      // now drop through to the next if statement...
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
        submitted:true,
        createdBy:{$ne:this.userId,$nin:myAns.myReviews},
      }//,
      //{ sort:{numTAreviews:1}
    //  }
    ).fetch()
  } else {
    toReviewList = Answers.find(
      {
        question:qid,
        submitted:true,
        createdBy:{$ne:this.userId,$nin:myAns.myReviews},
      }//,
      //{ sort:{numReviews:1}
    //  }
    ).fetch()
  }

  if (toReviewList.length==0)
    return this.ready()

  var k = _.random(0,toReviewList.length-1)

  var nextReview = toReviewList[k]


  Answers.update(myAns._id,{$set:{reviewing:nextReview._id}})

  //return [nextReview]
  return Answers.find(nextReview._id)

})
