Template.datasize.helpers({
  questions(){return Questions.find().count()},
  answers(){return Answers.find().count()},
  reviews(){return Reviews.find().count()},
  students(){return StudentInfo.find().count()},
  classes(){return ClassInfo.find().count()},
  profiles(){return Profiles.find().count()},
  problemsets(){return ProblemSets.find().count()},
})
