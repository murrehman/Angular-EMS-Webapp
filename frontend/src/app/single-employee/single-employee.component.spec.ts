import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SingleEmployeeComponent } from './single-employee.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgxsModule } from '@ngxs/store';

describe('SingleEmployeeComponent', () => {
  let component: SingleEmployeeComponent;
  let fixture: ComponentFixture<SingleEmployeeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NgxsModule.forRoot(),
        HttpClientModule,
        RouterModule.forRoot([]),
      ],
      declarations: [SingleEmployeeComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleEmployeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
