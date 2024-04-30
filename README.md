# Danh Le's Portfolio

My personal website, mainly served as a portfolio page to showcase my projects and experiences. Built with technologies that I am most comfortable in, `Angular` frontend and `NodeJS` server, the website effectively communicate my skills, a list of my projects and demonstrate my capabilities. You might visit the project [here](https://portfolio.danh-le.com/home).

## Features
* Introduction about myself, as well as external links to my Github, Linkedin and Email.
* Skills and Technologies that I am proficient in.
* Real-time data monitoring my activities, including Github commits and solved Leetcode challenges.
* List of projects that I have `done`, `in-progress` and `soon to be published`.

## Languages and Technologies
This project was built using:
* __Angular 17__ (migrated from initial Angular 15).
* __NodeJS__ 18.15.0.
* __Typescrips__ for frontend components.
* __Javascript__ for server logics and APIs handling.
* Of course, __HTML5__ and __CSS__.

## Development Process

### Versions

* v1.0 - Launch of the website (Initial deployment)
    * Main Info Page about me, including links of other platforms added.
    * Github and Leetcode real-time monitoring functionality built.
    * List of projects, including its descriptions, detail, date and technologies used.
    * Each main functional feature has its own dedicated routing.
    * Designs inspired following "digital" themes, with animations and colorful designs.

* v1.1 - Current Version
    * Entirely redesigned the components from scratch, following a more simple and minimalistic design.
    * Redesigned the modal to display projects, following blog page style, also added links for preview and technical report of the project.
    * Completely rewritten CSS rules for components, following the "box" approach, this makes maintaining and scaling components easier.
    * Added security for server, including secure design, security testing and apply principle of least privilege.



## Challenges and Solutions

### Project conceptualizing
When the idea first still in the concepts, a beginner like myself has a lot of ideas of what my website should be, should have or should do. I came up with many functionalities that I would love to include in it. However, that is a common problem any inexperience developer would encounter when they first started their projects. 

Having many functionalities for a project may sound impressive and interesting. However, the developer often forget that a good website, or application should only contain relevant information and features. Too many redundant functionalities will make the website appear too confusing, unfocused and do not convey the message well. Additionally, having too many functionalities also make implementation not feasible, especially for a junior developer. 

Looking back after completing the project, I have learnt that when developing an application, one should most focus on the aspect of `Convey the message` well to the viewers or users -in technical term, what components are most crucial that make an application an application - `Core Components`.

When I first brainstorm the idea for a portfolio website, I came up with a list of core components and optional components for the projects:


| Core Components  | Optional Components |
| -------------    |:-------------:      |
| Project.component| Navbar.component    |
| Info.component   | Footer.component    |
| Skills.component | Github.component    |
| Contact.component| Leetcode.component  |

After brainstorming about the ideas and concept of the projects, I have learn that a formular  for a developer when they start a project:

1. Focus on the core components first, when the foundation is established, the developer would have a better idea of how and where the direction of the project is going next. 
2. Add in optional components after, but keep in mind these components should be `relevant` and help the core components effectively communicate the message to the viewers.
3. Implement tests for the components.
4. Design the UIs for the components. 

I followed these steps for most of the duration of finishing this project.

Coincidentally, these steps also align with a famous philosophy in the software development world: 
>Make it work, then make it pretty.

### Migration from Angular 15 to Angular 17
Almost all frontend components in the initial development phrase were built in Angular 15, because this was the version I was most familiar to. However, until the point of developing `project-modal.component`, it required newer version of Angular dependencies, including:
* `@angular/core` - version 17 & up
* `@angular/material` - version 17 & up
* `@angular/cli` - version 17 & up

The new version comes with the `MatDialog` module, which needed to build pop-up modal (new page appear whenever a project is clicked on). Thus, the Angular frameworks needs to be updated to version 17. Consequently, all of the existing components also need to be partly rewritten, adjusting to the changes of the frameworks. 

Updating or changing framework in the middle of development process is not often a good idea. I can cause breaking changes, dependency issues and instability. I entered little learning curve, adjusting to the new changes of the frameworks and rewrite the existing components accordingly. After a quite, I have successfully updated from Angular 15 to Angular 17 for my current projects, as well as adjusting existing components to work with this new version. 

After the experience, I have concluded that changing, or updated frameworks or library in the middle of development process is often undesirable. Developers should ensures the project has everything necessary needed to develop the application during planning phrase. This would lead to an easier, more stable and less delay development process of application.

### RESTful APIs vs GraphQL

Prior to this website, communications between server and frontend of projects I have done in the past involve `RESTful` APIs. RESTful APIs are fixed endpoints of applications or services, used to share resources between their servers to their web applications or other people web applications (in this case, they are offering services through those endpoints). Some of examples for RESTful APIs:

* weather/{_location_}
* users/{_id_}
* posts/{_postID_}

These RESTful APIs have exact endpoints to request specific data from the server. However, when I started developing `Github.component` and `Leetcode.component`, Leetcode and Github do not offer their services to get user data from any RESTful APIs. Instead, they used GraphQL. `GraphQL` is also a way for communications between servers and frontends. However, they do not have fixed endpoints, instead, they receive requests in form of `queries`. For example, the requests sent from the frontend for data as above:


Getting weather of a location:

```
query {
  weather(location: "Calgary") {
    temperature
    humidity
    windSpeed
  }
}
```

Getting data of a user:

```
query {
  user(id: "123") {
    id
    username
    email
  }
}
```

Getting data of a post:

```
query {
  post(postID: "123") {
    id
    title
    content
  }
}
```

In this case, the frontend has to specify what data needed, as send the query to the server. Thus, while the server only have one endpoint, it can handle and return requested data to the frontends. 

This challenge offers me an opportunity to learn a new way when working with APIs. After a lot of time and research, I managed to learn how to write GraphQL queries and found schema documentation of [Github](https://docs.github.com/en/graphql) and [Leetcode](https://github.com/aylei/leetcode-rust/issues/12). I have also successfully retrieved necessary data from their services after __many many attempts__. 

While this project implemented `RESTful` APIs for its endpoints, adapting and knowing how to work with `GraphQL` expanded my horizon. Both methods offers different flexibility for the developer as myself. 


### Cross-origin resource sharing (CORS)
In the process of developing this application, server and frontend are served at different local port: `localhost:3000` for server and `localhost:4200`. This lead to a problem that most of developer would encounter: __Cross-origin resource sharing (CORS)__.

CORS is a default security mechanism in the browser, preventing a website to make a request to another website without the user permission. In this case, due to the frontend and backend being served at two different ports, the browser recognized  them as two seperate domains, which mean it blocked requests of my project frontend to the server. 

To overcome this, one can simply allow the server to allow incoming requests from other domains, letting the browser know that: "It is ok for me to receive requests from other pages":

```
const cors = require('cors');

app.use(cors());
```

However, this should only be allowed during development process. When the application is deployed, one should adjust this security mechanism to only allow requests from trusted origins (frontend or necessary pages), for example:

```
app.use(cors({
  origin: 'http://abc.com'
}));
```

By updating the policy of CORS for the server, it only allow the  server to receive requests from safe and trusted sources, thus enhances the security of the application. 

### Server performance and efficient use of resources
When developing an application, every single function `space and time complexity` should be taken into account by the developers. Paying attention to this aspect is extremely crucial not only because of the positive performance and experience of the application for the user, but also another extremely important aspect: `Production Cost`.

While planning this project, I intented to host this website on a `free-tier` AWS EC2 instance. The hosting package itself, while free, come only with limited resources and storage. This results in making sure I have to design and programs the components effectively:
* The functions of the components cannot be stuck in an infinite loop.
* Every function cannot trigger another function on it own.
* All `req` function cannot send requests on it own.
* Etc...

The above examples illustrate how I planned and made every components of the application. Essentially, I made sure that only the user can trigger and call a function in the application. 

However, another aspects also needed to be taken into account is that:

>> What happens if there are too many viewers at the same time?

During this point of development, the frontend and server basically look like this:

![Before.](https://github.com/d4nh-Le/portfolio/blob/main/frontend/src/assets/Before-portfolio.jpeg?raw=true "Before Cache")

It means that everytime a user visits my website, the server will make new connections to Github and Leetcode servers __everytime__ to retrieve necessary information. This would lead to inefficient use of resources and vulnerable to exceed given resources of the EC2 instance.

Therefore, I implemented a `Cache Mechanism`. Instead of the EC2 server make connections to the external servers everytime a user visits the website, the EC2 server will instead make connections to the external servers __only every X amount of minutes__. After every X minutes have passed, the EC2 server will then make connections to the external servers, retrieving new and up-to-date information and store them into a local storage. If many users visit the website at the same time, the EC2 server will save resources by fetching the locally stored data, instead of fetching it from the external server as illustated below:

![After.](https://github.com/d4nh-Le/portfolio/blob/main/frontend/src/assets/After-portfolio.jpeg?raw=true "After Cache")

By implementing this mechanism,  the EC2 Instance while still able to get up-to-date infomation, it also will save a lot of resources from making redudant requests to the internet, as well as significantly enhance the performance of the application. The frontend will receive the data significantly faster (appro. 40ms) when the data is fetched from the local cache instead of being fetched from the internet (appro. ~500ms).


### Application deployment
After finishing and testing the application on the local enviroment, the developer next step is to make it available to the world. This project, while being relatively small scale, offers me a good opportunity to learn about the deployment process of an application. The deployment process of this application contains many steps:

1. Rendering `dist` build  - the distribution version of the application.
2. EC2 Instance update and configurations.
3. Get the `dist` build to the production enviroment.
4. Create a `linux service file` to start the application in the production enviroment.
5. Create a reverse proxy to transfer incoming requests from `privileged port (80)` to the production port.
6. Implement Domain and HTTPS certificate for the production port. 

After a lot of attempts and researchs, I have successfully hosted the project on the internet.

## Future Plans
Some features I would like to add in the futures:
- [X] Responsive designs for mobile devices.
- [ ] Blog features where I can post my not just my projects, but also stories and what I have learnt.
- [ ] Feeds retrieved from media such as Linkedin.

## Contact
If you would like to contact me (__Danh Le - Junior Software Developer__), please send me an email me at danhle002@gmail.com.


@2024
