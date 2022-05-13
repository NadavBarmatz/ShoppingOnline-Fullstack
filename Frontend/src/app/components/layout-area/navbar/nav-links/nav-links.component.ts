import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { AboutUsService } from 'src/app/services/about-us.service';

@Component({
  selector: 'app-nav-links',
  templateUrl: './nav-links.component.html',
  styleUrls: ['./nav-links.component.css']
})
export class NavLinksComponent {

  constructor(private router: Router, private scrollService: AboutUsService) { }

  public toAboutUsSection() {
    if(this.router.url !== '/home'){
      this.router.navigateByUrl("/home")
      setTimeout(()=>{
        this.scrollService.slideAction(true);
      }, 1)
    }
    else{
      this.scrollService.slideAction(true);
    }
  }
}
