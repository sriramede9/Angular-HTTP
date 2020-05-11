# NgCompleteGuideUpdate

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.3.5.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Get Request

`this.http .get("https://the-beginning-2020-990ec.firebaseio.com/posts.json") .pipe( map((responseData: { [key: string]: Post }) => { const data: Post[] = []; for (const key in responseData) { if (responseData.hasOwnProperty(key)) { data.push({ ...responseData[key], id: key }); } } return data; }) ) .subscribe((data: Array<Post>) => { this.loadedPosts = data; });`

## Post Request

`this.http .post( "https://the-beginning-2020-990ec.firebaseio.com/posts.json", postData ) .subscribe((responseData) => { console.log(responseData); });`

## Interceptors

`export class AuthInterceptorService implements HttpInterceptor { intercept(req: HttpRequest<any>, next: HttpHandler) { console.log("Should pass from this !!"); return next.handle(req); } }`

# Append headers to incomming request

`export class AuthInterceptorService implements HttpInterceptor {
intercept(req: HttpRequest<any>, next: HttpHandler) {
console.log("Should pass from this !!");

    const modifiedRequest=req.clone({headers:req.headers.append('Auth':'xyz')});

    return next.handle(modifiedRequest);

}
}
`
