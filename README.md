# Kiss4WebClient 1.0.0 AngualarV6
This project upgraded to angularV6, 
- Angular CLI: 6.1.5
- Node: 8.10.0
- OS: win32 x64
- Angular: 6.1.6

| Package                          | Version				 |
| ---------------------------------|-------------------------|
| @angular-devkit/architect        | 0.7.5   				 |
| @angular-devkit/build-angular    | 0.7.5   				 |
| @angular-devkit/build-optimizer  | 0.7.5   				 |
| @angular-devkit/build-webpack    | 0.7.5   				 |
| @angular-devkit/core             | 0.7.5   				 |
| @angular-devkit/schematics       | 0.7.5   				 |
| @angular/cli                     | 6.1.5   				 |
| @ngtools/webpack                 | 6.1.5   				 |
| @schematics/angular              | 0.7.5   				 |
| @schematics/update               | 0.7.5   				 |
| rxjs                             | 6.3.1   				 |
| typescript                       | 2.9.2   				 |
| webpack                          | 4.9.2   				 |

## Step 0 - CLEAR CACHE Nodemodules for PROJECT EXIST
- Remove/Move all node_modules folder.
- Delete package-lock.json file.

## Step 1 - Scripts init environments Developer
```
	npm -g uninstall @angular/cli@1.7.4
	npm cache verify
	npm -g install @angular/cli@latest
	npm install
```

## Step 2 - Development server
```
	npm run kiss:dev
```
## Step 3 - Code scaffolding
```
	ng g f featurename [--options]
```

## Step 4 - Build
```
	npm run kiss:build
```
