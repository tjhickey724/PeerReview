Router.configure({
	layoutTemplate: 'layout',
	loadingTemplate: 'loading',
	//waitOn: function() {return true;}   // later we'll add more interesting things here ....
});


Router.route('/',
		{name: 'home',
			template:'home',
			waitOn:function(){
				return [
					/*Meteor.subscribe('theQuestions'),
					Meteor.subscribe('myQuestions'),
					Meteor.subscribe('theAnswers'),
					Meteor.subscribe('theReviews'),
					Meteor.subscribe('theProblemSets'),
					*/
					Meteor.subscribe('myProfiles'),
					Meteor.subscribe('theClassInfo'),
					Meteor.subscribe('classesOwnedByMe'),
					Meteor.subscribe('myStudentInfo'),

				]
			},
	  }
	);
Router.route('createClass',
{name: 'createClass',
	template:'createClass',
	waitOn:function(){
		return [
			//Meteor.subscribe('theQuestions'),
			//Meteor.subscribe('theAnswers'),
			//Meteor.subscribe('theReviews'),
			Meteor.subscribe('theProfiles'),
			Meteor.subscribe('theClassInfo'),
			Meteor.subscribe('theStudentInfo'),
			//Meteor.subscribe('theProblemSets'),
		]
	},
}
		);


Router.route('showQuestions',
{name: 'showQuestions',
	template:'showQuestions',
	waitOn:function(){
		return [
			Meteor.subscribe('theQuestions'),
			//Meteor.subscribe('theAnswers'),
			//Meteor.subscribe('theReviews'),
			Meteor.subscribe('theProfiles'),
			Meteor.subscribe('theClassInfo'),
			Meteor.subscribe('theStudentInfo'),
			Meteor.subscribe('theProblemSets'),
		]
	},
}
);


Router.route('showProfile',
{name: 'showProfile',
	template:'showProfile',
	waitOn:function(){
		return [
			//Meteor.subscribe('theQuestions'),
			//Meteor.subscribe('theAnswers'),
			//Meteor.subscribe('theReviews'),
			Meteor.subscribe('theProfiles'),
			/* Meteor.subscribe('theClassInfo'),
			Meteor.subscribe('theStudentInfo'),
			Meteor.subscribe('theProblemSets'),
			*/
		]
	},
}
);


Router.route('viewClass/:_cid',
	{name:'viewClass',
	 template:'viewClass',
	 waitOn:function(){
     //console.log("in the viewClass subscription!")
		var zz = [
			//Meteor.subscribe('theQuestions'),
			//Meteor.subscribe('myQuestions'),
      Meteor.subscribe('theClassQuestions',this.params._cid),
      Meteor.subscribe('theClassAnswers',this.params._cid),
      //Meteor.subscribe('myAnswers'),
			//Meteor.subscribe('theAnswers'),
			//Meteor.subscribe('theReviews'),
			//Meteor.subscribe('theProfiles'),
			Meteor.subscribe('myClassInfo'),  // only ones I belong to
			Meteor.subscribe("classesOwnedByMe"), // or that I own
			Meteor.subscribe('myStudentInfo'), // only my info
			//Meteor.subscribe('myProblemSets'),
			Meteor.subscribe('myProblemSet',this.params._cid), // only the ones for my classes
		]
    return zz
	 },
   data: function(){
		 var q = ClassInfo.findOne({_id:this.params._cid});
		 return {class:q};
	 }
});

Router.route('showStudents/:_id',
	{name:'showStudents',
	 template:'showStudents',
	 waitOn:function(){
		return [
			//Meteor.subscribe('theQuestions'), //only this question ..
			Meteor.subscribe('myQuestions'),
			Meteor.subscribe('theAnswers'),  //my answer to this question
			//Meteor.subscribe('theReviews'),
			Meteor.subscribe('allReviewsOfMe'),
			Meteor.subscribe('theProfiles'),
			Meteor.subscribe('myClassInfo'),  // only ones I belong to
			Meteor.subscribe('theStudentInfo'), // only my info
			Meteor.subscribe('myProblemSets'), // only the ones for my classes
		]
   },
   data: function(){
		 var q = ClassInfo.findOne({_id:this.params._id});
		 return {class:q};
	 }
});

