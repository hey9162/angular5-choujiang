import { trigger, animate, style, animateChild, state, transition } from '@angular/animations';

export const fadeInUp = trigger('fadeInUpState', [
  state('in', style({opacity: 1, transform: 'translate3d(0, 0, 0)'})),
  transition('void => *', [
    style({
      opacity: 0,
      transform: 'translate3d(0, 100%, 0)'
    }), animate('.4s cubic-bezier(.25,.8,.25,1)')
  ])
])

export const fadeIn = trigger('fadeInState', [
  state('in', style({opacity: 1})),
  transition('void => *', [
    style({opacity: 0}),
    animate('.3s cubic-bezier(.35,0,.25,1)')
  ])
])

export const rotate = trigger('rotateState', [
  state('active', style({
    transform: `rotate(0deg)`
  })),
  state('win', style({
    transform: `rotate(45deg)`
  })),
  state('again', style({
    transform: `rotate(135deg)`
  })),
  state('loser', style({
    transform: `rotate(225deg)`
  })),
  transition('active => win', animate('4s ease-in-out', style({
    transform: `rotate(3645deg)`
  }))),
  transition('active => again', animate('4s ease-in-out', style({
    transform: `rotate(3735deg)`
  }))),
  transition('active => loser', animate('4s ease-in-out', style({
    transform: `rotate(3825deg)`
  }))),
  transition('active => loser', animate('4s ease-in-out', style({
    transform: `rotate(3915deg)`
  }))),
])