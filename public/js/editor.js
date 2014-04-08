function AposRaphael(optionsArg) {
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
      if(apos.data.usedRegions && apos.data.usedRegions.indexOf($(this).attr('value')) > -1) {
        if($el.hasClass('apos-edit-region')) {
          $(this).css('color', "#ddd");
        } else {
          $(this).remove();
        }
      }
    });

    return callback();
  };
}