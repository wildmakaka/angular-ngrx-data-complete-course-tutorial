import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import {
  EntityDataService,
  EntityDefinitionService,
  EntityMetadataMap,
} from '@ngrx/data';
import { Post } from 'src/app/models/post.model';
import { AddPostComponent } from 'src/app/posts/add-post/add-post.component';
import { EditPostComponent } from 'src/app/posts/edit-post/edit-post.component';
import { PostsDataService } from 'src/app/posts/posts-data.service';
import { PostsListComponent } from 'src/app/posts/posts-list/posts-list.component';
import { PostsResolver } from 'src/app/posts/posts.resolver';
import { SinglePostComponent } from 'src/app/posts/single-post/single-post.component';

const routes: Routes = [
  {
    path: '',
    component: PostsListComponent,
    resolve: { posts: PostsResolver },
  },
  { path: 'add', component: AddPostComponent },
  {
    path: 'edit/:id',
    component: EditPostComponent,
    resolve: { posts: PostsResolver },
  },
  {
    path: 'details/:id',
    component: SinglePostComponent,
    resolve: { posts: PostsResolver },
  },
];

const entityMetadata: EntityMetadataMap = {
  Post: {
    entityDispatcherOptions: {
      optimisticUpdate: true,
      optimisticDelete: false,
    },
    sortComparer: sortByName,
  },
};

function sortByName(a: Post, b: Post): number {
  let comp = a.title.localeCompare(b.title);
  if (comp > 0) return -1;
  if (comp < 0) return 1;
  return comp;
}

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes), ReactiveFormsModule],
  declarations: [
    PostsListComponent,
    SinglePostComponent,
    EditPostComponent,
    AddPostComponent,
  ],
  providers: [PostsResolver, PostsDataService],
})
export class PostsModule {
  constructor(
    eds: EntityDefinitionService,
    entityDataService: EntityDataService,
    postsDataService: PostsDataService
  ) {
    eds.registerMetadataMap(entityMetadata);
    entityDataService.registerService('Post', postsDataService);
  }
}
