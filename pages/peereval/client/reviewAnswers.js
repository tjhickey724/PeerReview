

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


Template.reviewAnswer.onCreated(function(){

  var instance = Template.instance();
  instance.state =  new ReactiveDict();
  instance.state.setDefault({
    answer:false,
  });

  instance.autorun(function () {
    console.log('in autorun');
    var answer = instance.state.get('answer');
    if (!answer) {
      return;
    }
    var subscription = instance.subscribe('reviewsOfanswer2',answer);

    // if subscription is ready, set limit to newLimit
    if (subscription.ready()) {
      console.log("> Reviewing "+answer+" \n\n")
    } else {
      console.log("> Subscription is not ready yet. \n\n");
    }
 });

  //instance.answer = new ReactiveDict()
  //instance.subscribe
})

Template.reviewAnswer.helpers({

  otherReviews:function(aid){

    var instance = Template.instance();
    var reviews = Reviews.find({answer_id:aid});
    instance.state.set('answer',aid);
    return reviews
  },

  selected:function(point,val){
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
  "click .js-back"(event,instance){
    Router.go("/showQuestionFull/"+this.q._id)
  },


  "click .js-submit-review": function(event){


    var rating = $(".js-rate-answer").val();
    var theReview = $(".js-review-answer").val();
    $(".js-review-answer").val("");
    $(".js-rate-answer").val(this.q.points);

    var reviewObj =
      {rating:parseInt(rating),
       review:theReview,
       numReviews:0,
       numTAreviews:0,
       createdAt: new Date(),
       createdBy: Meteor.userId(),
       question: this.q.question,
       question_id: this.q._id,
       answer_id: this.a._id,
       class_id: this.q.class_id};

    // I should send myAnswer to this as a parameter
    myAnswer =
       Answers.findOne(
        {createdBy:Meteor.userId(),question:this.q._id});
    myInfo = StudentInfo.findOne({student_id:Meteor.userId()});

    if (this.r._id) {
      Reviews.update(this.r._id,reviewObj);
    } else {
      Answers.update(myAnswer._id,{$push:{myReviews:this.a.createdBy}});
      Answers.update(this.a._id,{$push:{myReviewers:Meteor.userId()}});
      Answers.update(this.a._id,{$inc:{numReviews:1}})
      if (myInfo && myInfo.role=="teacher"){
        Answers.update(this.a._id,{$inc:{numTAreviews:1}});
        console.log("incrementing TA reviews for "+this.a._id)
      }
      z = Reviews.insert(reviewObj);
    }


    Answers.update(myAnswer._id,{$unset:{reviewing:""}})  // we've finished this review!


      var z = Answers.findOne(myAnswer._id);

    Router.go('/reviewAnswers/'+this.q._id);
    //updateToReview();
  }
})