Router.route('showStudentsSummary/:_cid',
	{name:'showStudentsSummary',
	 template:'showStudentsSummary',
	 waitOn:function(){
	  return [
		 Meteor.subscribe('theClassQuestions',this.params._cid), //only this question ..
		 //Meteor.subscribe('myQuestions'),
		 //Meteor.subscribe('theAnswers'),  //my answer to this question
		 //Meteor.subscribe('theReviews'),
		 //Meteor.subscribe('theProfiles'),
     Meteor.subscribe('profilesForClass',this.params._cid),
		 Meteor.subscribe('oneClassInfo',this.params._cid),  // only ones I belong to
		 Meteor.subscribe('theStudentInfoForClass', this.params._cid), // only my info

		 //Meteor.subscribe('theProblemSets'), // only the ones for my classes
	  ]
	 },
   data: function(){
		 var q = ClassInfo.findOne({_id:this.params._cid});
		 return {class:q};
	 }
});

Router.route('summary/:_cid',
	{name:'summary',
	template:'summary',
	waitOn:function(){
		return [
			Meteor.subscribe('theClassQuestions',this.params._cid),
			//Meteor.subscribe('myQuestions'),
			//Meteor.subscribe('theAnswers'),
			//Meteor.subscribe('theReviews'),
			//Meteor.subscribe('theProfiles'),
      Meteor.subscribe('profilesForClass',this.params._cid),
			//Meteor.subscribe('theClassInfo'),
      Meteor.subscribe('oneClassInfo',this.params._cid),
			//Meteor.subscribe('theStudentInfo'),
			//Meteor.subscribe('theProblemSets'),
			Meteor.subscribe('theQuestionData')
		]
	},
   data: function(){
		 var q = ClassInfo.findOne({_id:this.params._cid});
		 return {class:q};
	 }
});

/*
  We need to modify this so that it checks to see if the user owns the course
	and if so, it gives access to all of the students data ...
*/
Router.route('studentWork/:_sid/:_cid',
	{name:'studentWork',
	 template:'studentWork',
	 waitOn:function(){
     //console.log("A");
     //console.log("sid="+this.params._sid)
     //console.log("cid="+this.params._cid)
	 var zzz = [

		 Meteor.subscribe('theClassQuestions',this.params._cid), //only this question ..

		 //Meteor.subscribe('myQuestions'),

		 Meteor.subscribe('myReviews'),

     //Meteor.subscribe('oneStudentInfo',this.params._sid),
     Meteor.subscribe("theStudentInfoForClass",this.params._cid),
		 Meteor.subscribe('myAnswers'),  //my answer to this question
		 Meteor.subscribe('allReviewsOfMe'),

		 Meteor.subscribe('allReviewsOfStudent',this.params._sid),
		 Meteor.subscribe("reviewsOfAnswersIreviewed",this.params._sid),

		 //Meteor.subscribe('theProfiles'),
		 Meteor.subscribe('myClassInfo'),  // only ones I belong to
		 Meteor.subscribe('myStudentInfo'), // only my info
		 Meteor.subscribe('answersReviewedBy',this.params._sid),
		 //Meteor.subscribe('theProblemSets'), // only the ones for my classes
		 Meteor.subscribe('TAview',{sid:this.params._sid,cid:this.params._cid}),
     Meteor.subscribe('profilesForClass',this.params._cid),

                              ]/*
    */
    //console.log("B")
    //console.dir(zzz)
    return zzz
	 },
   data: function(){
     //console.log("C")
		 var s = StudentInfo.findOne({_id:this.params._sid})
     //console.log("D")
		 var c = ClassInfo.findOne({_id:this.params._cid})
     //console.log("E")
     //console.dir(this.params)
     //console.dir({student:s,class:c})
		 return {student:s,class:c}
	 }
});

