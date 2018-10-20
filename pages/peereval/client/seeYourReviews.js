Template.seeYourReviews.helpers({
  reviewlist:function(){
    return this.reviews},

  their_answer: function(aid){
    var a = Answers.findOne(aid);
    return a.answer;
  },

  other_reviews: function(aid){
    var rs = Reviews.find({answer_id:aid,createdBy:{$ne:Meteor.userId()}}).fetch();
    return _.pluck(rs,'rating');
  },

  same_answers: function(aid){
    var answer = Answers.findOne(aid);
    var answers = Answers.find({answer:answer.answer,createdBy:{$ne:answer.createdBy}}).fetch();

    if (answers.length>1) {
      console.dir(answers);
    }
    return answers
  },

  authorName: function(aid){
    var answer = Answers.findOne(aid);
    var profile = Profiles.findOne({id:answer.createdBy})
    return profile.email+" -- "+profile.name
  },

  author:function(uid){
    //console.log("uid="+uid);
    var author = Profiles.findOne({id:uid})
    return author.email + " -- "+author.name
  },

  answer: function(){
    if (!this.reviews[0])
      return undefined;
    var a = Answers.findOne({question:this.reviews[0].question_id});
    var q = Questions.findOne({_id:a.question});
    var z = {a:a, q:q};
    return z;
  }
})
