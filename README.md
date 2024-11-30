# Wander

## Summary

Frontend Repo/User Interface for wanderer user domain specific functions and services.


## Running the App

### Dev

```
 ./docker_compose_dev.sh
```

### Production

```
 ./docker_compose_prod.sh
```

## Running tests

```
 ./run_tests.sh 
```

### To run a single unit test suite

Note you may need to use absolute paths but jest is pretty good in handling relative paths

```
 ./run_tests.sh  <path to test suite file>   
```

## App configs

Configuration values are handled in the .env files

There is a inheritence/heirarchy type logic to these files 

TODO: document exmaple

## Some useful Next Js reminders:

### Routes and paths

To add routes to the app follow add directories in the app and use file paths do define new pages and routing. 

The final file in the path should then be a page.tsx file however the component can be called anything you want.

### Query parameters

use [id] in the path for query parameters

### Components and types

Components and types for code locality sake can be defined in the final directory as components/types directories this should help mentally keeping track of page    related components and interfaces/types.

please delete any unrelated code and likely unused code, please keep comments to a minimal and program in a functional declarative manner. 
 

Notes:
Thank you for reading :)