Router.route('createQuestion/:_id',
	{name:'createQuestion',
	 template:'createQuestion',
	 waitOn:function(){
	  return [
		 Meteor.subscribe('theQuestions'), //only this question ..
		 Meteor.subscribe('myQuestions'),
		 //Meteor.subscribe('theAnswers'),  //my answer to this question
		 //Meteor.subscribe('theReviews'),
		 Meteor.subscribe('theProfiles'),
		 Meteor.subscribe('theClassInfo'),  // only ones I belong to
		 Meteor.subscribe('theStudentInfo'), // only my info
		 Meteor.subscribe('theProblemSets'), // only the ones for my classes
	  ]
	 },
   data: function(){
		 var c = ClassInfo.findOne({_id:this.params._id});
		 var rubric = "2=perfect\n1=minor errors\n0=wrong\n"
		 return {class:c,question:{rubric:rubric,points:2}};
	 }
});

Router.route('createQuestion/:_id/:_qid',
  {name:'createQuestion2',
	 template:'createQuestion',
	 waitOn:function(){
	  return [
		 Meteor.subscribe('theQuestions'), //only this question ..
		 Meteor.subscribe('myQuestions'),
		 //Meteor.subscribe('theAnswers'),  //my answer to this question
		 //Meteor.subscribe('theReviews'),
		 Meteor.subscribe('theProfiles'),
		 Meteor.subscribe('theClassInfo'),  // only ones I belong to
		 Meteor.subscribe('theStudentInfo'), // only my info
		 Meteor.subscribe('theProblemSets'), // only the ones for my classes
	  ]
	 },
   data: function(){
			 var c = ClassInfo.findOne({_id:this.params._id});
			 var q = Questions.findOne(this.params._qid)
			 var d = {class:c,question:q}
			 return d
	   },


 /*
	function(){
		this.render('createQuestion',
	  {data: function(){
		    var c = ClassInfo.findOne({_id:this.params._id});
				var q = Questions.findOne(this.params._qid)
				var d = {class:c,question:q}
		    return d
	 }})
	 */
});

Router.route('/showProblemSet/:_psid',
		{name:'showProblemSet',
		template:'showProblemSet',
 	   waitOn:function(){
 			return [
 				Meteor.subscribe('theQuestionsForPS',this.params._psid),
 				//Meteor.subscribe('myQuestions'),
 				//Meteor.subscribe('theAnswers'),
 				//Meteor.subscribe('theReviews'),
 				//Meteor.subscribe('theProfiles'),
 				//Meteor.subscribe('theClassInfo'),  // only ones I belong to
 				//Meteor.subscribe('theStudentInfo'), // only my info
 				Meteor.subscribe('theProblemSet',this.params._psid), // only the ones for my classes
 			]
 	 },
		 data: function(){
		 var q = ProblemSets.findOne({_id:this.params._psid});
		 return {problemset:q};
		}});

Router.route('/reviewProblemSet/:_psid',
				{name:'reviewProblemSet',
				template:'reviewProblemSet',
		 	   waitOn:function(){
		 			return [
		 				Meteor.subscribe('theQuestionsForPS',this.params._psid),
		 				//Meteor.subscribe('myQuestions'),
		 				//Meteor.subscribe('theAnswers'),
						Meteor.subscribe('thePSanswers',this.params._psid),
		 				//Meteor.subscribe('theReviews'),
						Meteor.subscribe('theTAreviewsForPS',this.params._psid),
		 				Meteor.subscribe('profilesForProblemSet',this.params._psid),
		 				Meteor.subscribe('theClassInfoForPS',this.params._psid),  // only ones I belong to
		 				Meteor.subscribe('theStudentInfoForPS',this.params._psid), // only my info
		 				Meteor.subscribe('theProblemSet',this.params._psid), // only the ones for my classes
		 			]
		 	 },
				 data: function(){
         //console.log("returning ProblemSet!")
				 var q = ProblemSets.findOne({_id:this.params._psid});
				 return {problemset:q};
				}});

