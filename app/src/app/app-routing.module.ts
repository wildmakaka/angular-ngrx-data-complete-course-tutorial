import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from 'src/app/home/home.component';
import { AddPostComponent } from 'src/app/posts/add-post/add-post.component';
import { EditPostComponent } from 'src/app/posts/edit-post/edit-post.component';
import { PostsListComponent } from 'src/app/posts/posts-list/posts-list.component';
import { PostsResolver } from 'src/app/posts/posts.resolver';
import { SinglePostComponent } from 'src/app/posts/single-post/single-post.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'posts',
    component: PostsListComponent,
    resolve: { posts: PostsResolver },
  },
  { path: 'posts/add', component: AddPostComponent },
  { path: 'posts/edit/:id', component: EditPostComponent },
  { path: 'posts/details/:id', component: SinglePostComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
