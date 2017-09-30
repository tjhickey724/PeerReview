Template.reviewAnswers.helpers({
  question: function(){ return this.q.question},
  answers: function(){
    var answerList = Answers.find({question:this.q._id});
    return answerList},


})

Template.reviewAnswers.events({
  "click js-answer-list": function(event){

  }
})

Template.reviewAnswer.helpers({
  otherReviews:function(aid){
    var reviews = Reviews.find({answer_id:aid});
    return reviews
  },

  selected:function(point,val){
    console.log("in selected "+point+" "+val+ " "+(point==val));
    if (point==val)
      return "selected"
    else {
        return ""
    }
  },

  hasAnswer:function(a){
    return a
  },

  points: function(){

    return(_.range(parseInt(this.q.points),-1,-1));
  },

})

Template.reviewAnswer.events({
  "click .js-submit-review": function(event){
    console.dir(this);

    var rating = $(".js-rate-answer").val();
    var theReview = $(".js-review-answer").val();
    var reviewObj =
      {rating:parseInt(rating),
       review:theReview,
       createdAt: new Date(),
       createdBy: Meteor.userId(),
       question: this.q.question,
       question_id: this.q._id,
       answer_id: this.a._id,
       class_id: this.q.class_id};

    // I should send myAnswer to this as a parameter
    myAnswer = Answers.findOne({createdBy:Meteor.userId(),question:this.q._id});

    if (this.r._id) {
      Reviews.update(this.r._id,reviewObj);
    } else {
      Answers.update(myAnswer._id,{$push:{myReviews:this.a.createdBy}});
      Answers.update(this.a._id,{$push:{myReviewers:Meteor.userId()}});
      z = Reviews.insert(reviewObj);
    }

    Router.go('/showQuestionFull/'+this.q._id);
    //updateToReview();
  }
})
