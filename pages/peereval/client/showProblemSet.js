Template.showProblemSet.helpers({
  questions(psid){
    console.dir(this);
    return Questions.find({problemset_id:this.problemset._id})
},
})
