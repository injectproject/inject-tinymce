window.TinyMceInjectPlugin = function ($, options, callback) {

	if (!window.inject) {
		throw new Error("No Inject object defined");
	}

	options = options || {};
	options.wrapper = options.wrapper || "[data-inject]";

	if (!$('div' + options.wrapper).length) {
		throw new Error("No Inject div found");
	}

	tinymce.PluginManager.add('inject', function(editor, url) {

		$("body").wrapInner("<div id='inject-body-wrapper'></div>");
		$("body").append($('div' + options.wrapper).detach());

		// Add a button that opens a window
		editor.addButton('inject', {
			text: 'INJECT',
			icon: false,
			onclick: function() {
				$('div' + options.wrapper).toggleClass("inject-active");
				$('#inject-body-wrapper').toggleClass("inject-active");

				options.openCallback && options.openCallback($('div' + options.wrapper).hasClass("inject-active"));
			}
		});
	});

	return callback && callback()
}
