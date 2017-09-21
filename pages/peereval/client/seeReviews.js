Template.seeReviews.helpers({
  reviewlist:function(){
    console.dir(this);
    return this.reviews},

  answer: function(){
    console.dir(this.reviews);
    const a = Answers.findOne({question:this.reviews[0].question_id});
    const q = Questions.findOne({_id:a.question});
    const z = {a:a, q:q};
    console.dir(z);
    return z;
  }
})