Router.route('/showQuestion/:_id',
   {name:'showQuestion',
	 template:'showQuestion',
		waitOn:function(){
		 return [
			 Meteor.subscribe('theQuestions'),
			 //Meteor.subscribe('myQuestions'),
			 //Meteor.subscribe('theAnswers'),
			 //Meteor.subscribe('theReviews'),
			 //Meteor.subscribe('theProfiles'),
			 //Meteor.subscribe('theClassInfo'),  // only ones I belong to
			 //Meteor.subscribe('theStudentInfo'), // only my info
			 //Meteor.subscribe('theProblemSets'), // only the ones for my classes
		 ]
	},
    data: function(){
			var q = Questions.findOne({_id:this.params._id});
			var z = {class:q};
			return {class:q};
		}});

Router.route('/showQuestionFull/:_qid',
		{name:'showQuestionFull',
		template:'showQuestionFull',
		 waitOn:function(){
			return [
				Meteor.subscribe('theQuestion',this.params._qid), //only this question ..
				//Meteor.subscribe('myQuestions'),
				Meteor.subscribe('myAnswers'),  //my answer to this question
				//Meteor.subscribe('theReviews'),
				//Meteor.subscribe('theProfiles'),
				//Meteor.subscribe('theClassInfo'),  // only ones I belong to
				//Meteor.subscribe('theStudentInfo'), // only my info
				//Meteor.subscribe('theProblemSets'), // only the ones for my classes
			]
	 },
		 data: function(){
		 var q = Questions.findOne({_id:this.params._qid});
		 return q;
		}});

Router.route('/questionsummary/:_qid',
		 {name:'questionsummary',
		  template:'questionsummary',
		  waitOn:function(){
		   return [
				Meteor.subscribe('theQuestion',this.params._qid), //only this question ..
			 	Meteor.subscribe('myQuestions'),
			 	//Meteor.subscribe('theAnswers'),  //my answer to this question
				Meteor.subscribe('answers2question',this.params._qid),
				Meteor.subscribe('reviewsOfquestion',this.params._qid),
			  //Meteor.subscribe('theReviews'),
        Meteor.subscribe('profilesForQuestionIfTA',this.params._qid),
			 	Meteor.subscribe('theProfiles'),
			 	//Meteor.subscribe('theClassInfo'),  // only ones I belong to
			 	//Meteor.subscribe('theStudentInfo'), // only my info
			 	//Meteor.subscribe('theProblemSets'), // only the ones for my classes
		   ]
		  },
			data: function(){
			var q = Questions.findOne({_id:this.params._qid});
			return q;
}});

Router.route('/onequestionsummary/:_qid/:_aid',
		 {name:'onequestionsummary',
		  template:'onequestionsummary',
		  waitOn:function(){
		   return [
				Meteor.subscribe('theQuestion',this.params._qid), //only this question ..
			 	Meteor.subscribe('myQuestions'),
			 	//Meteor.subscribe('theAnswers'),  //my answer to this question
        Meteor.subscribe('theAnswer',this.params._aid),
				//Meteor.subscribe('answers2question',this.params._qid),
				//Meteor.subscribe('reviewsOfquestion',this.params._qid),
        Meteor.subscribe('reviewsOfanswer2',this.params._aid),
			  //Meteor.subscribe('theReviews'),
			 	Meteor.subscribe('profilesForQuestion',this.params._qid),
			 	//Meteor.subscribe('theClassInfo'),  // only ones I belong to
			 	//Meteor.subscribe('theStudentInfo'), // only my info
			 	//Meteor.subscribe('theProblemSets'), // only the ones for my classes
		   ]
		  },
			data: function(){
			var a = Answers.findOne({_id:this.params._aid});
			return {answer:a};
}});

