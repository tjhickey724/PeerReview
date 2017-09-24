/*
New Idea: show the list of all answers and let the
user pick the one they want to answer. But don't
add links if they've already answered it, or it is their own.
This means I don't have to generate a new answer for them to review
*/



Template.showQuestionFull.onCreated(function() {
  this.state = new ReactiveDict();
  this.state.setDefault({
    myAnswerId: undefined
  });
});

Template.showQuestionFull.helpers({
  title: function(){return this.title},
  question: function(){return this.question},
  answer: function(){
    var ans= Answers.findOne(
      {createdBy:Meteor.userId(),
       question:this._id});

    return ans; // this could be undefined!
  },


  hasEnoughReviews: function(){
    var instance = Template.instance();
    var myAnswerId = instance.state.get('myAnswerId');
    if (myAnswerId) {
      var myAnswer = Answers.findOne(myAnswerId);
      return myAnswer.myReviews.length>=2;
    } else {
      return false;
    }
  },

  hasAnswered: function(){
    var instance = Template.instance();
    return instance.state.get('myAnswerId');
  },

})

Template.showQuestionFull.events({
  "click .js-submit-answer": function(event){
    var instance = Template.instance();
    event.preventDefault();
    var answer = $(".js-student-answer").val();
    console.log(answer);
    /* the answer object to the question by this user
     * will also contain the list of all other answers reviewed by
     * this user. This will allow us to make sure the user
     * always gets new answers to review, if there are any..
    */
    var answerData =
      { answer:answer,
        question:this._id,
        createdAt:new Date(),
        createdBy: Meteor.userId(),
        userName: 'anon',
        myReviews:[],  // list of _id's of students reviewed by this person
        myReviewers:[],
        class:this.class_id,
      };
    console.dir(answerData);
    var myAnswerId = Answers.insert(answerData);
    instance.state.set('myAnswerId',myAnswerId);

    var toReview = Answers.findOne(
      {question:this._id}
    )
    if (toReview)
      instance.state.set("toReview",toReview);
    //Router.go('/showQuestions');
  }
})
