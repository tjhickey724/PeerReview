/*
New Idea: show the list of all answers and let the
user pick the one they want to answer. But don't
add links if they've already answered it, or it is their own.
This means I don't have to generate a new answer for them to review

THIS HAS A BUG IF SOMEONE BACKS INTO IT.... FIX THAT BUG!!
myAnswerId should only be undefined if they haven't tried to solve
this problem yet!!
*/

Template.showQuestionFull.onCreated(function(){

    this.state =  new ReactiveDict();
    this.state.setDefault({
      submitMode:false,
    });

})

Template.showQuestionFull.helpers({

  submitted: function(){
    //console.log('in submitted')
    //console.dir(this);
    return(this.submitted)
  },


  answer: function(){
    var ans= Answers.findOne(
      {createdBy:Meteor.userId(),
       question:this._id});
    if (ans && ans.submitted==undefined) {
      ans.submitted = true;
      Answers.update(ans._id,{$set:{submitted:true}});
    }

    return ans; // this could be undefined!
  },

  lastSave: function(){
    return this.createdAt
  },

  submitMode: function(){
    var instance = Template.instance();
    return instance.state.get('submitMode')
  }

})


Template.showQuestionFull.events({
  "change .js-submit-state"(event, instance){

    instance.state.set('submitMode',event.target.checked);

  },

  "click .js-submit-answer": function(event){
    var instance = Template.instance();
    var submitMode = instance.state.get('submitMode');


    event.preventDefault();
    var answer = $(".js-student-answer").val();

    /* the answer object to the question by this user
     * will also contain the list of all other answers reviewed by
     * this user. This will allow us to make sure the user
     * always gets new answers to review, if there are any..
    */

    // first we see if the user has already saved an answer
    var lastAnswer =
       Answers.findOne({question:this._id,
                     createdBy:Meteor.userId()})

    // then we construct the current answer
    var answerData =
      { answer:answer,
        question:this._id,
        createdAt:new Date(),
        createdBy: Meteor.userId(),
        userName: 'anon',
        submitted: false,
        myReviews:[],  // list of _id's of students reviewed by this person
        myReviewers:[],
        numTAreviews:0,
        numReviews:0,
        class:this.class_id,
      };

    answerData.submitted = submitMode;


    // now we either update the saved version or insert the new version
    if (lastAnswer){
      Answers.update(lastAnswer._id,answerData);
    } else {
      Answers.insert(answerData)
    }
    //console.log("just updated or inserted:")
    //console.dir(answerData)

    var zz = Answers.findOne(answerData);

    event.target.blur();

  }
})
