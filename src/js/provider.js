// provider
angular
.module('thatisuday.ng-http-progress')
.provider('$httpProgressOps', function(){
	var defOps = {
		http 	: true,
		background 	: '#b91f1f',
		autoPauseAt : 90,
		pendingReq 	: 0
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