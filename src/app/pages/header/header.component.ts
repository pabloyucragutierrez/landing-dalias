import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  isFixed = false;
  menuAbierto = false;
  activeSection = '';

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.isFixed = window.scrollY > 10;
    this.updateActiveSection();
  }

  toggleMenu(): void {
    this.menuAbierto = !this.menuAbierto;
  }

  cerrarMenu(): void {
    this.menuAbierto = false;
  }

  scrollToSection(sectionId: string): void {
    this.cerrarMenu();
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

  updateActiveSection(): void {
    const sections = ['nosotros', 'servicios', 'planes', 'instalaciones', 'actividades', 'testimonios', 'propuesta', 'contactanos'];
    
    // Detectar si estamos en móvil para ajustar el punto de detección
    const isMobile = window.innerWidth <= 768;
    const detectionPoint = isMobile ? 100 : 150;
    
    for (const sectionId of sections) {
      const element = document.getElementById(sectionId);
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top <= detectionPoint && rect.bottom >= detectionPoint) {
          this.activeSection = sectionId;
          break;
        }
      }
    }
  }

  isActive(section: string): boolean {
    return this.activeSection === section;
  }
}