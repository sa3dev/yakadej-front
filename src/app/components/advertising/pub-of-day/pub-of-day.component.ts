import { Component, OnInit, Input } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-pub-of-day',
  templateUrl: './pub-of-day.component.html',
  styleUrls: ['./pub-of-day.component.css']
})
export class PubOfDayComponent implements OnInit {

  @Input() promo: any = {
    datePromoAvailable: {
      start: '01/08/2019',
      end: '10/11/2019'
    }
  };

  _imageFile: string;
  @Input() set imageFile(img: string) {
    this._imageFile = img;
  }

  promoAvailable: boolean;

  constructor() { }

  ngOnInit() {
    const start = moment(this.promo.datePromoAvailable.start);
    const end = moment(this.promo.datePromoAvailable.end);
    const available = moment().isBetween(start, end);
    this.promoAvailable = available;
  }

}
