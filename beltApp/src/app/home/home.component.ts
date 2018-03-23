import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  errors;
  restaurants = [];

  constructor(
  	private _httpService: HttpService, 
    private _route: ActivatedRoute, 
    private _router: Router) { }

  ngOnInit() {
  	this.getRestaurantsThroughService();
  }

  getRestaurantsThroughService(){
  	console.log("fetching resturansts")
  	let obs = this._httpService.getRestaurants()
  	obs.subscribe(data => {
  		if(data["errors"]){
  			this.errors = data["data"]
  		}
  		else{
  			this.restaurants = data["data"]
  		}
  	})
  }
  
  showRestaurantId(id){
    this._router.navigate(['/edit/' + id])
  }

  showReviewsId(id){
    this._router.navigate(['/reviews/' + id])
  }
  
  deleteRestaurantThroughService(id){
    let observable = this._httpService.deleteRestaurant(id);
    observable.subscribe(data => {
      console.log("deleted the author successfully", data);
      this.getRestaurantsThroughService();
    })
  };
}
