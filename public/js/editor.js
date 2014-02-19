function AposRaphael(optionsArg) {
  console.log('extendin')
  var self = this;
  var options = {
    instance: 'path',
    name: 'raphael'
  };

  $.extend(options, optionsArg);
  AposSnippets.call(self, options);

  self.afterPopulatingEditor = function($el, snippet, callback) {
    var options = $el.find('[name="title"] option');
    options.each(function(){
      if(apos.data.usedRegions.indexOf($(this).attr('value')) > -1) {
        $(this).remove();
      }
    });

    return callback();
  };
}
