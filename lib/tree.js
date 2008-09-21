;(function(_){
  _.tree = {
    plugins: []
    
    ,use_plugins: function(names) {
      _(names.split(/ |,/)).each(function() {
        _.plugins.push(this);
        _["inject_"+this+"_dom]"();
      });
    }
  };

  _.fn.extend({
    child_list: function() {
      if(this.is('ol')) return this;
      return this.find('ol:first');
    }
    
    ,parent_node: function() {
      var node = this.parents('.tree_node:first');
      if(node.length) return node;
      return this.filter('.tree_node');
    }
    
    ,is_tree: function() {
      return this.click(function(e) {
        var el = _(e.target)
          ,node = el.parent_node();
        
        if(el.is('input')) return;
        node.blur_all();
        _.tree.plugins.each(function() {
          if(el.hasClass(this)) el[this+'_click'](el, node);
        });
      }        
    }
  });
})(jQuery);
