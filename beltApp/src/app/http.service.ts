import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private _http: HttpClient) { }

  getRestaurants(){ // fetching all restaurants
    return this._http.get("/restaurants");
  }
  
  getOneReview(id){
  	return this._http.get("/reviews/restaurant/" + id)
  }

  getOneRestaurant(id){
  	console.log("service gets one resturant")
  	return this._http.get("/restaurant/" +id)
  }
  addRestaurant(data){ //for adding a new restaurant
  	console.log("hits service")
  	return this._http.post("/restaurants/new", {data: data});
  }     
  
  addReview(id, data){ //for adding a new review
  	return this._http.post("/restaurants/reviews/" + id, {data: data})
  }
  
  updateRestaurant(id, data){ // for updating a restaurant
  	return this._http.put("/restaurants/edit/" + id, {data: data})
  }
  
  deleteRestaurant(id){ // for deleting a restaurant
  	return this._http.delete("/restaurants/" + id);
  }

}
