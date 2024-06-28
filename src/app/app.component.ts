import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SvgIconComponent } from './road-svg/road-svg.component';
import { HttpClientModule } from '@angular/common/http';

type Road = {
  name: String,
  status: String,
  problems: String
} | null;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, SvgIconComponent, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor(private renderer: Renderer2){

  }
  title = 'road-management';

  road: Road = null;

  roadsInfo: Road[] = [{name: 'Road 1', status: 'Busy', problems: 'There was some incident. There is currently a large queue.'},
    {name: 'Road 2', status: 'Mid', problems: 'Your trip can be delayed a little bit.'},
    {name: 'Road 3', status: 'Mid', problems: 'Your trip can be delayed a little bit.'},
    {name: 'Road 4', status: 'Empty', problems: 'Its not very busy.'},    
  ]

  ngOnInit(): void{
    this.fetchRoadData(0);

    this.renderer.listen('document', 'roadHover', (event: CustomEvent) => {
      this.fetchRoadData(parseInt(event.detail.message));
    });
    
  }

  fetchRoadData(num: number): void{
    this.road = this.roadsInfo[num];
  }

}
