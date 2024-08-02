import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavContentContainerComponent } from './sidenav-content-container.component';

describe('SidenavContentContainerComponent', () => {
  let component: SidenavContentContainerComponent;
  let fixture: ComponentFixture<SidenavContentContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavContentContainerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavContentContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
