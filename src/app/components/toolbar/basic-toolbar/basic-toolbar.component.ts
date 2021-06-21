import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-basic-toolbar',
  templateUrl: './basic-toolbar.component.html',
  styleUrls: ['./basic-toolbar.component.css']
})
export class BasicToolbarComponent implements OnInit {

  @Output() sideNavMenuToggle: EventEmitter<void> = new EventEmitter();
  @Output() accountClicked: EventEmitter<void> = new EventEmitter();

  isConnected: boolean;

  constructor(private userService: UserService) {
    this.isConnected = false;
  }

  ngOnInit() {
    this.userService.isConnected().subscribe(ic => this.isConnected = ic);
  }

  onMenuClick() {
    this.sideNavMenuToggle.emit();
  }

  onAccountClick() {
    this.accountClicked.emit();
  }

}
