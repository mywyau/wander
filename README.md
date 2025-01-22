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