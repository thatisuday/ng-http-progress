# Angular $http Progress Bar
YouTube like top attached progress bar to show $http requests in progress (automatic)

![bower](https://img.shields.io/bower/v/ng-http-progress.svg?style=flat-square) [![npm downloads](https://img.shields.io/npm/dt/ng-http-progress.svg?style=flat-square)](https://www.npmjs.com/package/ng-http-progress) [![preview](https://img.shields.io/badge/preview-click here-green.svg?style=flat-square)](https://rawgit.com/thatisuday/angular-http-progress/master/demo/main.html)

***

# How does it work?
When you include `thatisuday.ng-http-progress` module to your app's dependencies, you will automatically get progress bar whenever you send ajax requests through `$http` service.

You can change the background color and other options in `config` block using `$httpProgressOpsProvider` provider of `ng-http-progress` module.

In general, whenever your app send one or more `$http` requests, progress bar will show up and progress will start. At each second, progress bar width will increment by `5%` until it reaches `90%`. At `90%` progress, progress bar will pause and stay like that until all ajax requests finishes. When all ajax requests finishes, progress bar will reach `100%` progress and disappear. If all ajax requests finishes before progress reaches `90%`, it will jump to `100%` and disappear. _You can change pause value of `90%` to any number between 0 - 100 in `config` phase_.

***

## Install

#### bower
```
bower install ng-http-progress
```

#### npm

```
npm install ng-http-progress
```

> include `ng-http-progress.js` and `ng-http-progress.css` from `dist` directory.


***

## Config / Options

```
angular
.module('demo', ['thatisuday.ng-http-progress'])
.config(function($httpProgressOpsProvider){
	$httpProgressOpsProvider.setOps({
		background: '#b91f1f',
		autoPauseAt : 90,
		http : true
	});
})
```

> all above values are default values, you can avoid any options or entire `config` block if you want.

| option | value | role |
| ------ | ----- | ---- |
| background | hex/rgba | background color of progress bar |
| autoPauseAt | 0 - 100 | where progress bar will pause until requests resolve |
| http | true/false | automatic show/hide progress bar for $http requests |

***

# Events 

If you wish to show progress bar other than just `$http` requests, then you can use events to show/hide/pause/resume progress bar. Ex. `$rootScope.$emit('$httpProgressStart');`

| event name | emit from | role |
| ------ | ----- | ---- |
| $httpProgressStart | $rootScope | show/start progress bar |
| $httpProgressPause | $rootScope | pause progress bar |
| $httpProgressResume | $rootScope | resume progress bar |
| $httpProgressRestart | $rootScope | restart progress bar |
| $httpProgressStop | $rootScope | stop/hide progress bar |


***

## Build on your own
You can build this directive with your own customization using gulp.

1. Go to repository's parent directory and install all node dev dependencies using `npm install --dev`.
2. Make sure you have gulp install globally. Else use `npm install -g gulp` to install gulp globally.
3. All css for this repository has been generated using sass (.scss), so you need to spend 5 mins to learn basics of sass.
4. To build or watch the changes, use command `gulp build` or `gulp watch`

***

## Contributions and Bug reports
1. Please create an issue if you need some help or report a bug.
2. Take a pull request to add more features or fix the bugs. Please mention your changes in the PR.
3. Please make sure you recommend good practices if you came/come across any or if something could have been better in this module.

