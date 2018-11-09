Template.summary.onCreated(function(){
  var instance = Template.instance();

    if (instance.data.class.createdBy==Meteor.userId())
      Meteor.call('getAllQuestionData');
})

Template.summary.helpers({
  questions:function(class_id){

    return Questions.find({class_id:class_id})
  },
  
  owns_class:function(theClass){

    if (theClass.createdBy == Meteor.userId()) {
      return true;
    }
    var s = StudentInfo.findOne(
      {class_id:theClass._id,student_id:Meteor.userId()}
    )
    return s && s.role=="teacher";
  },

})

Template.summary.events({
  "click #js-update"(event,instance){

    Meteor.call('update_summary',this.class._id,
      function(error,result){alert("student summary has been updated!")})
  },
})

Template.question_summary_item.helpers({
  answers:function(qid){


    var q = QuestionData.findOne({question_id:qid});

    if (q) {
      return q.answers;
    } else {
      return 0;
    }


  },

  reviews:function(qid){


    var q = QuestionData.findOne({question_id:qid});
    if  (q) {
      return q.reviews;
    } else {
      return 0
    }


  },

  ratings:function(qid){


    var q = QuestionData.findOne({question_id:qid});
    var question = Questions.findOne(qid);
    if (q) {
      return (q.rating/question.points).toFixed(0);
    } else {
      return 0;
    }
/*
    var z = Reviews.find({question_id:qid},{fields:{rating:1}}).fetch();
    var y = _.map(_.pluck(z,'rating'),function(x){return parseInt(x)})
    var x = _.reduce(y,function(x,s){return x+s},0)
    if (z.length>0)
      return ((x+0.0)/z.length/this.q.points*100).toFixed(2);
    else {
      return "N/A"
    }
    */
  },

})
