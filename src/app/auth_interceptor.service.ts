import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
} from "@angular/common/http";

export class AuthInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    console.log("Should pass from this !!");
    return next.handle(req);
  }
}
