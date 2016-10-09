// run
angular
.module('thatisuday.angular-http-progress')
.run(['$document', function($document){
	if($document.find('#progress').length == 0){
		$document.find('body').append('<angular-http-progress></angular-http-progress>');
	}
}])
;