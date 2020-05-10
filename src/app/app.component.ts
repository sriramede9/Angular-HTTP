import { Component, OnInit, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Post } from "./app.model";
import { postsService } from "./posts.service";
import { Subscription } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit, OnDestroy {
  loadedPosts: Post[] = [];
  isFetching = false;
  hasError = false;
  error = null;
  private errorSubscription: Subscription;

  constructor(private http: HttpClient, private postservice: postsService) {}

  ngOnInit() {
    this.isFetching = true;
    this.FetchPosts();
    this.isFetching = false;
    // this.loadedPosts.forEach((y) => console.log(y));
  }

  onCreatePost(postData: Post) {
    this.postservice.postPosts(postData);
    this.errorSubscription = this.postservice.postErrorSubject.subscribe(
      (error) => {
        this.error = error;
      }
    );
  }

  onFetchPosts() {
    // Send Http request
    this.FetchPosts();
  }

  FetchPosts() {
    this.postservice.getPosts().subscribe(
      (data: Array<Post>) => {
        this.isFetching = false;
        this.loadedPosts = data;
      },
      (error) => {
        this.error = error.message;
      }
    );
  }

  onClearPosts() {
    // Send Http request
    this.postservice.clearData().subscribe(() => {
      this.loadedPosts = [];
    });
  }

  onErrorclicked() {
    this.error = null;
  }

  ngOnDestroy() {
    this.errorSubscription.unsubscribe();
  }
}
