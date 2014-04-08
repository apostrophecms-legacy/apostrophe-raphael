var AposRenderRaphaelMap = function(options) {
  var self = this;

  self.map = {};
  self.activeRegion = null;
  self.hoveredRegion = null;
  self.svg = options.svg;
  self.styles = {
    scale: options.styles.scale || 1.1,
    fade: options.styles.fade || false,
    inactive: {
      fill: options.styles.inactiveFill || "#eee",
      stroke: options.styles.stroke || "#fff",
      "stroke-width": options.styles.strokeWidth || 1,
      "stroke-linejoin": "round"
    },
    default: {
      fill: options.styles.defaultFill || "#005E6C"
    },
    hover: {
      fill: options.styles.hoverFill || "#007F8F"
    },
    active: {
      fill: options.styles.activeFill || "#EB1725"
    }
  }

  self.regions = options.regions || {};
  self.el = options.selector || 'apos-raphael-target';

  self.init = function() {
    var R = Raphael(self.el, 935, 590);
    var scale = 0.8;
    var realScale = (1 / scale);

    var scaleX = 935 * realScale;
    var scaleY = 590 * realScale;

    // (1 / 0.25) * 0.25 * 0.25
    // R.setViewBox(0,0,scaleX, scaleY, true);
    R.setViewBox(0,0,scaleX, scaleY, true);

    for(s in self.svg.shapes) {
      var path = self.svg.shapes[s];
      self.map[s] = R.path(path).attr(self.styles.inactive);
      self.map[s].color = Raphael.getColor();
      
      if(self.regions[s.toUpperCase()]) {
        self.map[s].attr(self.styles.default)
        self.attachListeners(self.map[s], s);        
      }
    }
  }

  self.attachListeners = function(path, region) {
    path[0].style.cursor = "pointer";

    path[0].onmouseover = function() {
      if(path != self.activeRegion) {
        self.hoveredRegion = path;
        path.animate(self.styles.hover, 150);
      }
    }

    path[0].onmouseout = function() {
      if(self.hoveredRegion) {
        self.hoveredRegion.animate(self.styles.default, 150);
      }
    }

    path[0].onclick = function() {
      if(self.activeRegion) {
        self.activeRegion.animate(self.styles.default, 150);
      }

      self.activeRegion = path;
      self.hoveredRegion = null;
      path.animate(self.styles.active, 150);

      self.loadSidebar(region);
    }
  }

  self.loadSidebar = function(region) {
    var region = self.regions[region.toUpperCase()];
    console.log(region)
    var $sidebar = apos.fromTemplate('.apos-raphael-sidebar-inner');

    for(i in region) {
      var field = $sidebar.find('[data-'+i+']');
      if(field.length && field.is('a')) {
        field.attr('href', region[i])
      } else {
        field.html(region[i]);
      }
    }

    if(options.fade) {
      $('.apos-raphael-sidebar').fadeOut('50', function(){
        $('.apos-raphael-sidebar').html($sidebar);
        $('.apos-raphael-sidebar').fadeIn('50');
      });      
    } else {
      $('.apos-raphael-sidebar').html($sidebar);
    }
  }

  self.init();

  $('body.apos-raphael-page').on('aposModalHide', function() {
    self.init();
  });

}