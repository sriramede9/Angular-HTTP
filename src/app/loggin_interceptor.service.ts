import { tap } from "rxjs/operators";

import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEventType,
} from "@angular/common/http";

export class logginInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log(req.url);
    console.log(req.headers);
    return next.handle(req).pipe(
      tap((events) => {
        // console.log(events);

        if (events.type === HttpEventType.Response) {
          console.log("Response arrived, body data :");
          console.log(events.body);
        }
      })
    );
  }
}
