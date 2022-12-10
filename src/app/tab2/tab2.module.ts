import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';


import { Tab2PageRoutingModule } from './tab2-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ProdutoService } from '../services/produto.service';
import { ModalProdutoDetailsModule } from '../modal-produto-details/modal-produto-details.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab2PageRoutingModule,
    HttpClientModule,
    ModalProdutoDetailsModule
  ],
  declarations: [Tab2Page],
  providers: [ProdutoService]
})
export class Tab2PageModule {}
