# Wander

## Summary

Frontend Repo/User Interface for wanderer user domain specific functions and services.


## Building & running the App in docker container locally

### Dev

```
 ./run_dev.sh
```

### Production

```
 ./run_prod.sh
```

## Running tests

```
 ./run_tests.sh 
```

### To run a single unit test suite

Note: you may need to use absolute paths but jest is pretty good in handling relative paths

```
 ./run_tests.sh  <path to test suite file>   
```

## App configs

Configuration values are handled for now in the .env files

There is a inheritence/heirarchy type logic to these files but need to google the .env file names again.
Can make one for local, qa and prod

TODO: document exmaple

## Some useful Next Js reminders:

### Routes and paths

To add routes to the app, add directories in the app and use file paths do define new pages and routing. 

The final file in the path should then be a page.tsx file however the page component can be called anything you want.

### Query parameters

use [id] in the path for query parameters

### Components and types

Components and types for helping with various aspects of the app code are defined outside of the app. This is to help keep the app page routes files and directories cleaner. 

Components are store e.g. 

```
./src/components
```

Interfaces for various aspecs such as json requests and responses can be found in Types:
```
./src/types
```


---

Please delete any unrelated code and likely to be unused code, please keep comments to a minimal and program in ideally a functional declarative manner. 
 

Notes:
Thank you for reading :)

---

# Kurtis 

Basically the idea is to build a desk/office booking app. Kinda like a air bnb but for desks. More of an exercise to see how far I get and break away from boring gov code and projects. Wanting to learn more about architecture, design, testing, making tooling choices and solo dev choices etc. Also can eventually maybe look into other things such as event driven architecture using kafka/message queues and websockets. 
At one point did have a streaming websockets feature in place for desk availabiliy and changing state for a given desk but moved it to another github repo/microservice, and will likely scrap it or change it entirely. 

The stack is fairly functional (FP):

- Postgresql
- Typescript
- Scala Backend - general style is known as tagless-final which is a coding pattern, generally it involves an interface, implementation of interface and then you can instantiate if you want. Generally follow the pattern:
    - Trait aka algebra
    - Class - Impl (Implementation of the abstract trait)
    - Object to then use as a singleton concrete version.
    - I can then create alternatives of the Trait/Algebra for testing. So we trade off for more boiler plate code but we do not use a mocking framework/library like "Mockito" or "Scalamock" and can swap the "effect type".  

- Scala Backend - for features like CRUD operations to create data in sql
- Scala Backend - websockets servers/kafka pub sub messaging systems - have a few fairly basic examples. Like a publisher, and test consumer to allow sending messages between systems via kafka. But all it does is send a message
- Scala Backend is a Typelevel stack aka: Http4s (webserver + endpoints), Doobie (connecting to Postgresql), Circes (json handling, for generic derivation etc.)
- Testing at the moment is Weaver Tests again Scala Typelevel ecosystem alternatives are ScalaTests and Munit, ScalaTests is kind old and is slow as all heck.
- Unit and Integration tests, e.g. CRUD operations creating real sql data in a test db and hitting endpoints by spinning up test server and closing down after.
- Logging is handled using Log4Cats which I think mainly acts as a wrapper for Slf4jLogger not sure tho.
- For configuration files we use PureConfig. Basically can read in your configuration files as Scala code and add typing so helps reduce bugs in config. Trying to move host and ports, or feature switches and values that can be configured for different environments into configuration files but it's mostly work in progress.

- NextJs for my react frontend. 
- Tailwind CSS - basically for inline css and a consistent/easy way of handling styling. 
- Form validation uses a library called Zod 


Not sure you are able to run the app but the app should be runnerable via docker containers, all the microservices I have on hand frontend and backend are buildable and runnable via containers and put on a shared docker network etc. 

Due to storage of jwts for auth it is based on the base domain, need to look into reverse proxy or somehow proxying all base domain localhosts and ports to look like a single base domain for the app. As it stands auth only works in another microservice called Reggie.

Missing a lot of unit tests, integration tests, just can't be bothered atm. And code changes are often significant rewrites etc. 
Usually able to re-read and not break stuff during rewrites/refactors. Which is a benefit of solo writing code and a selling point of FP. 

Also have some code lying around elsewhere for github actions to build a small scale devops pipeline. 
e.g.
 - Pull request(PR) checker running unit and integration tests.
 - Run more end2end tests on PR merge etc. 
 - eventually deployment maybe if I ever successfully get it setup on AWS. 


 Learnt a bunch of stuff so far

  1. Tooling, libs and frameworks mentions etc. both front and back.
  2. Docker, docker-compose, containers, various comands and networks
  3. Certain design choices and lib choices, also sql related issues and features e.g. storing json in postgres, flyway, containers, ports, networking, schemas etc. 
  4. Exploring limits of chatgpt
  5. Styling and design aspects e.g., thinking about page design and user experience. How design changes and modularity helps ease development, code cleanliness and UX.
  6. Modularisation via creating more repos and breaking up codebases. The advantages and disadvantages, boilerplate code duplication, network issues, communication    etc. 
  7. probs a ton other stuff but yeah can't remember or doesn't come to mind at time of writing but yeah a bucnh of stuff.

Let me know if there are any questions :) 

Try this url for viewing some features and content, some is mocked 
```
http://localhost:3000/business/home 
```