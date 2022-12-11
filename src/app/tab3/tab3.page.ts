import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Constants } from '../model/constants';
import { Fornecedor } from '../model/fornecedor.model';
import { FornecedorService } from '../services/fornecedor.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  fornecedorForm!: FormGroup;
  statusCadastro!:string;
  fornecedor!:Fornecedor;
  editable:boolean = false;

  constructor(private formBuilder: FormBuilder, private fornecedorService: FornecedorService, private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void{
    this.fornecedorForm = this.formBuilder.group({
      nome: ['',[Validators.required,Validators.minLength(4),Validators.maxLength(100)]],
      cnpj: ['',[Validators.required,Validators.minLength(1),Validators.maxLength(100), Validators.pattern(/^[0-9]+$/)]],
      contato: ['',[Validators.required,Validators.minLength(1),Validators.maxLength(100)]],
      logradouro: ['',[Validators.required,Validators.minLength(1),Validators.maxLength(100)]],
      numero: ['',[Validators.required,Validators.minLength(1),Validators.maxLength(100), Validators.pattern(/^[0-9]+$/)]],
      bairro: ['',[Validators.required,Validators.minLength(1),Validators.maxLength(100)]],
      cidade: ['',[Validators.required,Validators.minLength(1),Validators.maxLength(100)]],
      cep: ['',[Validators.required,Validators.minLength(1),Validators.maxLength(100), Validators.pattern(/^[0-9]+$/)]],
    });

    this.route.paramMap.subscribe(params => {
      const fornecedorId = +params.get('id')!;

      if(fornecedorId){
        this.fornecedorService.getFornecedor(fornecedorId).subscribe({
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

  addFornecedor(){
    const newFornecedor = this.fornecedorForm.getRawValue() as Fornecedor;

    this.fornecedorService.insertFornecedor(newFornecedor)
        .subscribe({
          next: (result:any) => {
            this.fornecedorForm.reset();
            this.router.navigateByUrl('/tabs/tab4');
          },
          error: (error:any) => { console.log(error)}
        });
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

  editFornecedor(){
    const editFornecedor = this.fornecedorForm.getRawValue() as Fornecedor;
    editFornecedor.id = this.fornecedor.id;

    this.fornecedorService.updateFornecedor(editFornecedor).subscribe({
      next: () => {
        this.router.navigateByUrl('/tabs/tab4');
        this.fornecedorForm.reset();
      },
      error: (err) => {
        console.error(err);
        this.fornecedorForm.reset();
      }
    });
  }
}
