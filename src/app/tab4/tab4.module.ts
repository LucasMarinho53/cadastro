import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab4Page } from './tab4.page';


import { Tab4PageRoutingModule } from './tab4-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FornecedorService } from '../services/fornecedor.service';
import { ModalFornecedorDetailsModule } from '../modal-fornecedor-details/modal-fornecedor-details.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    Tab4PageRoutingModule,
    ModalFornecedorDetailsModule
  ],
  declarations: [Tab4Page],
  providers: [FornecedorService]
})
export class Tab4PageModule {}
