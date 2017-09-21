Meteor.startup(function(){
	if (Colors.find({}).count()==0){
		// create some initial data for the collection...
		Colors.insert({theColor:"red", hex:"ff0000"});

		Colors.insert({theColor:"green", hex:"ff0000"});
		Colors.insert({theColor:"blue", hex:"ff0000"});
		Colors.insert({theColor:"aqua", hex:"ff0000"});
		Colors.insert({theColor:"yellow", hex:"ff0000"});
	}
}); 
