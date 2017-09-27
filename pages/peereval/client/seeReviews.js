Template.seeReviews.helpers({
  reviewlist:function(){
    return this.reviews},

  answer: function(){
    if (!this.reviews[0])
      return undefined;
    var a = Answers.findOne({question:this.reviews[0].question_id,createdBy:Meteor.userId()});
    var q = Questions.findOne({_id:a.question});
    var z = {a:a, q:q};
    return z;
  }
})
