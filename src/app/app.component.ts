import { Component, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { HeaderComponent } from './pages/header/header.component';
import { FooterComponent } from './pages/footer/footer.component';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent, FooterComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'dalias';
  showScrollButton = false;
  whatsappLink = 'https://api.whatsapp.com/send?phone=51981776156&text=Hola%20%F0%9F%91%8B%F0%9F%8F%BD%2C%20me%20gustar%C3%ADa%20recibir%20mayor%20informaci%C3%B3n%20sobre%20%F0%9F%8F%A1%20Residencia%20Las%20Dalias%20y%20poder%20agendar%20una%20visita%20%F0%9F%98%8A';

  private routerSubscription?: Subscription;

  constructor(private router: Router) {}

  ngOnInit() {
    this.updateWhatsappLink(this.router.url);

    this.routerSubscription = this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.updateWhatsappLink(event.urlAfterRedirects);
      });
  }

  ngOnDestroy() {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe();
    }
  }

  private updateWhatsappLink(url: string) {
    const cleanUrl = url.split('?')[0].split('#')[0];
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showScrollButton = window.pageYOffset > 300;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
