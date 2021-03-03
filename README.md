#Feedback & answers

`After having read the API documentation, is there anything that jumps out as a potential issue ?` - Yes. The first thing that might be an issue is that getUser endpoint getting user data by userName instead of userId.
The next thing is a data structure, I would accept a separate request for getting media files if it returns blob or stream, but it returns JSON with URL strings... Why do not add this data in getPosts request?

`Did you encounter any issues during the implementation ? If so, were you able to bypass them?` - Yep. The server was not ready to me =) I got 500 (Internal Server Error), 403 (Forbidden) after I sent some amount of requests. In this case, I made an interval between changing posts, not 6 but 8 seconds it made server life easier, I hope =)

`Looking closely at the response of the API, do you think there is another way to implement the app ? If yes, what other option could exist ? If no, why not ?` - Yes. Another option to implement the app is to collect all post's data in the one API route and get rid of additional requests for media and user data. It would make frontend developer life much easier.

`If you were in direct contact with the API service team, what could you ask them to do to make your life easier or optimise the performances ?` - Yes. See previous point =)

`What was the most difficult part of the implementation for you and why ?` - The part with requests for getting media and user data was the most difficult. Because of pagination and auto-changing posts. If you'll check the code, you'll find that I send media and user data requests by two. I made it to buffer the next post data and when it's the turn to show the next post data for it will be already in my service. Also, server issues blocked me with implementation.

`On a scale of 1 to 10, are you satisfied with the result ? Is there anything that needs more attention ?` - To be honest, it's pretty difficult to rate my satisfaction with the result. I would say it's 8-8.5. I prepared media queries in the media.scss file for all screen's resolutions but didn't implement all of them, just changed the layout on small tablets and less. One more thing that requires testing is the case when all posts finished, I mean that when we got to the last page of posts, the frontend should stop send requests for getting posts and start to show posts from the beginning with data from the buffer array. I implemented this logic, but can't test it because of server issues, usually, the server dropped after the third page of posts.

`How long did it take you to implement this development ? Was it longer or shorter than what you initially expected ?` - If not count the time that I spent searching cool favicon.ico, I spent for this task around 5-6hours. For sure, it's not so fast, but I didn't have design and UI elements like loader, and I had to find\style them. Between there is loader spinner on initial loading))) I don't think that task was longer or shorter than I expected, it was approximately as I thought at the beginning.
#
#

## PapTechTest
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 11.1.4.

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
