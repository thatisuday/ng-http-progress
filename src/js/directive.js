// directive
angular
.module('thatisuday.angular-http-progress')
.directive('angularHttpProgress', ['$rootScope', '$interval', '$timeout', '$http', '$httpProgressOps', function($rootScope, $interval, $timeout, $http, $httpProgressOps){
	return {
		restrict : 'E',
		scope : {},
		template : '<div id="progress" style="width: {{ width + \'%\'}}; background : {{background}}" ng-show="visible">'+
						'<dt style="box-shadow: {{background}} 1px 0 6px 1px;"></dt>'+
						'<dd style="box-shadow: {{background}} 1px 0 6px 1px;"></dd>'+
					'</div>',
		replace : true,
		link : function(scope, elem, attr){
			scope.http = $httpProgressOps.http;
			scope.background = $httpProgressOps.background;
			scope.autoPauseAt = $httpProgressOps.autoPauseAt;

			/******************************************************************************/
			
			scope.visible = false;
			scope.width = 0;
			scope.interval = null;

			/******************************************************************************/
			
			// start progress bar
			$rootScope.$on('$httpProgressStart', function(){
				if(!scope.visible) 		scope.visible = true;
				if(scope.interval) 		$interval.cancel(scope.interval);

				// start progress interval
				scope.interval = $interval(function(){
					// auto pause (default 90)
					if(scope.width >= scope.autoPauseAt){
						$rootScope.$emit('$httpProgressPause');
					}
					else{
						// increment by 5% every second
						scope.width = scope.width + 5;
					}
				}, 1000);
			});

			// pause progress bar
			$rootScope.$on('$httpProgressPause', function(){
				$interval.cancel(scope.interval);
				elem.addClass('waiting');
			});

			// resume progress bar
			$rootScope.$on('$httpProgressResume', function(){
				elem.removeClass('waiting');
				$rootScope.$emit('$httpProgressStart');
			});

			// restart progress bar
			$rootScope.$on('$httpProgressRestart', function(){
				elem.removeClass('done waiting');
				scope.width = 0;
				$rootScope.$emit('$httpProgressStart');
			});

			// stop progress bar
			$rootScope.$on('$httpProgressStop', function(){
				$interval.cancel(scope.interval);

				$timeout(function(){
					scope.width = 100;

					// fadeout after 300ms
					$timeout(function(){
						elem.addClass('done').removeClass('waiting');

						// hide after 500ms
						$timeout(function(){
							elem.removeClass('done');
							scope.width = 0;
							scope.visible = false;
						}, 500);
					}, 300);
				});
			});

			/******************************************************************************/

			// watch for changes in $http requests
			scope.$watch(function(){
				return $http.pendingRequests.length > 0;
			}, function(hasPending){
				if(scope.http){
					if(hasPending){
						$rootScope.$emit('$httpProgressStart');
					}
					else{
						$rootScope.$emit('$httpProgressStop');
					}
				}
			});
		}
	}
}])
;