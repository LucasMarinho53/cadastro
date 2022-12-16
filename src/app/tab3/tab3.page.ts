import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from '../model/constants';
import { Endereco } from '../model/endereco.model';
import { Fornecedor } from '../model/fornecedor.model';
import { CorreiosService } from '../services/correios.service';
import { FirebasefornecedorService } from '../services/firebasefornecedor.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  fornecedorForm!: FormGroup;
  @ViewChild('createForm') createForm!: FormGroupDirective;
  statusCadastro!:string;
  fornecedor!:Fornecedor;
  editable:boolean = false;

  constructor(private formBuilder: FormBuilder,
     private router: Router, private route: ActivatedRoute,
     private correiosService: CorreiosService,
     private firebasefornecedorService: FirebasefornecedorService) {}

  ngOnInit(): void{
    this.fornecedorForm = new FormGroup({
      'nome': new FormControl ('',[Validators.required,Validators.minLength(4),Validators.maxLength(100)]),
      'cnpj': new FormControl ('',[Validators.required,Validators.minLength(1),Validators.maxLength(100), Validators.pattern(/^[0-9]+$/)]),
      'contato': new FormControl ('',[Validators.required,Validators.minLength(1),Validators.maxLength(100)]),
      'logradouro': new FormControl ('',[Validators.required,Validators.minLength(1),Validators.maxLength(100)]),
      'numero': new FormControl ('',[Validators.required,Validators.minLength(1),Validators.maxLength(100), Validators.pattern(/^[0-9]+$/)]),
      'bairro': new FormControl ('',[Validators.required,Validators.minLength(1),Validators.maxLength(100)]),
      'cidade': new FormControl ('',[Validators.required,Validators.minLength(1),Validators.maxLength(100)]),
      'cep': new FormControl ('',[Validators.required,Validators.minLength(1),Validators.maxLength(100)]),
      });

    this.route.paramMap.subscribe(params => {
      const fornecedorId = params.get('id')!;

      if(fornecedorId){
        this.firebasefornecedorService.findfornecedor(fornecedorId).subscribe({
          next: (fornecedorDB:Fornecedor) => {
            this.fornecedor = fornecedorDB;
            this.editable = true;
            this.loadForm();
          },
          error: (err) => console.log(err)
        });
      }
    });
  }

  createFornecedor(values: any){
    let newFornecedor:Fornecedor = {...values};
    this.firebasefornecedorService.savefornecedor(newFornecedor);
    this.createForm.reset();
    this.router.navigateByUrl('/tabs/tab4');
  }

  loadForm(){
    this.fornecedorForm.patchValue({
      nome: this.fornecedor.nome,
      cnpj: this.fornecedor.cnpj,
      contato: this.fornecedor.contato,
      logradouro: this.fornecedor.logradouro,
      numero: this.fornecedor.numero,
      bairro: this.fornecedor.bairro,
      cidade: this.fornecedor.cidade,
      cep: this.fornecedor.cep
    });
  }

  loadEndereco() {
    const cep:string = this.fornecedorForm.get('cep')?.value;
    this.correiosService.getEndereco(cep).subscribe({
      next: (result:Endereco) => {
        this.fornecedorForm.patchValue({
          logradouro: result.logradouro,
          bairro: result.bairro,
          cidade: result.localidade,
          cep: result.cep
        });
      },
      error: (err) => {
        console.error(err);
      }
  });
  }

  editFornecedor(values: any){
    const editFornecedor = this.fornecedorForm.getRawValue() as Fornecedor;
    let fornecedor: Fornecedor = { ...values };
    editFornecedor.id = this.fornecedor.id;

    this.firebasefornecedorService.updatefornecedor(editFornecedor);
    this.fornecedorForm.reset();
    this.router.navigateByUrl('/tabs/tab4');
  }
}
