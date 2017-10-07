Meteor.publish("theProfiles",function(){return Profiles.find();});
Meteor.publish("theQuestions",function(){return Questions.find({visible:true});});
Meteor.publish("myQuestions",function(){
  return Questions.find({createdBy:this.userId})
})
Meteor.publish("theAnswers",function(){return Answers.find();});
Meteor.publish("theReviews",function(){return Reviews.find();});
Meteor.publish("theClassInfo",function(){return ClassInfo.find();});
Meteor.publish("theStudentInfo",function(){return StudentInfo.find();});
Meteor.publish("theProblemSets",function(){return ProblemSets.find();});

process.env.HTTP_FORWARDED_COUNT = 1
