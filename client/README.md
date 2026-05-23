# StudentApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.2.9.

## Task 5

1. **Difference between SPA and MPA.**
   _SPA: Single Page Application.Only one HTML page loads, and any change to the page occurs without the page being reloaded._

   _MPA: Multi Page Application.Each route you take makes a request to the server and retrieves a completely new HTML page._

   ***

2. **Explain MVC vs MVVM in the context of Angular.**
   _MVC: Model-View-Controller.The traditional pattern that was done first._
   _Model → Data_
   _View → What the user sees (UI)_
   _Controller → What controls what happens (Logic)_

   _MVVM: Model-View-ViewModel.That's what Angular uses._
   _Model → Data (Data/Services)_
   _View → HTML Template_
   _ViewModel → Component Class (.ts file)_

   ***

3. **Explain the purpose of .ts, .html, .css, .spec.ts in a component.**
   _When you generate a component you get 4 files:_
   _.ts: Contains the logic of the component — variables, functions, data_
   _.html: The template — what the user sees in the browser_
   _.css: The styles of the component — colors, layout, fonts._
   _.spec.ts: Used for unit testing the component_

   ***

4. **Explain interpolation.**
   _displaying data from a .ts file inside a .html file using {{ }}_
