import { Component, OnInit } from '@angular/core';
import { HttpService } from '../http.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})

export class ReviewComponent implements OnInit {
  errors;
  restaurant = [];
  id: any;
  reviews = [];
  user_name: any;
  stars: any;

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
      if(data["message"] === "errors"){
            this.errors = data["errors"]
      }
      else{
    		this.restaurant = data["data"]
    		this.reviews = data["data"]["reviews"]
        this.user_name = data["data"]["reviews"]["user_name"]
        this.stars = data["data"]["reviews"]["stars"]
      }
  	})
  }
}




  

