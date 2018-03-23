import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-write',
  templateUrl: './write.component.html',
  styleUrls: ['./write.component.css']
})
export class WriteComponent implements OnInit {
  errors;
  restaurant = [];
  id: any;
  reviews = { reviews: ""};
  user_name: any;

  constructor(
  	private _httpService: HttpService, 
  	private _route: ActivatedRoute, 
  	private _router: Router) { }

  ngOnInit() {

  	this._route.params.subscribe( params => {
  		this.id = params['id'];
  		console.log(" id : ", this.id);
  	});
  	this.oneReviewInfoRetrieve(this.id);
  }

  oneReviewInfoRetrieve(id){
  	let obs = this._httpService.getOneReview(this.id);
  	obs.subscribe(data => {
  		this.restaurant = data["data"]
  	})
  }
  addReviewThroughService(){
  	let obs = this._httpService.addReview(this.id, this.reviews);
	  obs.subscribe(data => {
		if (data["errors"]){
			this.errors = data["errors"]
		}
		else{
			this.reviews = data["data"]
			this._router.navigate(['/'])
		}	
	})
  }
}

