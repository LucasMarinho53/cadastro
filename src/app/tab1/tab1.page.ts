import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { constants } from 'buffer';
import { Constants } from '../model/constants';
import { Produto } from '../model/produto.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseprodutoService } from '../services/firebaseproduto.service';


@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit{

  produtoForm!: FormGroup;
  @ViewChild('createForm') createForm!: FormGroupDirective;
  statusCadastro!:string;
  produto!:Produto;
  editable:boolean = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private firebaseprodutoService: FirebaseprodutoService) {}

  ngOnInit(): void{
    this.produtoForm = new FormGroup({
      'nome': new FormControl ('',[Validators.required,Validators.minLength(4),Validators.maxLength(100)]),
      'quantidade': new FormControl ('',[Validators.required,Validators.minLength(1),Validators.maxLength(100), Validators.pattern(/^[0-9]+$/)]),
      'precoCompra': new FormControl ('',[Validators.required,Validators.minLength(1),Validators.maxLength(100), Validators.pattern(/^[0-9]+$/)]),
      'fornecedor': new FormControl ('',[Validators.required,Validators.minLength(1),Validators.maxLength(100)]),
      'lucro': new FormControl ('',[Validators.required,Validators.minLength(1),Validators.maxLength(100)]),
    });


  this.route.paramMap.subscribe(params => {
    const produtoId = params.get('id')!;

    if(produtoId){
      this.firebaseprodutoService.findproduto(produtoId).subscribe({
        next: (produtoDB:Produto) => {
          this.produto = produtoDB;
          this.editable = true;
          this.loadForm();
        },
        error: (err) => console.log(err)
      });
    }
  });
}

  createProduto(values: any){
    let newProduto:Produto = {...values};

    newProduto.precoVenda = this.compra +(this.compra * this.porcentagem/100)

    this.firebaseprodutoService.saveproduto(newProduto);
    this.createForm.reset();
    this.router.navigateByUrl('/tabs/tab2');
  }

  loadForm(){
    this.produtoForm.patchValue({
      nome: this.produto.nome,
      quantidade: this.produto.quantidade,
      precoCompra: this.produto.precoCompra,
      precoVenda: this.produto.precoVenda,
      fornecedor: this.produto.fornecedor,
      lucro: this.produto.lucro
    });
  }

  editProduto(values: any){
    const editProduto = this.produtoForm.getRawValue() as Produto;
    let produto: Produto = { ...values };
    editProduto.id = this.produto.id;
    editProduto.precoVenda = this.compra +(this.compra * this.porcentagem/100)

    this.firebaseprodutoService.updateproduto(editProduto);
    this.produtoForm.reset();
    this.router.navigateByUrl('/tabs/tab2');
  }

  get compra(){return this.produtoForm.get('precoCompra')?.value}
  get porcentagem(){return this.produtoForm.get('lucro')?.value}
}
