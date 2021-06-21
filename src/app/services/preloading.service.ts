import { Injectable } from '@angular/core';
import { FoodService } from './food/food.service';
import { APIFoodFamilly } from './food/food.service.model';
import { validateConfig } from '@angular/router/src/config';

@Injectable({
  providedIn: 'root'
})
export class PreloadingService {

  familyOrder = [300, 301, 296, 299, 298, 297];
  foodItems;

  constructor(private foodService: FoodService) {
  }

  public getBaseFoodItems() {
    // Image formules
    this.preloadImage('/assets/image/formule_raisonnable.png');
    this.preloadImage('/assets/image/formule_overbooke.png');
    this.preloadImage('/assets/image/formule_bavarde.png');
  }

  public getFoodItems() {

    const assets_path = '/assets/products/';
    const asset_adverts = '/assets/advertisings/';
    // Image formules
    this.preloadImage('/assets/image/formule_raisonnable.png');
    this.preloadImage('/assets/image/formule_overbooke.png');
    this.preloadImage('/assets/image/formule_bavarde.png');
    // Image Etapes
    this.preloadImage('/assets/image/steps/img_step_main_on.png');
    this.preloadImage('/assets/image/steps/img_step_main_off.png');
    this.preloadImage('/assets/image/steps/img_step_dessert_on.png');
    this.preloadImage('/assets/image/steps/img_step_dessert_off.png');
    this.preloadImage('/assets/image/steps/img_step_drink_on.png');
    this.preloadImage('/assets/image/steps/img_step_drink_off.png');
    this.preloadImage('/assets/image/steps/img_between.png');
    this.preloadImage('/assets/image/steps/img_between.png');
    this.preloadImage('/assets/image/steps/img_between.png');

    // Contour article survolé
    this.preloadImage('/assets/background/rose-2.png');
    // Icons
    this.preloadImage('/assets/icons/ic_order_location.svg');
    this.preloadImage('/assets/icons/ic_order_date.svg');
    this.preloadImage('/assets/icons/ic_sans_glutten.svg');
    this.preloadImage('/assets/icons/ic_vegan.svg');
    this.preloadImage('/assets/icons/ic_homemade.svg');
    this.preloadImage('/assets/icons/ic_bio.svg');
    // Image Step
    this.preloadImage('/assets/image/steps/desktop/menu_setp_1_edit.png');
    this.preloadImage('/assets/image/steps/desktop/menu_step_2_off_last.png');


    this.foodService.getAdverts().subscribe(value => {
      value.forEach(advert => {
        const imageAssert = asset_adverts + advert.image;
        this.preloadImage(imageAssert);
      });
    });

    this.foodService.getFoodItems().subscribe(value => {
      this.foodItems = value;

      if (value && value.length > 0) {
        this.familyOrder.forEach(family => {
          const familyFoods: APIFoodFamilly[] = value.filter(element => element.famillyCode === family);
          if (familyFoods.length > 0) {
            familyFoods[0].items.forEach(item => {
              const imageUrl = assets_path + item.iconsUrl.details;
              this.preloadImage(imageUrl);
            });
          }
        });
      }
      // return value;
    });
  }

  private preloadImage(url) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = url;
      img.onload = () => resolve(img);
      img.onerror = () => reject(new Error('could not load image'));
    });
  }

}