Router.route('/reviewAnswer/:_qid/:_aid/:_rid',
  {name:'reviewAnswer',
	template:'reviewAnswer',
	waitOn:function(){
	 return [
		 Meteor.subscribe('theQuestion',this.params._qid), //only this question ..
		 //Meteor.subscribe('myQuestions'),
		 //Meteor.subscribe('theAnswers'),  //my answer to this question
		 Meteor.subscribe('answers2question',this.params._qid),
		 //Meteor.subscribe('theReviews'),
		 Meteor.subscribe("reviewsOfanswer",this.params._qid),
		 Meteor.subscribe('toReview'),
		 //Meteor.subscribe('theProfiles'),
		 //Meteor.subscribe('theClassInfo'),  // only ones I belong to
		 //Meteor.subscribe('theStudentInfo'), // only my info
		 //Meteor.subscribe('theProblemSets'), // only the ones for my classes
	 ]
	},
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

Router.route('/reviewOneAnswer/:_aid',
  {name:'reviewOneAnswer',
	template:'reviewAnswer',
	waitOn:function(){
    //console.log("in router:"); console.dir(this.params._aid)
	 return [
     Meteor.subscribe('theQuestionForAnswer',this.params._aid),
     //Meteor.subscribe('theQuestions'),
		 //Meteor.subscribe('myQuestions'), //only this question ..
		 //Meteor.subscribe('myQuestions'),
		 //Meteor.subscribe('theAnswers'),  //my answer to this question
		 Meteor.subscribe('oneAnswer',this.params._aid),  //my answer to this question
		 //Meteor.subscribe('answers2question',this.params._qid),
		 //Meteor.subscribe('theReviews'),
		 //Meteor.subscribe("reviewsOfanswer",this.params._qid),
		 //Meteor.subscribe('toReview'),
		 //Meteor.subscribe('theProfiles'),
		 //Meteor.subscribe('theClassInfo'),  // only ones I belong to
		 //Meteor.subscribe('theStudentInfo'), // only my info
		 //Meteor.subscribe('theProblemSets'), // only the ones for my classes
	 ]
	},
	 data: function(){
		var aid = this.params._aid
 		var a = Answers.findOne(aid)
		//console.log('IN ROUTER: aid='+aid+" a="+JSON.stringify(a))
		var q = {};
		if (a) {
			var qid = a.question
			var q = Questions.findOne({_id:qid})
      //console.log("AND qid="+qid); console.dir(q)
		}
		var myAns = Answers.findOne({question:qid,createdBy:Meteor.userId()})
		return {q:q,a:a,r:{},myAns:myAns}
	}}
)


Router.route('/reviewAnswers/:_qid',
	{name:'reviewAnswers',
	template:'reviewAnswers',
	waitOn:function(){
	 return [
		Meteor.subscribe('theQuestion',this.params._qid), //only this question ..
		//Meteor.subscribe('myQuestions'),
		//Meteor.subscribe('theAnswers'),  //my answer to this question
		Meteor.subscribe('answers2question',this.params._qid),
		//Meteor.subscribe('theReviews'),
		Meteor.subscribe("reviewsOfanswer",this.params._qid),
		Meteor.subscribe('toReview'),
		//Meteor.subscribe('theProfiles'),
		//Meteor.subscribe('theClassInfo'),  // only ones I belong to
		//Meteor.subscribe('theStudentInfo'), // only my info
		//Meteor.subscribe('theProblemSets'), // only the ones for my classes
	 ]
	},
		    data: function(){
					/* the goal here is to find an answer to the question
					   that has not yet been reviewed by the user. We must
						 also check that the user has actually answered the question!
					*/

					var qid = this.params._qid;
					var q = Questions.findOne({_id:qid});
					var toReview = {q:q,r:{rating:-1,review:""},a:undefined,myAns:true};  // return this when nothing left to review
					var query = {question:qid,createdBy:Meteor.userId()};
					var myAns = Answers.findOne(query)
					var myInfo = StudentInfo.findOne({student_id:Meteor.userId()})
					var amTA = (myInfo && (myInfo.role="teacher"))


					if (!myAns){

						return toReview;
					}

					// first look for a reviewing field in myAns which specifies
					// which answer I'm currently reviewing... when I'm done
					// reviewing it I'll set this to undefined.
					if (myAns.reviewing){

						var nextReview = Answers.findOne(myAns.reviewing);
            if (!nextReview){
              //console.log("bug in reviewAnswers ...");
              //console.dir(['myAns=,',myAns,'nextReview=',nextReview])
              return toReview
            }
						toReview = {r:{rating:-1,review:""},q:q,a:nextReview,test:"This is a test!",myAns:myAns}
						//console.dir(['mr',toReview])
						if (_.contains(nextReview.myReviewers,Meteor.userId())) {

							Answers.update(myAns._id,{$unset:{reviewing:""}})
							myAns.reviewing = undefined
						} else {
								return toReview
							}
					}
          /*
					var toReviewList = [];
					// first we look at the case of a TA!
					if (amTA){
						toReviewList = Answers.find(
							{
								question:qid,
						  	createdBy:{$ne:Meteor.userId(),$nin:myAns.myReviews},
					  	},
							{ sort:{numTAreviews:1}
					 		}
					 	)
				 	} else {
						toReviewList = Answers.find(
							{
								question:qid,
								createdBy:{$ne:Meteor.userId(),$nin:myAns.myReviews},
							},
							{ sort:{numReviews:1}
						  }
						)
					}
          */

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
							 createdBy:{$ne:Meteor.userId(),$nin:myAns.myReviews}}
               //,
							 //{sort:{createdAt:-1}}
						).fetch()
					}

					// at this point toReview is an array of answers to review ..
					if (toReviewList.length==0){

						toReview = {q:q,r:{rating:-1,review:""},a:undefined,myAns:myAns}

						return toReview;
					} else {

						var k = _.random(0,toReviewList.length-1)

						var nextReview = toReviewList[k]

						toReview = {q:q,r:{rating:-1,review:""},a:nextReview,myAns:myAns}
						Answers.update(myAns._id,{$set:{reviewing:nextReview._id}})

						return toReview;
					}
				}});

