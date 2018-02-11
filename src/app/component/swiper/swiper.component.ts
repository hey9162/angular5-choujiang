import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss']
})
export class SwiperComponent implements OnInit {
  options: object;
  constructor() { }
  ngOnInit() {
    this.options = {
      speed: 400,
      loop: true,
      autoplay: {
        delay: 2000,
        disableOnInteraction : false, 
      }, 
      on: {
        init: function () {
          console.log('swiper initialized');
        },
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
      },
    }
  }
}
