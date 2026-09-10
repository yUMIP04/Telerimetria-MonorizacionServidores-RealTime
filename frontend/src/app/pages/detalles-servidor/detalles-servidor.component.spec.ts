import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesServidorComponent } from './detalles-servidor.component';

describe('DetallesServidorComponent', () => {
  let component: DetallesServidorComponent;
  let fixture: ComponentFixture<DetallesServidorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetallesServidorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetallesServidorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
