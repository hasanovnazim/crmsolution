import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignsAddComponent } from './campaigns-add.component';

describe('CampaignsAddComponent', () => {
  let component: CampaignsAddComponent;
  let fixture: ComponentFixture<CampaignsAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignsAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
