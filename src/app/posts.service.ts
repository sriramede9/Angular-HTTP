import { HttpClient, HttpParams, HttpHeaders } from "@angular/common/http";
import { Post } from "./app.model";
import { map, catchError, tap } from "rxjs/operators";
import { Subject, throwError } from "rxjs";

export class postsService {
  private tempLoadingData: Post[];
  postErrorSubject = new Subject<string>();

  constructor(private http: HttpClient) {}

  postPosts(postData: Post) {
    this.http
      .post(
        "https://the-beginning-2020-990ec.firebaseio.com/posts.json",
        postData,
        {
          observe: "response",
          responseType: "text",
        }
      )
      .subscribe(
        (responseData) => {
          console.log(responseData);
        },
        (error) => {
          this.postErrorSubject.next(error.message);
        }
      );
  }

  getPosts() {
    return this.http
      .get("https://the-beginning-2020-990ec.firebaseio.com/posts.json", {
        headers: new HttpHeaders({ customHeader: "helloHeader" }),
        params: new HttpParams().set("print", "pretty"),
        responseType: "json",
      })
      .pipe(
        map((responseData: { [key: string]: Post }) => {
          const data: Post[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              data.push({ ...responseData[key], id: key });
            }
          }
          return data;
        }),
        catchError((error) => {
          //analtics logic
          return throwError(error);
        })
      );
  }

  clearData() {
    return this.http
      .delete("https://the-beginning-2020-990ec.firebaseio.com/posts.json", {
        observe: "events",
      })
      .pipe(
        tap((events) => {
          // console.log(events);
        })
      );
  }
}
