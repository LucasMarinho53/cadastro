import { Injectable } from '@angular/core';
import { collection,collectionData,deleteDoc,doc,docSnapshots,Firestore,setDoc } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { Produto } from '../model/produto.model';

@Injectable({
  providedIn: 'root'
})
export class FirebaseprodutoService {

  constructor(private firestore: Firestore) { }

  save(produto: Produto): Promise<void>{
    const document = doc(collection(this.firestore, 'produtos'));
    return setDoc(document, produto);
  }

  list(): Observable<Produto[]> {
    const produtosCollection = collection(this.firestore, 'produtos');
    return collectionData(produtosCollection, {idField: 'id'})
    .pipe(
      map(result => result as Produto[])
    );
  }

  find(id: string): Observable<Produto> {
    const document = doc(this.firestore, `produtos/${id}`);
    return docSnapshots(document)
    .pipe(
      map(doc => {
        const id = doc.id;
        const data = doc.data();
        return { id, ...data } as Produto;
      })
    );
  }

  update(produto: Produto): Promise<void>{
    const document = doc(this.firestore, 'produtos', produto?.id);
    const { id, ...data } = produto;
    return setDoc(document, data);
  }

  delete(id: string): Promise<void>{
    const document = doc(this.firestore, 'produtos', id);
    return deleteDoc(document);
  }
}
