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
    instance: 'path',
    name: options.name || 'raphael',
    label: options.label || 'US Map',
    instanceLabel: options.instanceLabel || 'State',
    icon: options.icon || 'location-arrow',
    mapType: options.mapType || 'us',
    menuName: 'aposRaphaelMenu',
    perPage: 1000,
  });

  options.addFields = [].concat(options.addFields || []);

  options.modules = (options.modules || []).concat([ { dir: __dirname, name: 'raphael' } ]);

  snippets.Snippets.call(this, options, null);

  // Pass some of our options to the front-end js.
  // These will be exposed in apos.data.raphaelMapOptions
  self._apos.pushGlobalData({
    raphaelMapOptions: {
      svg: require('./maps/'+options.mapType)
    }
  });
 
  self.pushAsset('script', 'raphael.min', { when: 'always' });

  if (callback) {
    return process.nextTick(function() {
      return callback(null);
    });
  }
};

