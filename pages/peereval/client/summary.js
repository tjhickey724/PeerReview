Template.summary.helpers({
  questions:function(class_id){

    return Questions.find({class_id:class_id})
  },
})


Template.question_summary_item.helpers({
  answers:function(qid){
    var z = Answers.find({question:qid}).count();
    console.log("answers="+z);
    return z;
  },

  reviews:function(qid){
    var z = Reviews.find({question_id:qid}).count()
    return z;
  },

  ratings:function(qid){
    var z = Reviews.find({question_id:qid},{fields:{rating:1}}).fetch();
    var y = _.map(_.pluck(z,'rating'),function(x){return parseInt(x)})
    var x = _.reduce(y,function(x,s){return x+s},0)
    if (z.length>0)
      return (x+0.0)/z.length;
    else {
      return "N/A"
    }
  },

})
