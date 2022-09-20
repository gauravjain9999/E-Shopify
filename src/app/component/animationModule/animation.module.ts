import { state, animate, style, transition, trigger } from '@angular/animations';
export let fade =  trigger('fade', [

  // Use this also in transition 'void <=> *'
  state('void', style({backgroundColor: 'lightgrey',opacity:0})),
  transition(':enter, :leave', [
    animate(2000)
]),

//   transition(':enter', [
//     style({ right: '-400%' }),
//     animate('.2s ease-in-out', style({ right: 0 }))
// ]),

// transition(':leave', [
//     animate('.2s ease-in-out', style({ right: '-400%' }))
// ])

])
