import { Component, OnInit, Input, Output } from '@angular/core';
import { FoodItem } from 'src/app/models/food.model';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent {

  static ALLERGEN_ICONS = {
    'oeuf': 'allergen_oeuf',
    'lait': 'allergen_lait',
    'soja': 'allergen_soja',
    'farine de froment': 'allergen_farine_froment',
    'œufs': 'allergen_oeuf',
    'farine de blé': 'allergen_farine_ble',
    'œuf': 'allergen_oeuf',
    'amidon de froment': 'allergen_farine_froment',
    'poisson': 'allergen_poisson',
    'anhydride sulfureux et sulfites': 'allergen_sulfites',
    'fruits à coque': 'allergen_fruits_coque',
    'soja et produits à base de soja': 'allergen_soja',
    'oeufs': 'allergen_oeuf',
    'fruits à coques': 'allergen_fruits_coque',
    'céréales de blé': 'allergen_farine_ble',
    'beurre': 'allergen_lait',
    'sulfite et anhydride sulfureux': 'allergen_sulfites',
    'céleri': 'allergen_celeri',
    'moutarde': 'allergen_moutarde',
    'sésame': 'allergen_sesame',
    'farine d’orge': 'allergen_farine_ble',
    'anhydride sulfureux et sulfites.': 'allergen_sulfites',
    'farine de seigle': 'allergen_farine_seigle',
    'les alergènes': '',
    'semoule de blé dur': 'allergen_farine_ble',
    'crustacés': 'allergen_crustaces',
    'arachide': 'allergen_arachides',
    'arachides': 'allergen_arachides',
    'graines de blé': 'allergen_semoule_ble',
    'sulfite': 'allergen_sulfites',
    'semoule de blé': 'allergen_semoule_ble',
    'notre pain classique contient du gluten': 'allergen_gluten',
    'pensez à demander un pain sans gluten.': 'allergen_gluten',
    'fruit a coques': 'allergen_fruits_coque',
    'sulfites': 'allergen_sulfites',
    'poissons': 'allergen_poisson',
    'gluten': 'allergen_gluten',
    'crustacé': 'allergen_crustaces',
    'farine dé blé': 'allergen_farine_ble',
    'céléri': 'allergen_celeri',
    'moutarde céleri': 'allergen_celeri',
    'amidon de blé': 'allergen_semoule_ble',
    'fruit à coque': 'allergen_fruits_coque',
    'farine et semoule de blé': 'allergen_farine_ble',
    'arachides et produits à base d\'arachides': 'allergen_arachides',
    'pas d\'allergène': '',
    'lait gluten de blé oeuf': 'allergen_gluten',
    'oeufs.': 'allergen_oeuf',
    'céléri.': 'allergen_celeri'
  };

  @Input() fromMenu: boolean;
  @Input() sameFamillyItems: FoodItem[];
  @Input() product: FoodItem;
  @Output() itemChosen: EventEmitter<FoodItem> = new EventEmitter();
  @Output() closeDetails: EventEmitter<any> = new EventEmitter();

  constructor() { }

  /**
   * From a given allergen (fetched from the API) it returns the name of the icon res to use
   * @param allergen the allergen from the API
   */
  iconNameFromAllergen(allergen: string) {
    return ProductDetailComponent.ALLERGEN_ICONS[allergen];
  }

  onItemChosen() {
    this.itemChosen.emit(this.product);
    this.onCloseDetails();
  }

  onCloseDetails() {
    this.closeDetails.emit(null);
  }

}
