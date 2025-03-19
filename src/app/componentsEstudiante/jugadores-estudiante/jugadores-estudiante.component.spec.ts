import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JugadoresEstudianteComponent } from './jugadores-estudiante.component';

describe('JugadoresEstudianteComponent', () => {
  let component: JugadoresEstudianteComponent;
  let fixture: ComponentFixture<JugadoresEstudianteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JugadoresEstudianteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JugadoresEstudianteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
