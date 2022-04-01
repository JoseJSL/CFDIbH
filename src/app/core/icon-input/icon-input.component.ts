import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'icon-input',
  templateUrl: './icon-input.component.html',
  styleUrls: ['./icon-input.component.scss']
})
export class IconInputComponent implements OnInit {
  @Input() placeholder!: string;
  @Input() label: string | undefined;
  @Input() iconName: string | undefined;
  @Input() type: string | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
