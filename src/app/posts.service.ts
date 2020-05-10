import { HttpClient } from "@angular/common/http";
import { Post } from "./app.model";
import { map } from "rxjs/operators";

export class postsService {
  private tempLoadingData: Post[];

  constructor(private http: HttpClient) {}

  postPosts(postData: Post) {
    this.http
      .post(
        "https://the-beginning-2020-990ec.firebaseio.com/posts.json",
        postData
      )
      .subscribe((responseData) => {
        console.log(responseData);
      });
  }

  getPosts() {
    return this.http
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
      );
  }

  clearData() {
    return this.http.delete(
      "https://the-beginning-2020-990ec.firebaseio.com/posts.json"
    );
  }
}
