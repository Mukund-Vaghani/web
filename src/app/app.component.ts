import { Component } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import * as AOS from 'aos';
import * as $ from 'jquery';
import { Router,NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from './service/contact.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web';

  contactForm:FormGroup;
  is_submited = false;

  constructor(private router: Router, private fb:FormBuilder, private userService:ContactService) {
    this.contactForm = this.fb.group({
      name : ['',[Validators.required]],
      email:['',[Validators.required,Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$')]],
      phone : ['']
    })
  }

  get contactControl(){
    return this.contactForm.controls;
  }

  handelForm(){
    this.is_submited = true;
    if(this.contactForm.valid){

      this.userService.webUserContact(this.contactForm.value).subscribe((response:any)=>{
        if(response.code == '1'){
          Swal.fire({ icon: 'success', title: response.message, toast: true, position: 'top-end', showConfirmButton: false, timer: 3000 });
          this.contactForm.reset();
          Object.keys(this.contactForm.controls).forEach((key) => {
            this.contactForm.get(key)?.setErrors(null);
          });
        }else{
          Swal.fire({ icon: 'error', title: response.message, toast: true, position: 'top-end', showConfirmButton: false, timer: 3000 });
        }
      })
    }
  }

  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
  };

  customOptionsButton: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: false,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['<button class="prev-btn"><</button>', '<button class="next-btn">></button>'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    nav: true
  };

  ngOnInit() {
    AOS.init();
    AOS.refresh();

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const fragment = this.router.routerState.snapshot.root.fragment;
        if (fragment) {
          const element = document.getElementById(fragment);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      });


    $(window).scroll(function () {
      if ($(window).scrollTop()?.toString() && $(window).scrollTop()! >= 100) {
        $('.main-header').addClass('fixed-header');
        $('#back-to-top').addClass('show')
      } else {
        $('#back-to-top').removeClass('show')
        $('.main-header').removeClass('fixed-header');
      }
    });
  }

  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'  // Smooth scrolling
    });
  }

  activeItem: string = '';

  setActiveItem(item: string): void {
    this.activeItem = item;
  }

}
