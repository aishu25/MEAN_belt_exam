var express = require("express");
var app = express();
var port = 8000;
var path = require("path");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");


app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "/beltApp/dist")));

app.set("views", path.join(__dirname, "./views"));

mongoose.connect("mongodb://localhost/restaurant");
mongoose.Promise = global.Promise;



var RestaurantSchema = new mongoose.Schema({
	
	restaurant_name: {type: String, required: [true,"an restaurant must have a name"], 
		minlength: [3, "Restaurant name must be more than 3 characters"]},
 	
 	cuisine_name: {type: String, required: [true,"an cuisine must have a name"], 
		minlength: [3, "Cuisine name must be more than 3 characters"]},


	reviews: [{ 
		user_name: {type: String, required: [true, "an user must have a name "],
					minlength: [3, "User name must be more than 3 characters "]},
		review: {type: String, required: [true, "reviews are to be present"],
					minlength: [3, "The review must be more than 3 characters "]},
		stars: {type: Number },
		}]
},
{ timestamps: true });

var Restaurant = mongoose.model("Restaurant", RestaurantSchema);

app.get("/restaurants",function(request, response){
	Restaurant.find({}, function(errors, data){
		if(errors){
			console.log("errors in fetching all the resturants");
			console.log(errors);
			response.json({message: "errors", errors: errors});
		}
		else{
			response.json({message: "success", data: data})
		}
	})
});   


// fetching all reviews for one restaurant

app.get("/reviews/restaurant/:id",function(request, response){
	Restaurant.findOne({_id: request.params.id}).sort([['reviews[stars]', -1]]).exec(function(errors, data){
		if(errors){
			console.log("errors in fetching all the reviews");
			console.log(errors);
			response.json({message: "errors", errors: errors});
		}
		else{
			response.json({message: "success", data: data})
		}
	})
});
 
 app.get("/restaurant/:id",function(request, response){
	Restaurant.findOne({_id: request.params.id}, function(errors, data){
		if(errors){
			console.log("errors in fetching all the reviews");
			console.log(errors);
			response.json({message: "errors", errors: errors});
		}
		else{
			console.log("fetching one resturant")
			response.json({message: "success", data: data})
		}
	})
});

// Create a new Resturant

app.post("/restaurants/new", function(request, response){
	var new_restaurant = new Restaurant({
		restaurant_name : request.body.data.restaurant_name,
		cuisine_name : request.body.data.cuisine_name
	});
	console.log("POST DATA",request.body)
	new_restaurant.save(function(errors, data){
		if(errors){
			console.log("errors when creating a new restaurant");
			console.log(errors);
			response.json({message: "errors", errors: errors});

		}
		else{
			response.json({message: "success", data: data}) 
		};
	});
});

//create a new review


app.post("/restaurants/reviews/:id", function(request, response) {
	Restaurant.findOne({_id: request.params.id}, function(errors, data){
		if(errors){
			console.log("errors when adding an quote")
			console.log(errors);
			response.json({message: "errors", errors: errors});
		}
		else{
			console.log("POST DATA: ", data)
			data.reviews.push({
				user_name: request.body.data.user_name,
				review: request.body.data.review,
				stars: request.body.data.stars})
			data.save()
			response.json({message: "success", data: data});
		};
	});
});




//updating a restaurant

app.put("/restaurants/edit/:id", function(request, response){
	Restaurant.findOne({_id: request.params.id}, function(errors, data){
		data.restaurant_name = request.body.data.restaurant_name;
		data.cuisine_name = request.body.data.cuisine_name;
		data.save(function(errors, data){
		if(errors){
			console.log("erros when editing an author")
			console.log(errors);
			response.json({message: "errors", errors: errors});
		}
		else{
			response.json({message: "success", data: data});
		};
	});
	});
});

// delete a task using ID

app.delete("/restaurants/:id", function(request, response){
	
	Restaurant.remove({_id: request.params.id}, function(errors, data){
		if(errors){
			console.log(errors);
			response.json({message: "errors", errors: errors});
		}
		else{
			response.json({message: "success", data: data});
		};
	});
});


app.all("*", (request,response,next) => {
  response.sendFile(path.resolve("./beltApp/dist/index.html"))
});

app.listen(port, function(){
	console.log("Listening on the port 8000 for the MEAN belt project");
})













