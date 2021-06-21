import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ImageWithLegend } from 'src/app/components/image-with-legend/image-with-legend.model';
import { ToolbarService } from 'src/app/services/toolbar.service';

@Component({
	selector: 'app-home-order',
	templateUrl: './order.component.html',
	styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
	private toolbarServ: ToolbarService;

	brandImages: ImageWithLegend[] = [
		{ url: '/assets/image/picto/pic-plat.svg', title: 'Plats cuisinés maison', color: 'legend_label_homepage' },
		{ url: '/assets/image/picto/pic-clic.svg', title: 'Livré en un clic !', color: 'legend_label_homepage' },
		{ url: '/assets/image/picto/pic-formule.svg', title: 'Formule plat, dessert & boisson', color: 'legend_label_homepage' },
	];
	constructor(tbService: ToolbarService, private cdr: ChangeDetectorRef) {
		this.toolbarServ = tbService;
	}

  ngOnInit() { }

  refresh() {
    this.cdr.detectChanges();
  }

	askSignIn() {
		this.toolbarServ.askForLogin();
	}
}
