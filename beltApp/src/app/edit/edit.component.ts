import { Component, OnInit } from '@angular/core';
import { HttpService } from './../http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  
  id: any;
  restaurant: any;
  errors: any;

  constructor(
  	private _httpService: HttpService, 
  	private _route: ActivatedRoute, 
  	private _router: Router) { }

  ngOnInit() {
  	this._route.params.subscribe( params => {
  		this.id = params['id'];
  		console.log(" id : ", this.id);
  	});
  	
  	this.oneRestaurantInfoRetrieve(this.id);
  }

  oneRestaurantInfoRetrieve(id){
  	let obs = this._httpService.getOneRestaurant(this.id);
  	obs.subscribe(data => {
  		this.restaurant = data["data"]
  	})
  }

  updateOneRestaurantThroughService(id){
  	console.log("fetching resturansts")
  	let obs = this._httpService.updateRestaurant(this.id, this.restaurant)
  	obs.subscribe(data => {
		console.log(data);
  		if (data["message"] === "errors"){
  			this.errors = data["errors"]
  		}
  		else{
  			this._router.navigate(['/'])
  		}
  	})
  }
}
