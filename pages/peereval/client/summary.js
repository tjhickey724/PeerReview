Template.summary.onCreated(function(){
  var instance = Template.instance();
    console.dir(['summary onCreated',instance.data])
    if (instance.data.class.createdBy==Meteor.userId())
      Meteor.call('getAllQuestionData');
})

Template.summary.helpers({
  questions:function(class_id){

    return Questions.find({class_id:class_id})
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
