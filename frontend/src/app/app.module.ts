import { NgModule } from "@angular/core";
import { StoreModule } from "@ngrx/store";
import { userReducer } from "./store/reducers/user.reducer";
import { applicationReducer } from "./store/reducers/application.reducer";
import { ToastrModule } from "ngx-toastr";

@NgModule({
  imports: [
    ToastrModule.forRoot()
  ]
})
export class AppModule { }

// StoreModule.forRoot({
//   user: userReducer,
//   application: applicationReducer
// }),
