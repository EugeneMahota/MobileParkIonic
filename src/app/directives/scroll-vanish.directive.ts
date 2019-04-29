import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import {DomController} from '@ionic/angular';

@Directive({
    selector: '[myScrollVanish]'
})
export class ScrollVanishDirective implements OnInit {

    @Input('myScrollVanish') scrollArea;

    private hidden: boolean = false;
    private triggerDistance: number = 20;

    constructor(
        private element: ElementRef,
        private renderer: Renderer2,
        private domCtrl: DomController
    ) {
    }

    ngOnInit() {

        this.scrollArea.ionScroll.subscribe(scrollEvent => {
            let delta = scrollEvent.detail.deltaY;

            if (delta < -this.triggerDistance) {
                this.show();
            } else if (delta > this.triggerDistance) {
                this.hide();
            }
        });
    }

    hide() {
        this.domCtrl.write(() => {
            this.renderer.setStyle(this.element.nativeElement, 'height', '0');
            this.renderer.setStyle(this.element.nativeElement, 'opacity', '0');
        });

        this.hidden = true;
    }

    show() {
        this.domCtrl.write(() => {
            this.renderer.removeStyle(this.element.nativeElement, 'height');
            this.renderer.removeStyle(this.element.nativeElement, 'opacity');
        });

        this.hidden = false;
    }

}
