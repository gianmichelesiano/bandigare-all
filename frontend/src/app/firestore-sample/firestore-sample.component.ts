import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

interface Todo {
  id?: string;
  description: string;
  completed: boolean;
}

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

@Component({
  selector: 'app-firestore-sample',
  templateUrl: './firestore-sample.component.html',
  styleUrls: ['./firestore-sample.component.css']
})
export class FirestoreSampleComponent implements OnInit {
  model : Todo = {id:'', description:'c', completed:false};
  public myForm: FormGroup; // our model driven form
  todoCollectionRef: AngularFirestoreCollection<Todo>;
  public submitted: boolean; // keep track on whether form is submitted
  todo$: Observable<Todo[]>;

   descriptionControl = new FormControl('', [
    Validators.required,
    Validators.pattern(EMAIL_REGEX)]);


  constructor(private afs: AngularFirestore) {
    this.todoCollectionRef = this.afs.collection<Todo>('todos');
    this.todo$ = this.todoCollectionRef.snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data() as Todo;
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  addTodo(todoDesc: string) {
	  if (todoDesc && todoDesc.trim().length) {
	    this.todoCollectionRef.add({ description: todoDesc, completed: false });
	  }

  }

  updateTodo(todo: Todo) {
	  this.todoCollectionRef.doc(todo.id).update({ completed: !todo.completed });
  }

  modificaTodo(todo: Todo) {
  	  this.model = todo
  	  console.log(this.model)
	  return this.model
  }

  deleteTodo(todo: Todo) {
	  this.todoCollectionRef.doc(todo.id).delete();
  }

  

  ngOnInit() {
  }

}
