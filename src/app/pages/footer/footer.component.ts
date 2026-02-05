import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  anioActual: number = new Date().getFullYear();

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      // Detectar si estamos en móvil (768px o menos)
      const isMobile = window.innerWidth <= 768;
      // Usar offset menor en móvil para mejor centrado
      const offset = isMobile ? 30 : 100;
      
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  }
}