Template.reviewAnswers.helpers({
  question: function(){console.dir(this.q.question); return this.q.question},
  answers: function(){
    const answerList = Answers.find({question:this.q._id});
    return answerList},


})

Template.reviewAnswers.events({
  "click js-answer-list": function(event){
    console.log("clicked on answer list");
  }
})

Template.reviewAnswer.helpers({
  hasAnswer:function(a){
    return a
  },

  points: function(){
    console.dir(this);
    console.log(this.q.points+" points");
    return(_.range(parseInt(this.q.points)+1));
  },

})

Template.reviewAnswer.events({
  "click .js-submit-review": function(event){
    console.log("you clicked on the submit review button!");
    console.dir(this);
    const rating = $(".js-rate-answer").val();
    const theReview = $(".js-review-answer").val();
    const reviewObj =
      {rating:parseInt(rating),
       review:theReview,
       createdAt: new Date(),
       createdBy: Meteor.userId(),
       question: this.q.question,
       question_id: this.q._id,
       answer_id: this.a._id};
    console.dir(reviewObj);
    // I should send myAnswer to this as a parameter
    myAnswer = Answers.findOne({createdBy:Meteor.userId(),question:this.q._id});
    Answers.update(myAnswer._id,{$push:{myReviews:this.a.createdBy}});
    console.dir(['this.toReview',this.a]);
    Answers.update(this.a._id,{$push:{myReviewers:Meteor.userId()}});
    z = Reviews.insert(reviewObj);
    console.dir(['z',z]);
    Router.go('/showQuestionFull/'+this.q._id);
    //updateToReview();
  }
})
