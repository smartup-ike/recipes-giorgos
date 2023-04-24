import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryComponent } from './category/category.component';
import { ItemComponent } from './item/item.component';
import { ItemDetailComponent } from './item-detail/item-detail.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { environment } from 'src/environments/environment.development';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { CommentsComponent } from './comments/comments.component';
import { CommentComponent } from './comment/comment.component';
import { PostCommentComponent } from './post-comment/post-comment.component';
import { USE_EMULATOR as USE_FUNCTIONS_EMULATORS } from '@angular/fire/compat/functions';
import { USE_EMULATOR as USE_DATABASE_EMULATORS } from '@angular/fire/compat/database';

@NgModule({
  declarations: [
    AppComponent,
    CategoriesComponent,
    CategoryComponent,
    ItemComponent,
    ItemDetailComponent,
    HomeComponent,
    LoginComponent,
    CommentsComponent,
    CommentComponent,
    PostCommentComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    ReactiveFormsModule,
  ],
  providers: [
    { provide: USE_FUNCTIONS_EMULATORS, useValue: ['localhost', 5001] },
    // { provide: USE_DATABASE_EMULATORS, useValue: ['localhost', 9000] },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
