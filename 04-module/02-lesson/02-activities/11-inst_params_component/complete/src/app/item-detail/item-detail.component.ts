import { Component, OnInit } from '@angular/core';
import { ParamMap, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.scss']
})
export class ItemDetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    
  ) { }

  paramSub: Subscription;

  ngOnInit() {
    this.paramSub = this.route.paramMap.subscribe(
      (paramMap: ParamMap) => {
        console.log('paramMap itemIndex', paramMap.get('itemIndex'));
        const itemIndex = +paramMap.get('itemIndex');

      })
  }

}