Router.route('/seeReviews/:_qid',
				   {name:'seeReviews',
					 template:'seeReviews',
					waitOn:function(){
					 return [
						Meteor.subscribe('theQuestion',this.params._qid), //only this question ..
						//Meteor.subscribe('myQuestions'),
						//Meteor.subscribe('myAnswers',this.params._qid),  //my answer to this question
            Meteor.subscribe('myAnswerToQuestion',this.params._qid),
            //Meteor.subscribe('theReviews'),
						Meteor.subscribe('reviewsOfmyanswer',this.params._qid),
						Meteor.subscribe('theProfiles'),
						Meteor.subscribe('theClassInfo'),  // only ones I belong to
						Meteor.subscribe('theStudentInfo'), // only my info
						//Meteor.subscribe('theProblemSets'), // only the ones for my classes
					 ]
					},
				    data: function(){
							var myAnswer = Answers.findOne({question:this.params._qid, createdBy:Meteor.userId()});
              //console.dir(myAnswer)
              //console.log(this.params._qid)
              var reviews = Reviews.find(
								{createdBy:{$ne: Meteor.userId()},
								 answer_id:myAnswer._id}).fetch();
							return {answer2:myAnswer, reviews:reviews};
						}});

Router.route('/seeYourReviews/:_qid',
			{name:'seeYourReviews',
			template:'seeYourReviews',
			waitOn:function(){
			 return [
				//Meteor.subscribe('theQuestions'), //only this question ..
				//Meteor.subscribe('theQuestions'),
        Meteor.subscribe('theQuestion',this.params._qid),
        Meteor.subscribe('myReviews',this.params._qid),
        Meteor.subscribe('theAnswersToQuestion',this.params._qid),
        /*
				//Meteor.subscribe('theAnswers'),  //my answer to this question
				//Meteor.subscribe('theReviews'),
				Meteor.subscribe('myReviews',this.params._id),
				Meteor.subscribe('myReviewedAnswers',this.params._id),
        Meteor.subscribe('answers2question',this.params._id),
        Meteor.subscribe('reviewsOfquestion',this.params._id),
				//Meteor.subscribe('theProfiles'),
				Meteor.subscribe('theClassInfo'),  // only ones I belong to
				//Meteor.subscribe('theStudentInfo'), // only my info
				Meteor.subscribe('theProblemSets'), // only the ones for my classes
        */
			 ]
			},
			data: function(){
			var myAnswer = Answers.findOne({question:this.params._qid, createdBy:Meteor.userId()});
			var reviews = Reviews.find(
					{createdBy:Meteor.userId(),question_id:this.params._qid}
				 ).fetch();
			return {reviews:reviews};
	}});
