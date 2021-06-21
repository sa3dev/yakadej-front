import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-home-delivery',
	templateUrl: './delivery.component.html',
	styleUrls: ['./delivery.component.css'],
})
export class DeliveryComponent implements OnInit {

	@Output() deliveryClicked: EventEmitter<void> = new EventEmitter();

	constructor(private route: Router) { }

	ngOnInit() { }

	onCompanySearch(event: any) { }

	redirectConcept() {
		this.route.navigate(['/concept']);
	}
}
