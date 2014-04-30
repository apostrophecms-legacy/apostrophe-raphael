var async = require('async');
var _ = require('underscore');
var extend = require('extend');
var snippets = require('apostrophe-snippets');

module.exports = raphael;

function raphael(options, callback) {
  return new raphael.Raphael(options, callback);
}

raphael.Raphael = function(options, callback) {
  var self = this;

  _.defaults(options, {
    instance: 'region',
    name: options.name || 'raphael',
    label: options.label || 'US Map',
    instanceLabel: options.instanceLabel || 'Region',
    icon: options.icon || 'location-arrow',
    mapType: options.mapType || 'us',
    menuName: 'aposRaphaelMenu',
    perPage: 1000,
  });

  options.apos.mixinModuleAssets(self, 'raphael', __dirname, options);
  self.pushAsset('script', 'raphael.min', { when: 'always' });
  self.pushAsset('template', 'sidebar', { when: 'always' });
  self.pushAsset('template', 'popover', { when: 'always' });
  self.pushAsset('stylesheet', 'content', { when: 'always' });

  self.svgData = require('./maps/'+options.mapType);

  var regionChoices = function(names) {
    var choices = [];
    for(n in names) {
      var name = {};
      name.value = n;
      name.label = names[n];
      choices.push(name);
    }

    return choices;
  }
  
  options.addFields = [
    {
      name: 'title',
      type: 'select',
      label: 'Region',
      choices: regionChoices(self.svgData.names)
    },
    {
      name: 'body',
      type: 'area',
      label: 'Body',
      options: {
        textOnly: true
      }
    }
  ].concat(options.addFields || []);

  self.addedFields = [];
  for(var n in options.addFields) {
    self.addedFields.push(options.addFields[n].name);
  }


  options.removeFields = ['tags', 'thumbnail', 'hideTitle'].concat(options.removeFields || []);
  options.modules = (options.modules || []).concat([ { dir: __dirname, name: 'raphael' } ]);
  snippets.Snippets.call(this, options, null);  

  self._apos.addLocal('aposPruneRaphaelData', function(data) {
    var regions = _.map(data, function(region) {

      var allowedKeys = ['slug','region','url'].concat(self.addedFields)
      region = _.pick(region, allowedKeys);
      if(region.body && region.body.items[0]) {
        region.content = region.body.items[0].content;
      }

      return region;
    });

    var regionsObj = {};
    for(r in regions) {
      regionsObj[regions[r].title] = regions[r];
      regionsObj[regions[r].title].title = self.svgData.names[regions[r].title]
    }

    return regionsObj;
  });

  self.beforeIndex = function(req, snippets, callback) {
    // Pass some of our options to the front-end js.
    options.apos.pages.distinct('title', { type: 'region', trash: { $ne: true } }, function(err, used){
      req.extras.usedRegions = used;
      req.extras.raphaelSvg = self.svgData;
      req.extras.raphaelStyles = options.styles || {};
      return callback(null);
    });
  };
 
  if(callback) {
    return process.nextTick(function() {
      return callback(null);
    });
  }
};

