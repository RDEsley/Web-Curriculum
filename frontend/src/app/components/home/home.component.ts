import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.scrollToSection();
  }

  scrollToSection() {
    const links = document.querySelectorAll('a.nav-link');
    links.forEach(link => {
      link.addEventListener('click', (event) => {
        event.preventDefault();
        const targetId = (link.getAttribute('href') as string).substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 50, // Ajuste o valor conforme necessário
            behavior: 'smooth'
          });
        }
      });
    });
  }
}
