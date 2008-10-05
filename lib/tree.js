;(function(_){
  _.tree.tree_node.fn({
    edit: function() {
      var _this = _(this);
      _this.label().fn('edit');
      return _this;
    }
    
    ,paint: function(label) {
      return _(this).label().html(label);
    }
  });

  function defaults() {
    return {
      node: {
        basic: _.tree.tree_node.deep_clone(true)
      }
      ,plugins: ''
    };    
  }

  var inspection_class = 'inspected';

  _.fn.extend({
    init_tree_plugins: function(plugins, options) {
      var tree = this;
      _(plugins).each(function() {
        _.tree['init_'+this+'_plugin'].call(tree, tree, options);
      });
    }
  
    ,label: function() {
      return this.children('span:first');
    }
  
    ,is_tree: function(options) {
      options = _.extend(defaults(), options);
      options.plugins = options.plugins.split(/ /);
      
      var tree = this;
      tree
        .data('tree.options', options)
        .init_tree_plugins(options.plugins, options);
           
      return this
        .click(function(e) {
            e.preventDefault();
            var el = _(e.target)
              ,node = el.parent_node();
            
            if(el.is('input')) return;
            _(options.plugins).each(function() {
              if(el.hasClass(this)) 
                if(el[this+'_click']) 
                  el[this+'_click'](el, node);
            });
          })
        .mouseover(function(e) {
            var node = _(e.target);
            tree.remove_class_on_all_children_and_self(inspection_class)
            if(!node.is('.tree_node')) node = node.parent_node();
            node.addClass(inspection_class);      
          });        
    }
    
    ,child_list: function() {
      if(this.is('ol')) return this;
      return this.find('ol:first');
    }
    
    ,tree: function() {
      if(this.hasClass('tree')) return this;
      return this.parents('.tree:first');
    }
    
    ,parent_node: function() {
      var node = this.parents('.tree_node:first');
      if(node.length) return node;
      return this.filter('.tree_node');
    }
    
    // assumes effen
    ,deep_clone: function(events) {
      var clone = this.clone(events)
        .mixin(this)
        .clear();
        
      this.children().each(function() {
        clone.append(_(this).deep_clone(events));
      });
      
      return clone;
    }
    
    ,create_node_after: function(contents) {
      var node = this._create_node(contents);
      this.after(node);
      return node;
    }
    
    ,create_node: function(contents) {
      var node = this._create_node(contents);
      this
        .removeClass('empty')
        .child_list()
          .append(node);
      return node;
    }
    
    ,_create_node: function(contents, type) {
      if(!type) type = 'basic'
      var node = this.tree().data('tree.options').node[type].deep_clone(true);
      node.fn('paint', contents);
      return node;
    }
  });
})(jQuery);
