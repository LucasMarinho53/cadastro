import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { constants } from 'buffer';
import { Constants } from '../model/constants';
import { Produto } from '../model/produto.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from '../services/produto.service';

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
    private produtoService: ProdutoService,
    private router: Router,
    private route: ActivatedRoute,
    /*private firebaseService: FirebaseService*/) {}

  ngOnInit(): void{
    this.produtoForm = new FormGroup({
      'nome': new FormControl ('',[Validators.required,Validators.minLength(4),Validators.maxLength(100)]),
      'quantidade': new FormControl ('',[Validators.required,Validators.minLength(1),Validators.maxLength(100), Validators.pattern(/^[0-9]+$/)]),
      'precoCompra': new FormControl ('',[Validators.required,Validators.minLength(1),Validators.maxLength(100), Validators.pattern(/^[0-9]+$/)]),
      'fornecedor': new FormControl ('',[Validators.required,Validators.minLength(1),Validators.maxLength(100)]),
      'lucro': new FormControl ('',[Validators.required,Validators.minLength(1),Validators.maxLength(100)]),
    });


  this.route.paramMap.subscribe(params => {
    const produtoId = +params.get('id')!;

    if(produtoId){
      this.produtoService.getProduto(produtoId).subscribe({
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

  OnSubmit(){
    this.createForm.reset();
  }

  createProduto(values: any){
    let newProduto:Produto = {...values};

    newProduto.precoVenda = this.compra +(this.compra * this.porcentagem/100)

    //this.firebaseService.save();
    console.log(newProduto);
  }

  addProduto(){
    const produto = this.produtoForm.getRawValue() as Produto;
    produto.precoVenda = this.compra +(this.compra * this.porcentagem/100)

    this.produtoService.insertProduto(produto)
        .subscribe({
          next: (result:any) => {
            this.produtoForm.reset();
            this.router.navigateByUrl('/tabs/tab2');
          },
          error: (error:any) => { console.log(error)}
        })
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

  editProduto(){
    const editProduto = this.produtoForm.getRawValue() as Produto;
    editProduto.id = this.produto.id;
    editProduto.precoVenda = this.compra +(this.compra * this.porcentagem/100)

    this.produtoService.updateProduto(editProduto).subscribe({
      next: () => {
        this.router.navigateByUrl('/tabs/tab2');
        this.produtoForm.reset();
      },
      error: (err) => {
        console.error(err);
        this.produtoForm.reset();
      }
    });

  }

  get compra(){return this.produtoForm.get('precoCompra')?.value}
  get porcentagem(){return this.produtoForm.get('lucro')?.value}
}
