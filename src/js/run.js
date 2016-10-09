// run
angular
.module('thatisuday.ng-http-progress')
.run(['$document', function($document){
	if($document.find('#progress').length == 0){
		$document.find('body').append('<ng-http-progress></ng-http-progress>');
	}
}])
;