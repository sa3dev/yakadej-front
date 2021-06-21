import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { ToolbarService } from 'src/app/services/toolbar.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  a: boolean;
  b: boolean;
  c: boolean;
  d: boolean;
  e: boolean;
  f: boolean;
  g: boolean;
  h: boolean;
  i: boolean;
  j: boolean;
  k: boolean;
  l: boolean;
  m: boolean;
  n: boolean;
  o: boolean;
  p: boolean;
  q: boolean;
  r: boolean;
  s: boolean;
  t: boolean;
  u: boolean;
  v: boolean;
  isUserConnected: boolean;

  constructor(
    private userService: UserService,
    private router: Router,
    private toolbarService: ToolbarService
  ) { }

  ngOnInit() {
    this.userService.isConnected().subscribe(
      (iC) => this.isUserConnected = iC,
      (err) => this.isUserConnected = false
    );
    document.getElementsByClassName('mat-drawer-content mat-sidenav-content')[0].scroll(0, 0);
  }

  companyTry() {
    this.toolbarService.askForCompanySearch();
  }

  goToExtra() {
    this.router.navigate(['/order/carte'], { queryParams: { section: 297 } });
  }

}
