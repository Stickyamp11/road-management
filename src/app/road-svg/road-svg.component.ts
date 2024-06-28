import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-svg-icon',
  standalone: true,
  templateUrl: './road-svg.component.html',
  styles: 'road:hover{filter: brightness(0) saturate(100%) invert(92%) sepia(65%) saturate(7500%) hue-rotate(159deg) brightness(97%) contrast(96%);}',
})
export class SvgIconComponent implements OnInit {
  constructor(
    ) {
  }

  public ngOnInit(): void {
    let index = 0;
    document.querySelectorAll('svg > g > g > g > g > g > g').forEach(function(g) {
      let isValidRoad = true;
      g.childNodes.forEach(child => {
        console.log(child,"child");
        if(child instanceof SVGPathElement || child instanceof SVGPolygonElement || child instanceof SVGRectElement){
          isValidRoad = false;
          return;
        }
      });

      if (isValidRoad) {
        console.log("cc");
          g.classList.add('road');
          g.classList.add('road-id-' + index);
          index = index + 1;
          
      }
    
    });

    let elements = Array.from(document.getElementsByClassName('road') as HTMLCollectionOf<HTMLElement>)
    for (let i = 0; i < elements.length; i++) {
      elements[i].addEventListener('mouseenter', function() {
        console.log("gggggg",this.style);
        let classNames = elements[i].classList;
        let roadId: String = "";
        classNames.forEach(className => {
          if(className.match('road-id-')){
            roadId = className.replace('road-id-', '');
          }
        });

        const customEvent = new CustomEvent('roadHover', {
          detail: { message: roadId }
        });
        
        // Dispatch the event on the document
        document.dispatchEvent(customEvent);
        
        this.style.filter = 'brightness(0) saturate(100%) invert(80%) sepia(91%) saturate(232%) hue-rotate(333deg) brightness(101%) contrast(99%)';
      });
  
      elements[i].addEventListener('mouseleave', function() {
        console.log("mouseleave");
        this.style.filter = '';
      });
  }
  }
}