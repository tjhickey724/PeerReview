Template.seeYourReviews.helpers({
  reviewlist:function(){
    return this.reviews},

  their_answer: function(aid){
    var a = Answers.findOne(aid);
    return a.answer;
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
