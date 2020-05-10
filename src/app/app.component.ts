import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Post } from "./app.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.FetchPosts();
    // this.loadedPosts.forEach((y) => console.log(y));
  }

  onCreatePost(postData: Post) {
    // Send Http request
    // this.http
    //   .post(
    //     'https://ng-complete-guide-c56d3.firebaseio.com/posts.json',
    //     postData
    //   )
    //   .subscribe(responseData => {
    //     console.log(responseData);
    //   });

    this.http
      .post(
        "https://the-beginning-2020-990ec.firebaseio.com/posts.json",
        postData
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });

    //  console.log(postData);
  }

  onFetchPosts() {
    // Send Http request
    this.FetchPosts();
  }

  FetchPosts() {
    this.http
      .get("https://the-beginning-2020-990ec.firebaseio.com/posts.json")
      .pipe(
        map((responseData: { [key: string]: Post }) => {
          const data: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              data.push({ ...responseData[key], id: key });
            }
          }
          return data;
        })
      )
      .subscribe((data: Array<Post>) => {
        this.loadedPosts = data;
      });
  }

  onClearPosts() {
    // Send Http request
  }
}
