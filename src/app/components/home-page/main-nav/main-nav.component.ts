import { Component, OnInit, Output, EventEmitter } from '@angular/core';
@Component({
	selector: 'app-main-nav',
	templateUrl: './main-nav.component.html',
	styleUrls: ['./main-nav.component.css'],
})
export class MainNavComponent implements OnInit {

	@Output() sideNavMenuToggle: EventEmitter<void> = new EventEmitter();
	@Output() accountClicked: EventEmitter<void> = new EventEmitter();

	constructor() { }

	ngOnInit() { }

	onMenuClick() {
		this.sideNavMenuToggle.emit();
	}

	onAccountClick() {
		this.accountClicked.emit();
	}
}
