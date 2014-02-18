var AposRaphaelMap = function(options) {
  var self = this;


  self.map = {};
  self.activeState = null;
  self.svg = options.svg;
  self.styles = {
    fill: "#333",
    stroke: "#666",
    "stroke-width": 1,
    "stroke-linejoin": "round"
  }

  self.init = function() {
    var R = Raphael("apos-raphael-target", 1200, 600);
    // R.setViewBox(0,0,2400, 1200, true);

    // NEEDS MUCH FIXING:
    for(s in self.svg.shapes) {
      var path = self.svg.shapes[s];

      self.map[s] = R.path(path).attr(self.styles);
      self.map[s].color = Raphael.getColor();
      self.attachListeners(self.map[s], s);      
    }
  }

  self.attachListeners = function(st, state) {
    st[0].style.cursor = "pointer";

    st[0].onmouseover = function() {
      if(self.activeState) {
        self.activeState.animate({fill: "#194865"}, 200);
      }

      self.activeState = st;
      st.animate({fill: "#89B91F"}, 200);      
    }
  }

  self.init();
}