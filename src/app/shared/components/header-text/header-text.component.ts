import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header-text',
  imports: [],
  templateUrl: './header-text.component.html',
  styleUrl: './header-text.component.css'
})
export class HeaderTextComponent {

  @Input() title!:string;
  @Input() subtitle!:string;
  

}
