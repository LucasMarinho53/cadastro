import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalFornecedorDetailsComponent } from './modal-fornecedor-details.component';

describe('ModalFornecedorDetailsComponent', () => {
  let component: ModalFornecedorDetailsComponent;
  let fixture: ComponentFixture<ModalFornecedorDetailsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalFornecedorDetailsComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalFornecedorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
