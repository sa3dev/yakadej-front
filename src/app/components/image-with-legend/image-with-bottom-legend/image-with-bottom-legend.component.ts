import { Component, OnInit, Input } from '@angular/core';
import { ImageWithLegend } from '../image-with-legend.model';

@Component({
  selector: 'app-image-with-bottom-legend',
  templateUrl: './image-with-bottom-legend.component.html',
  styleUrls: ['./image-with-bottom-legend.component.css']
})
export class ImageWithBottomLegendComponent implements OnInit {

  @Input() image: ImageWithLegend;

  constructor() { }

  ngOnInit() {
  }

}
