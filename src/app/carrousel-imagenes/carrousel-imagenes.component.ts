import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-carrousel-imagenes',
  imports: [CommonModule],
  templateUrl: './carrousel-imagenes.component.html',
  styleUrl: './carrousel-imagenes.component.css',
})
export class CarrouselImagenesComponent {
  images = [
    {
      src: 'https://dummyimage.com/800x800/000/fff.png&text=Imagen+1',
      alt: 'Imagen 1',
    },
    {
      src: 'https://dummyimage.com/800x800/333/fff.png&text=Imagen+2',
      alt: 'Imagen 2',
    },
    {
      src: 'https://dummyimage.com/800x800/666/fff.png&text=Imagen+3',
      alt: 'Imagen 3',
    },
  ];

  currentIndex: number = 0;
  intervalId: any;

  ngOnInit(): void {
    this.startAutoSlide();
  }

  startAutoSlide(): void {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
    }, 3000); // Cambia cada 3 segundos
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }
}
