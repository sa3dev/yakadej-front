import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from 'src/app/services/food/food.service.model';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-catalog-toolbar',
  templateUrl: './catalog-toolbar.component.html',
  styleUrls: ['./catalog-toolbar.component.css']
})
export class CatalogToolbarComponent implements OnInit {

  @Input() hasSecondRow: boolean;
  @Input() articleCount: number;

  router: Router;
  isConnected: boolean;

  constructor(router: Router, private userService: UserService) {
    this.router = router;
    this.articleCount = 0;
    this.isConnected = false;
  }

  ngOnInit() {
    this.userService.isConnected().subscribe(ic => this.isConnected = ic);
  }

}
