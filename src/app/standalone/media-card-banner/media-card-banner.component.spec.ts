import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaCardBannerComponent } from './media-card-banner.component';

describe('MediaCardBannerComponent', () => {
  let component: MediaCardBannerComponent;
  let fixture: ComponentFixture<MediaCardBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaCardBannerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaCardBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
