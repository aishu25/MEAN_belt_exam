import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  
  id: any;
  restaurant: any;
  errors: any;

  constructor(
  	private _httpService: HttpService, 
  	private _route: ActivatedRoute, 
  	private _router: Router) { }

  ngOnInit() {
  	this.restaurant = { restaurant_name: "" }
    this._route.params.subscribe( params => {
      this.id = params['id'];
      console.log(" id : ", this.id);
    });
  }
  
  addRestaurantThroughService(){
  	console.log("hits component")
  	let obs = this._httpService.addRestaurant(this.restaurant);
	  obs.subscribe(data => {
		if(data["message"] === "errors"){
			this.errors = data["errors"]
		}
		else{
			this._router.navigate(['/'])
		}
	})
  }
}


 
