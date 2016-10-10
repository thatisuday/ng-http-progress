// directive
angular
.module('thatisuday.ng-http-progress')
.directive('ngHttpProgress', ['$rootScope', '$interval', '$timeout', '$http', '$httpProgressOps', function($rootScope, $interval, $timeout, $http, $httpProgressOps){
	return {
		restrict : 'E',
		scope : {},
		template : '<div id="progress" style="width: {{ width + \'%\'}}; background : {{background}}" ng-show="visible">'+
						'<dt style="box-shadow: {{background}} 1px 0 6px 1px;"></dt>'+
						'<dd style="box-shadow: {{background}} 1px 0 6px 1px;"></dd>'+
					'</div>',
		replace : true,
		link : function(scope, elem, attr){
			var
				http 			= 	$httpProgressOps.http,
				background 		= 	$httpProgressOps.background,
				startAt 		=	 $httpProgressOps.startAt,
				autoPauseAt 	= 	$httpProgressOps.autoPauseAt,
				duration 		= 	$httpProgressOps.duration,
				increment 		= 	$httpProgressOps.increment,

				interval 		= 	null,
				movedToStart 	= 	false
			;

			// startAt < autoPauseAt
			if(startAt >= autoPauseAt){
				throw new Error('Angular $http Progress : startAt value must be less than autoPauseAt value');
			};

			/******************************************************************************/
			
			scope.visible = false;
			scope.width = 0;
			scope.background = background;

			/******************************************************************************/
			
			// start progress bar
			$rootScope.$on('$httpProgressStart', function(){
				if(!scope.visible) 	scope.visible = true;
				if(interval) 		$interval.cancel(interval);

				$timeout(function(){
					// move to start at position
					if(movedToStart == false){
						movedToStart = true;
						scope.width = startAt;
					}

					// start progress interval
					interval = $interval(function(){
						// auto pause (default 90)
						if(scope.width >= autoPauseAt){
							$rootScope.$emit('$httpProgressPause');
						}
						else{
							// increment by increment (5%) every duration (1000ms)
							scope.width = scope.width + increment;
						}
					}, duration);
				});
			});

			// pause progress bar
			$rootScope.$on('$httpProgressPause', function(){
				$interval.cancel(interval);
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
				movedToStart = false;
				$rootScope.$emit('$httpProgressStart');
			});

			// stop progress bar
			$rootScope.$on('$httpProgressStop', function(){
				$interval.cancel(interval);

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
							movedToStart = false;
						}, 500);
					}, 300);
				});
			});

			/******************************************************************************/

			// watch for changes in $http requests
			scope.$watch(function(){
				return $http.pendingRequests.length > 0;
			}, function(hasPending){
				if(http){
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