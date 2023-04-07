import {
  Directive,
  ElementRef,
  Input,
  OnInit,
  Renderer2,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { Facade } from '../facade';
import { Role, rolesList } from './rolesList';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { RoleReplacementComponent } from './role-replacement.component';

@UntilDestroy({ checkProperties: true })
@Directive({
  selector: '[rbac]',
})
export class RolesDirective implements OnInit {
  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private authFacade: Facade,
    private renderer: Renderer2,
    private el: ElementRef
  ) {}
  @Input() public rbac: Array<Role> = [];
  @Input() public rbacReplacement: string = '';
  ngOnInit() {
    this.authFacade.roles$.pipe(untilDestroyed(this)).subscribe((roles) => {
      // if (!roles) {
      //   this.viewContainerRef.clear();
      // }
      // if (roles.find((v) => v === rolesList.DEBITOR_OPERATOR)) {
      //   this.viewContainerRef.createEmbeddedView(this.templateRef);
      //   return;
      // }
      const idx = roles.findIndex(
        (element) => this.rbac.indexOf(element) !== -1
      );

      if (idx < 0) {
        this.viewContainerRef.clear();
        const span = this.renderer.createElement('span');
        const text = this.renderer.createText(this.rbacReplacement);

        this.renderer.appendChild(span, text);
        this.renderer.appendChild(this.el.nativeElement.parentElement, span);
      } else {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      }
    });
  }
}
