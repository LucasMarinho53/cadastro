import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Fornecedor } from '../model/fornecedor.model';
import { FirebasefornecedorService } from '../services/firebasefornecedor.service';

@Component({
  selector: 'app-modal-fornecedor-details',
  templateUrl: './modal-fornecedor-details.component.html',
  styleUrls: ['./modal-fornecedor-details.component.scss'],
})
export class ModalFornecedorDetailsComponent implements OnInit {

  @Input() fornecedor!: Fornecedor;

  constructor(private modalCtrl: ModalController,
    private router: Router,
    private firebasefornecedorService: FirebasefornecedorService) {}

  cancel(){
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  ngOnInit() {}

  editFornecedor(id:string){
    this.router.navigate(['/tabs/editarfor', id]);
    this.modalCtrl.dismiss(null, 'cancel');
  }

  delete(id:string){
    this.firebasefornecedorService.deletefornecedor(id);
    this.modalCtrl.dismiss(null, 'cancel');
  }

}
