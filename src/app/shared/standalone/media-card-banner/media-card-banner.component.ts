import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SlyfoxUiIconComponent } from 'slyfox-ui';

@Component({
  selector: 'app-media-card-banner',
  imports: [SlyfoxUiIconComponent, NgOptimizedImage, CommonModule],
  templateUrl: './media-card-banner.component.html',
  styleUrl: './media-card-banner.component.scss'
})
export class MediaCardBannerComponent implements OnInit {

  protected readonly mediaContent = [
    {
      mediaText: `Creamos soluciones de software a tu medida para que tu negocio avance con precisión, eficiencia y sin límites.Estás a un paso de comenzar una experiencia pensada especialmente para ti.
      Regístrate y transforma tu manera de trabajar.`,
      mediaImage: '/images/card-media-1.webp',
      selected: true,
    },
    {
      mediaText: `Tu visión es única, y nuestro software también. Desde aquí comienza una experiencia personalizada, construida para adaptarse a tus procesos, crecer contigo y llevar tu proyecto al siguiente nivel.
      Estamos listos. ¿Y tú?`,
      mediaImage: '/images/card-media-2.webp',
      selected: false,
    },

  ]

  constructo() {}

  ngOnInit(): void {
    this.MediaCardAutoPlay()
  }

  private MediaCardAutoPlay() {
    setInterval(() => {
      const selectedIndex = this.mediaContent.findIndex((item) => item.selected)
      let nextIndex = (selectedIndex + 1) % this.mediaContent.length
      if(selectedIndex === this.mediaContent.length) nextIndex = 0;
      this.mediaContent[selectedIndex].selected = false
      this.mediaContent[nextIndex].selected = true
    }, 5000)
  }
}
