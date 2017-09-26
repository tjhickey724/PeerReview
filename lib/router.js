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

Router.route('summary/:_id',
	{name:'summary',
   data: function(){
		 var q = ClassInfo.findOne({_id:this.params._id});
		 //console.log("in summary router "+this.params._id);
		 //console.dir(q);
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
		 var q = ClassInfo.findOne({_id:this.params._id});
		 return {class:q};
	 }
});

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




Router.route('/reviewAnswers/:_qid',
	{name:'reviewAnswers',
		    data: function(){
					/* the goal here is to find an answer to the question
					   that has not yet been reviewed by the user. We must
						 also check that the user has actually answered the question!
					*/

					var qid = this.params._qid;
					console.log("in ReviewAnswers qid="+qid);
					var q = Questions.findOne({_id:qid});
					var myAns = Answers.findOne({question:qid,createdBy:Meteor.userId()});

					// first we look for answers with no reviews
					var toReview = Answers.findOne(
						{question:qid,
						 'myReviewers.0':{$exists:false},
						 createdBy:{$ne:Meteor.userId(),$nin:myAns.myReviews}},
						 {reactive:false}
					)

					// then we look for answers with at most one review
					if (!toReview) {
						toReview = Answers.findOne(
							{question:qid,
							 'myReviewers.1':{$exists:false},
							 createdBy:{$ne:Meteor.userId(),$nin:myAns.myReviews}},
							 {reactive:false}
						)
					}
					// then we look for answers with at most two reviews
					if (!toReview) {
						toReview = Answers.findOne(
							{question:qid,
							 'myReviewers.2':{$exists:false},
							 createdBy:{$ne:Meteor.userId(),$nin:myAns.myReviews}},
							 {reactive:false}
						)
					}
					// finally we review to most recently created answers,
					// as they are probably the ones that need the most help!
					if (!toReview) {
						toReview = Answers.findOne(
							{question:qid,
							 createdBy:{$ne:Meteor.userId(),$nin:myAns.myReviews}},
							 {sort:{createdAt:-1},reactive:false}
						)
					}

					console.dir({name:"in ReviewAnswers",q:q,a:toReview})
					return {q:q,a:toReview};
				}});

Router.route('/seeReviews/:_id',
				   {name:'seeReviews',
				    data: function(){
							var myAnswer = Answers.findOne({question:this.params._id, createdBy:Meteor.userId()});
							console.dir([this.params._id,myAnswer]);
							var reviews = Reviews.find(
								{createdBy:{$ne: Meteor.userId()},
								 answer_id:myAnswer._id}).fetch();
							console.dir(['in seeReviews Router',myAnswer,reviews])
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
