import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from "@angular/common/http";

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log("Should pass from this !!");

    const modifiedRequest = req.clone({
      headers: req.headers.append("Auth", "xyz"),
    });

    return next.handle(modifiedRequest);
  }
}
