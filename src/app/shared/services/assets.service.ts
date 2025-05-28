import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssetsService {
  private readonly imageBucket = environment.ImageBucket;

  getImageUrl(path: string): string {
    return `${this.imageBucket}${path}`;
  }

  getLogo(name: 'imagotipo-slyfox' | 'isotipo-slyfox'): string {
    return this.getImageUrl(`/logos/${name}.svg`);
  }

  getCardMedia(number: 1 | 2): string {
    return this.getImageUrl(`/images/card-media-${number}.webp`);
  }
}
