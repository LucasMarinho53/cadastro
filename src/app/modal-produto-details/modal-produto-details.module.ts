import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ModalProdutoDetailsComponent } from './modal-produto-details.component';



@NgModule({
  declarations: [ModalProdutoDetailsComponent],
  imports: [CommonModule, IonicModule],
  exports: []
})
export class ModalProdutoDetailsModule { }
