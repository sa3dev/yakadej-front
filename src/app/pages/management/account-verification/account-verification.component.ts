import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-account-verification',
  template: '<div></div>'
})
export class AccountVerificationComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (p: Params) => {
        const userId = p['userId'];
        if (userId) {
          this.userService
            .validateAccount()
            .subscribe(
              (succes) => {
                console.log('account verified redirect normaly in order/menu ', succes);
                this.router.navigate(['/order']);
              }
              , (err) => {
                console.log(err);
                this.router.navigate(['']);
              }
            );
        } else {
          console.log('redirect in home page account-verification here');
          this.router.navigate(['']);
        }
      }
    );
  }

}
