import { Component, OnInit, AfterViewInit } from '@angular/core';

@Component({
	selector: 'app-home-slider',
	templateUrl: './slider.component.html',
	styleUrls: ['./slider.component.css'],
})
export class SliderComponent implements OnInit, AfterViewInit {
	slides: any[];
	slideConfig: any;
	style: any;

	constructor() { }
	ngOnInit() {
		this.slides = [
			{
				id: '1',
				image: '/assets/image/slide_healthy.jpg',
				title: 'Pour celle qui fait rimer midi avec healthy...',
				avatar: 'assets/image/profil_healthy.png'
			},
			{
				id: '2',
				image: '/assets/image/slide_tradi.jpg',
				title: 'Pour celui qui pense que la tradition, ça a du bon...',
				avatar: 'assets/image/profil_tradi.png'
			},
			{
				id: '3',
				image: '/assets/image/slide_voyage.jpg',
				title: 'Pour celui qui voyage sans quitter l\'open-space...',
				avatar: 'assets/image/profil_voyage.png'
			},
			{
				id: '4',
				image: '/assets/image/slide_insta.jpg',
				title: 'Pour celle qui l\'a déjà mis sur Insta...',
				avatar: 'assets/image/profil_insta.png'
			},
			{
				id: '5',
				image: '/assets/image/slide_voter.jpg',
				title: 'Pour celle qui revendique que manger, c\'est voter...',
				avatar: 'assets/image/profil_voter.png'
			},
		];

		this.slideConfig = {
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 2000,
			dots: true,
			arrows: false,
			infinite: true,
			prevArrow: '<img class=\'clickable slide_prev\' src=\'assets/icons/prev.svg\'>',
			nextArrow: '<img class=\'clickable slide_next\' src=\'assets/icons/next.svg\'>',
		};
	}
	ngAfterViewInit() {
		const button = document.querySelector('.slick-dots');
		const sp1 = document.querySelector('.indicator');
		sp1.appendChild(button);
	}
}
