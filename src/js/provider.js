// provider
angular
.module('thatisuday.ng-http-progress')
.provider('$httpProgressOps', function(){
	var defOps = {
		http 	: true,
		background 	: '#b91f1f',
		startAt : 0,
		autoPauseAt : 90,
		duration : 1000,
		increment : 5
	};

	return {
		setOps : function(newOps){
			angular.extend(defOps, newOps);
		},
		$get : function(){
			return defOps;
		}
	}
});