Template.showQuestion.helpers({
  title: function(){return this.title},
  question: function(){return this.question},
  answer: function(){
    const ans= Answers.findOne(
      {createdBy:Meteor.userId(),
       question:this._id});
    console.log(ans);
    return ans;}
})

Template.showQuestion.events({
  "click .js-submit-answer": function(event){
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
        myReviewers:[] // list of _ids of reviewers
      };
    console.dir(answerData);
    Answers.insert(answerData);
    //Router.go('/showQuestions');
  }
})
