import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Produto } from '../model/produto.model';
import { FirebaseprodutoService } from '../services/firebaseproduto.service';

@Component({
  selector: 'app-modal-produto-details',
  templateUrl: './modal-produto-details.component.html',
  styleUrls: ['./modal-produto-details.component.scss'],
})
export class ModalProdutoDetailsComponent implements OnInit {

  @Input() produto!: Produto;

  constructor(private modalCtrl: ModalController,
    private router: Router,
    private firebaseprodutoService: FirebaseprodutoService) { }

  cancel(){
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  ngOnInit() {}

  edit(id:string){
    this.router.navigate(['/tabs/editar', id]);
    this.modalCtrl.dismiss(null, 'cancel');
  }


  delete(id:string){
    this.firebaseprodutoService.deleteproduto(id);
    this.modalCtrl.dismiss(null, 'cancel');
    };

}
