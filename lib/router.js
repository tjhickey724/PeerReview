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
		 console.log('in viewClass router!')
		 var q = ClassInfo.findOne({_id:this.params._id});
		 console.dir(['viewClass',q]);
		 return {class:q};
	 }
});

Router.route('showStudents/:_id',
	{name:'showStudents',
   data: function(){
		 console.log("in showStudents!");
		 var q = ClassInfo.findOne({_id:this.params._id});
		 return {class:q};
	 }
});

Router.route('createQuestion/:_id',
	{name:'createQuestion',
   data: function(){
		 console.log('in createQuestion router!')
		 var q = ClassInfo.findOne({_id:this.params._id});
		 console.dir(['createQuestion',q]);
		 return {class:q};
	 }
});

Router.route('/showQuestion/:_id',
   {name:'showQuestion',
    data: function(){
			var q = Questions.findOne({_id:this.params._id});
			console.dir(q);
			var z = {class:q};
			return {class:q};
		}});

		Router.route('/showQuestionFull/:_id',
		   {name:'showQuestionFull',
		    data: function(){
					console.dir(this.params._id);
					const q = Questions.findOne({_id:this.params._id});
					console.dir(q);
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
					console.dir(['myans',myAns]);
					const toReview = Answers.findOne(
						{question:qid,
						 createdBy:{$ne:Meteor.userId(),$nin:myAns.myReviews}}
					)
					console.dir({qid:qid,q:q,myAns:myAns,toReview:toReview,});
					return {q:q,a:toReview};
				}});

Router.route('/seeReviews/:_id',
				   {name:'seeReviews',
				    data: function(){
							const myAnswer = Answers.findOne({question:this.params._id, createdBy:Meteor.userId()});

							console.log(this.params._id);
							const reviews = Reviews.find(
								{createdBy:{$ne: Meteor.userId()},
								 answer_id:myAnswer._id}).fetch();
							console.dir(reviews);
							return {reviews:reviews};
						}});
