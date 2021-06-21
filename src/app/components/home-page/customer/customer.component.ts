import { Component, OnInit } from '@angular/core';
import { ImageWithLegend } from 'src/app/components/image-with-legend/image-with-legend.model';

@Component({
	selector: 'app-home-customer',
	templateUrl: './customer.component.html',
	styleUrls: ['./customer.component.css'],
})
export class CustomerComponent implements OnInit {

	slides = [
		{ img: '/assets/customer/auchan.png', title: 'Auchan Retail' },
		{ img: '/assets/customer/BNP_Paribas.png', title: 'BNP Paribas' },
		{ img: '/assets/customer/kiloutou-logo.png', title: 'Kiloutou' },
		{ img: '/assets/customer/nordnet.png', title: 'Nordnet' },
		{ img: '/assets/customer/sncf.png', title: 'SNCF' },
		{ img: '/assets/customer/zodio.png', title: 'Zodio' },
	];
	slideConfig: any;

	constructor() { }

	ngOnInit() {
		this.slideConfig = {
			slidesToShow: 4,
			slidesToScroll: 4,
			dots: false,
			arrows: true,
			infinite: true,
			prevArrow: '<img class=\'clickable slide_prev\' src=\'assets/icons/prev.svg\'>',
			nextArrow: '<img class=\'clickable slide_next\' src=\'assets/icons/next.svg\'>',
		};
	}
}
