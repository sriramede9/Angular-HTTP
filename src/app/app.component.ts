import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Post } from "./app.model";
import { postsService } from "./posts.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;

  constructor(private http: HttpClient, private postservice: postsService) {}

  ngOnInit() {
    this.isFetching = true;
    this.FetchPosts();
    this.isFetching = false;
    // this.loadedPosts.forEach((y) => console.log(y));
  }

  onCreatePost(postData: Post) {
    this.postservice.postPosts(postData);
  }

  onFetchPosts() {
    // Send Http request
    this.FetchPosts();
  }

  FetchPosts() {
    this.postservice.getPosts().subscribe((data: Array<Post>) => {
      this.isFetching = false;
      this.loadedPosts = data;
    });
  }

  onClearPosts() {
    // Send Http request
    this.postservice.clearData().subscribe(() => {
      this.loadedPosts = [];
    });
  }
}
