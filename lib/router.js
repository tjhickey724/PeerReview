Router.configure({
	layoutTemplate: 'layout',
	//loadingTemplate: 'loading',
	//waitOn: function() {return true;}   // later we'll add more interesting things here ....
});

Router.route('/', {name: 'home'});
Router.route('createClass');
Router.route('showQuestions');
Router.route('showProfile');


Router.route('viewClass/:_id',
	{name:'viewClass',
   data: function(){
		 var q = ClassInfo.findOne({_id:this.params._id});
		 return {class:q};
	 }
});

Router.route('showStudents/:_id',
	{name:'showStudents',
   data: function(){
		 var q = ClassInfo.findOne({_id:this.params._id});
		 return {class:q};
	 }
});

Router.route('showStudentsSummary/:_id',
	{name:'showStudentsSummary',
   data: function(){
		 var q = ClassInfo.findOne({_id:this.params._id});
		 return {class:q};
	 }
});

Router.route('summary/:_id',
	{name:'summary',
   data: function(){
		 var q = ClassInfo.findOne({_id:this.params._id});
		 return {class:q};
	 }
});

Router.route('studentWork/:_sid/:_cid',
	{name:'studentWork',
   data: function(){

		 var s = StudentInfo.findOne({_id:this.params._sid})
		 var c = ClassInfo.findOne({_id:this.params._cid})

		 return {student:s,class:c}
	 }
});

Router.route('createQuestion/:_id',
	{name:'createQuestion',
   data: function(){
		 var c = ClassInfo.findOne({_id:this.params._id});
		 var rubric = "2=perfect\n1=minor errors\n0=wrong\n"
		 return {class:c,question:{rubric:rubric,points:2}};
	 }
});

Router.route('createQuestion/:_id/:_qid',
	function(){
		this.render('createQuestion',
	  {data: function(){
		    var c = ClassInfo.findOne({_id:this.params._id});
				var q = Questions.findOne(this.params._qid)
				var d = {class:c,question:q}
		    return d
	 }})
});

Router.route('/showProblemSet/:_psid',
		{name:'showProblemSet',
		 data: function(){
		 var q = ProblemSets.findOne({_id:this.params._psid});
		 return {problemset:q};
		}});

Router.route('/showQuestion/:_id',
   {name:'showQuestion',
    data: function(){
			var q = Questions.findOne({_id:this.params._id});
			var z = {class:q};
			return {class:q};
		}});

Router.route('/showQuestionFull/:_id',
		{name:'showQuestionFull',
		 data: function(){
		 var q = Questions.findOne({_id:this.params._id});
		 return q;
		}});

Router.route('/questionsummary/:_id',
		 {name:'questionsummary',
			data: function(){
			var q = Questions.findOne({_id:this.params._id});
			return q;
}});

Router.route('/reviewAnswer/:_qid/:_aid/:_rid',
  {name:'reviewAnswer',
	 data: function(){
		var qid = this.params._qid
		var q = Questions.findOne({_id:qid})
		var aid = this.params._aid
		var a = Answers.findOne({_id:aid})
		var rid = this.params._rid
		var r = Reviews.findOne({_id:rid})
		return {q:q,a:a,r:r}
	}}
)


Router.route('/reviewAnswers/:_qid',
	{name:'reviewAnswers',
		    data: function(){
					/* the goal here is to find an answer to the question
					   that has not yet been reviewed by the user. We must
						 also check that the user has actually answered the question!
					*/

					var qid = this.params._qid;
					var q = Questions.findOne({_id:qid});
					var toReview = {q:q,r:{rating:-1,review:""},a:undefined};  // return this when nothing left to review
					var query = {question:qid,createdBy:Meteor.userId()};
					var myAns = Answers.findOne(query)


					if (!myAns){

						return toReview;
					}

					// first look for a reviewing field in myAns which specifies
					// which answer I'm currently reviewing... when I'm done
					// reviewing it I'll set this to undefined.
					if (myAns.reviewing){

						var nextReview = Answers.findOne(myAns.reviewing);
						toReview = {r:{rating:-1,review:""},q:q,a:nextReview,test:"This is a test!"}

						if (_.contains(nextReview.myReviewers,Meteor.userId())) {

							Answers.update(myAns._id,{$unset:{reviewing:""}})
							myAns.reviewing = undefined
						} else {
								return toReview
							}
					}

					// first we look for answers with no reviews
					var toReviewList = Answers.find(
						{question:qid,
						 'myReviewers.0':{$exists:false},
						 createdBy:{$ne:Meteor.userId(),$nin:myAns.myReviews}}
					).fetch();

					// then we look for answers with at most one review
					if (toReviewList.length==0) {

						toReviewList = Answers.find(
							{question:qid,
							 'myReviewers.1':{$exists:false},
							 createdBy:{$ne:Meteor.userId(),$nin:myAns.myReviews}}
						).fetch()
					}
					// then we look for answers with at most two reviews
					if (toReviewList.length==0) {

						toReviewList = Answers.find(
							{question:qid,
							 'myReviewers.2':{$exists:false},
							 createdBy:{$ne:Meteor.userId(),$nin:myAns.myReviews}}
						).fetch()
					}
					// finally we review to most recently created answers,
					// as they are probably the ones that need the most help!
					if (toReviewList.length==0) {

						toReviewList = Answers.find(
							{question:qid,
							 createdBy:{$ne:Meteor.userId(),$nin:myAns.myReviews}},
							 {sort:{createdAt:-1}}
						).fetch()
					}

					// at this point toReview is an array of answers to review ..
					if (toReviewList.length==0){

						toReview = {q:q,r:{rating:-1,review:""},a:undefined}

						return toReview;
					} else {

						var k = _.random(0,toReviewList.length-1)

						var nextReview = toReviewList[k]

						toReview = {q:q,r:{rating:-1,review:""},a:nextReview}
						Answers.update(myAns._id,{$set:{reviewing:nextReview._id}})

						return toReview;
					}
				}});

Router.route('/seeReviews/:_id',
				   {name:'seeReviews',
				    data: function(){
							var myAnswer = Answers.findOne({question:this.params._id, createdBy:Meteor.userId()});
							var reviews = Reviews.find(
								{createdBy:{$ne: Meteor.userId()},
								 answer_id:myAnswer._id}).fetch();
							return {answer2:myAnswer, reviews:reviews};
						}});

Router.route('/seeYourReviews/:_id',
			{name:'seeYourReviews',
			data: function(){
			var myAnswer = Answers.findOne({question:this.params._id, createdBy:Meteor.userId()});
			var reviews = Reviews.find(
					{createdBy:Meteor.userId(),question_id:this.params._id}
				 ).fetch();
			return {reviews:reviews};
	}});
