import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [],
  templateUrl: './child.component.html',
  styleUrl: './child.component.css'
})
export class ChildComponent {

  @Input() name='';

  @Output() eventEmit = new EventEmitter<string>();

  data(){
    this.eventEmit.emit("hello");
  }

}
