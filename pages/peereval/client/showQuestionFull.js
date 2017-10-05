/*
New Idea: show the list of all answers and let the
user pick the one they want to answer. But don't
add links if they've already answered it, or it is their own.
This means I don't have to generate a new answer for them to review

THIS HAS A BUG IF SOMEONE BACKS INTO IT.... FIX THAT BUG!!
myAnswerId should only be undefined if they haven't tried to solve
this problem yet!!
*/



Template.showQuestionFull.helpers({

  answer: function(){
    var ans= Answers.findOne(
      {createdBy:Meteor.userId(),
       question:this._id});

    return ans; // this could be undefined!
  },

})


Template.showQuestionFull.events({
  "click .js-submit-answer": function(event){
    var instance = Template.instance();
    event.preventDefault();
    var answer = $(".js-student-answer").val();

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

    Answers.insert(answerData);

  }
})
