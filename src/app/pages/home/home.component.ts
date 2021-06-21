import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToolbarService } from 'src/app/services/toolbar.service';
import { OrderComponent } from 'src/app/components/home-page/order/order.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {

  private isTransparent: boolean;
  @ViewChild('homeorder') homeOrderComponent: OrderComponent;
  scrollTop: 0;
  showComponent = true;

  constructor(
    private router: Router, private tbService: ToolbarService) {
    this.tbService = tbService;
    this.tbService.setSecondRow(false);
  }

  ngOnInit() {
    this.isTransparent = true;
    this.tbService.setTransparent(true);
    window.addEventListener('scroll', this.scroll, true);
  }

  ngAfterViewInit(): void {
    this.homeOrderComponent.refresh();
  }

  public refresh() {
    this.showComponent = false;
    setTimeout(x => this.showComponent = true);
  }

  scroll = (event: any): void => {
    this.scrollTop = event.srcElement.scrollTop;
  }

  onUserLoggedIn() {
    this.router.navigate(['/order/menu']);
  }

  displaySearchCompany() {
    this.tbService.askForCompanySearch();
  }

  ngOnDestroy() {
    window.removeEventListener('scroll', this.scroll, true);
  }
}
