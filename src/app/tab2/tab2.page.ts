import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ModalProdutoDetailsComponent } from '../modal-produto-details/modal-produto-details.component';
import { Produto } from '../model/produto.model';
import { ProdutoService } from '../services/produto.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  produtos!: Produto[];

  constructor(private service: ProdutoService, private modalCtrl: ModalController) {}

  public ionViewWillEnter(): void {
    this.listaProduto();
  };

  listaProduto() {
    this.service.getProdutos().subscribe({
      next:(result) => this.produtos = result,
      error:(err) => console.error(err),
    });
  }

  async OpenModal(id:number) {
    const produto = this.produtos.find(produto => produto.id === id);
    const modal = await this.modalCtrl.create({
      component: ModalProdutoDetailsComponent,
      componentProps: {
        'produto': produto
      }
    });
    return await modal.present();
  }

}
