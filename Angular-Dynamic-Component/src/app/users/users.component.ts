import { Component, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { UserService } from '../Services/user.service';
import { User } from '../Models/User';
import { CommonModule } from '@angular/common';
import { ConfirmDeleteComponent } from "./confirm-delete/confirm-delete.component";
import { viewContainer } from '../viewContainer.directive';

@Component({
  selector: 'app-users',
  imports: [CommonModule, viewContainer],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  constructor(private userService: UserService, private componentFectoryResolver: ComponentFactoryResolver) {

  }

  users: User[] = [];
  userToDelete!: User;
  showUserDeleteConf: boolean = false;

  onConfirmObs: any;

  @ViewChild(viewContainer) container!: viewContainer;

  OnDeleteClicked(user: User) {
    // this.showUserDeleteConf = true;
    this.userToDelete = user
    this.showConfirmDelete(this.userToDelete)
  }

  onUserDeletionConf(value: boolean) {
    this.showUserDeleteConf = false
    if (value) {
      // Delete the user
      let index = this.userService.users.indexOf(this.userToDelete);
      this.userService.users.splice(index, 1);
    }
  }

  ngOnInit() {
    this.users = this.userService.users;
  }


  // dynamic components by programming
  showConfirmDelete(user: User) {

    //1: Create a instance of confirm delete component
    const confirmDeleteComponent = this.componentFectoryResolver.resolveComponentFactory(ConfirmDeleteComponent);
    const containerViewRef = this.container.viewContainer;
    containerViewRef.clear();

    //Rendering  the component in DOM
    const componentRef = containerViewRef.createComponent(confirmDeleteComponent)
    componentRef.instance.userToDelete = user


    this.onConfirmObs = componentRef.instance.onConfirmation.subscribe((data) => {
      this.onConfirmObs.unsubscribe();
      containerViewRef.clear();

      // user delete
      if (data) {
        const index = this.userService.users.indexOf(this.userToDelete);
        this.userService.users.splice(index, 1);
      }
    })

  }
}
