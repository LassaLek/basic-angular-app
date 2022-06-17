# BasicAngularApp description
## Example app
Example app is only for basic overview - accessible only on https://lassalek.github.io/basic-angular-app/

Test user: 
"email": "eve.holt@reqres.in",
"password": "cityslicka"

## Information
Angular version 14.0.2.
Additionally - Angular Material, lodash

## Debts:
- tests were completely omitted in this example
- further compotentarization (tiles, tile list, toolbar) was not done since the future component structure could not be sufficiently estimated.
- Color are not done via variables

## Requirements
The application will consist of the following parts:
1. Login page + possibility to logout
2. Users List page
3. User Details page
4. Not found page

External API
The application will communicate with the external API, Reqres.in. Documentation for the
API can be found here: https://reqres.in/. 
Routes used:
- Authentication: https://reqres.in/api/login
- Users List: https://reqres.in/api/users?page=1&per_page=5
- Single user details: https://reqres.in/api/users/2

## Login Page
- [x] Email field + password field + Submit/Login button
- [x] Both fields are required.
- [x] Email format validation can be done with HTML5 features.
- [x] Display some error message in case of invalid credentials.
- [x] After the success authentication redirect the user to the users list page.

## Logout
- [x] The user should be able to logout from the application from any page of the
  application.
- [x] There is no need to call any API for the logout, just clean up your storage and
  redirect to the login page.

## Users List
- [x] Display users list as a list of tiles. Each tile should display: avatar, first name, last
  name, email.
- [] The view of the tile should be responsive (optimized for the desktop/tablet/mobile
  view).
- [x] User’s name should be a link to the details page.
- [x] Implement a continuous scroll strategy for the users list pagination.

## User Details
- [x] Use user id in the page URL, e.g <AppRoot>/users/<userId>.
- [x] Redirect the user to the 404 page if the user does not exist.

## Other
- [x] Send authentication token (the token received after the succeeded authentication) in the header of each HTTP request with a key x-access-token.
- [x] Ignore the response support field at the DTO layer of your application.
- [x] Use delay=3 request parameter to simulate delayed response from the server.

# Run 
## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
