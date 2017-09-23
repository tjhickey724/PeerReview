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
					const q = Questions.findOne({_id:this.params._id});
					return q;
				}});


Router.route('/reviewAnswers/:_qid',
	{name:'reviewAnswers',
		    data: function(){
					/* the goal here is to find an answer to the question
					   that has not yet been reviewed by the user. We must
						 also check that the user has actually answered the question!
					*/
					const qid = this.params._qid;
					const q = Questions.findOne({_id:qid});
					const myAns = Answers.findOne({question:qid,createdBy:Meteor.userId()});
					const toReview = Answers.findOne(
						{question:qid,
						 createdBy:{$ne:Meteor.userId(),$nin:myAns.myReviews}}
					)
					return {q:q,a:toReview};
				}});

Router.route('/seeReviews/:_id',
				   {name:'seeReviews',
				    data: function(){
							const myAnswer = Answers.findOne({question:this.params._id, createdBy:Meteor.userId()});
							const reviews = Reviews.find(
								{createdBy:{$ne: Meteor.userId()},
								 answer_id:myAnswer._id}).fetch();
							return {reviews:reviews};
						}});
