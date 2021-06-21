import { Component, OnInit, Input } from '@angular/core';
import { ImageWithLegend } from '../../image-with-legend/image-with-legend.model';

@Component({
  selector: 'app-image-row',
  templateUrl: './image-row.component.html',
  styleUrls: ['./image-row.component.css']
})
export class ImageRowComponent implements OnInit {

  @Input() images: ImageWithLegend[];

  constructor() { }

  ngOnInit() {
  }

}
