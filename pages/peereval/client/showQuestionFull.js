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
    const ans= Answers.findOne(
      {createdBy:Meteor.userId(),
       question:this._id});
    console.log(ans);
    return ans; // this could be undefined!
  },


  hasEnoughReviews: function(){
    const instance = Template.instance();
    const myAnswerId = instance.state.get('myAnswerId');
    if (myAnswerId) {
      const myAnswer = Answers.findOne(myAnswerId);
      return myAnswer.myReviews.length>=2;
    } else {
      return false;
    }
  },

  hasAnswered: function(){
    const instance = Template.instance();
    return instance.state.get('myAnswerId');
  },

})

Template.showQuestionFull.events({
  "click .js-submit-answer": function(event){
    const instance = Template.instance();
    event.preventDefault();
    const answer = $(".js-student-answer").val();
    console.log(answer);
    /* the answer object to the question by this user
     * will also contain the list of all other answers reviewed by
     * this user. This will allow us to make sure the user
     * always gets new answers to review, if there are any..
    */
    const answerData =
      { answer:answer,
        question:this._id,
        createdAt:new Date(),
        createdBy: Meteor.userId(),
        userName:Meteor.user().emails[0].address,
        myReviews:[],  // list of _id's of students reviewed by this person
        myReviewers:[],
      };
    console.dir(answerData);
    const myAnswerId = Answers.insert(answerData);
    instance.state.set('myAnswerId',myAnswerId);

    const toReview = Answers.findOne(
      {question:this._id}
    )
    if (toReview)
      instance.state.set("toReview",toReview);
    //Router.go('/showQuestions');
  }
})
