import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { ModalProdutoDetailsComponent } from '../modal-produto-details/modal-produto-details.component';
import { Produto } from '../model/produto.model';
import { FirebaseprodutoService } from '../services/firebaseproduto.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  produtos!: Produto[];

  constructor(
    private modalCtrl: ModalController,
    private firebaseprodutoService: FirebaseprodutoService) {}

  public ionViewWillEnter(){
    this.firebaseprodutoService.listproduto().subscribe({
      next: (result) => {this.produtos = result},
      error: (err) => {console.error(err)}
    })
  }

  listaProduto() {
    this.firebaseprodutoService.listproduto().subscribe({
      next:(result) => this.produtos = result,
      error:(err) => console.error(err),
    });
  }

  async OpenModal(id:string) {
    const produto = this.produtos.find(produto => produto.id === id);
    console.log(produto)
    const modal = await this.modalCtrl.create({
      component: ModalProdutoDetailsComponent,
      componentProps: {
        'produto': produto
      }
    });
    return await modal.present();
  }

}
