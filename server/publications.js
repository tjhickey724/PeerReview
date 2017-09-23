Meteor.publish("theProfiles",function(){return Profiles.find();});
Meteor.publish("theQuestions",function(){return Questions.find();});
Meteor.publish("theAnswers",function(){return Answers.find();});
Meteor.publish("theReviews",function(){return Reviews.find();});

process.env.HTTP_FORWARDED_COUNT = 1
