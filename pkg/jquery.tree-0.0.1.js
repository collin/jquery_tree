;(jQuery(function() {
  jQuery("head").append("<style>.tree{list-style:none;padding:0px;margin:0px;font-size:.7em;font-family:sans-serif}.tree .tree_node{line-height:20px;padding-left:10px;white-space:nowrap;display:block;clear:both;margin-left:0px}.tree .inspected{background-color:#fcc}.tree .inspected .tree_node{background-color:white}.tree ol,.tree ul{list-style:none}.tree ol{white-space:nowrap;background-color:white;padding:0}.tree .inspected> button.toggle{background-image:url(icons/close.png)}.tree .empty button.toggle{background:none}.tree .toggle{border:none;display:inline;position:relative;top:4px;float:left;width:12px;height:12px;background:none;width:16px;height:16px;top:2px}.tree .toggle.closed{background-image:url(icons/open.png) !important}.tree.empty > button.toggle{visibility:hidden}li.inspected> button.disable{background-color:transparent;background-image:url(icons/block.png)}li button.disable{border:none;display:inline;position:relative;top:4px;float:left;width:12px;height:12px;background:none;margin-right:10px}li button.disable.active{background-image:url(icons/active_block.png)}li.inspected> button.destroy{background-color:transparent;background-image:url(icons/small_cross.png)}li button.destroy{border:none;display:inline;position:relative;top:4px;float:left;width:12px;height:12px;background:none;margin-right:10px;opacity:.5}li button.destroy:hover{opacity:1}li.tree_node label{color:blue;font-weight:bold;display:inline}li.tree_node .element{display:inline;position:relative;line-height:20px}li.tree_node .element:before,li.tree_node .element:after{color:#999}li.tree_node .element:before{content:\"<\"}li.tree_node .element:after{content:\">\"}li.tree_node .element *{cursor:text}li.tree_node .id{display:inline;color:red}li.tree_node .id:before,li.tree_node .id_input:before{content:\"#\"}li.tree_node .classes{display:inline;padding:0;margin:0}li.tree_node .classes li{padding:0;margin:0;background:transparent;display:inline;color:green}li.tree_node .classes li:before{content:\".\";color:black;font-weight:bold}li.tree_node .attributes,li.tree_node dd,li.tree_node dt{display:inline;margin:0;padding:0}li.tree_node .attributes> li,li.tree_node dd> li,li.tree_node dt> li{margin:0;padding:0;display:inline}li.tree_node dt{color:blue;margin-left:.3em}li.tree_node dt:after{content:\"=\";color:black}li.tree_node dd{color:red}li.tree_node dd:before,li.tree_node dd:after{content:'\"';color:black}</style>");
}));

if(!jQuery.tree) jQuery.tree = {};

jQuery.tree.tree_node = jQuery("<li class='tree_node empty'>  <span></span>  <ol></ol></li>");

jQuery.tree.toggle_button = jQuery("<button class='toggle'></button>");

jQuery.tree.disable_button = jQuery("<button class='disable'></button>");

jQuery.tree.destroy_button = jQuery("<button class='destroy'></button>");

jQuery.tree.tag_name_button = jQuery("<button class='tag_name'></button>");

jQuery.tree.tag_name_input = jQuery("<input class='tag_name' type='text' />");

jQuery.tree.tag_name_label = jQuery("<label/>");

jQuery.tree.dom_node = jQuery("<li class='tree_node empty'>  <div class='element'></div>  <ol></ol></li>");

jQuery.tree.id_input = jQuery("<input class='id' type='text' />");

jQuery.tree.id_label = jQuery("<div class=\"id\"/>");

jQuery.tree.classes_input = jQuery("<input class='classes' type='text' />");

jQuery.tree.classes_label = jQuery("<ul class=\"classes\"/>");

jQuery.tree.attributes_input = jQuery("<input class='attributes' type='text' />");

jQuery.tree.attributes_label = jQuery("<dl class=\"attributes\"></dl>");

jQuery.tree.attribute_label = jQuery("<li><dt/><dd/></li>");

console.log('lib/plugins/toggle/toggle.js');
;(function(_) {
  var closed_class = 'closed'
    ,expand_event = 'expand'
    ,collapse_event = 'collapse';
  _.tree.animate = true;
  
  
  _.tree.init_toggle_plugin = function(tree, options) {
    options.node.prepend(_.tree.toggle_button.deep_clone(true));
  };
  
  _.fn.extend({
    toggle_button: function() {
      return this.find('.toggle:first');
    }
    
    ,toggle_click: function(el, node) {
      if(el.hasClass(closed_class)) {
        node.trigger(expand_event);
        node.expand_children(_.tree.animate);
      }
      else {
        node.trigger(collapse_event);
        node.collapse_children(_.tree.animate);
      }
    }

    ,collapse_children: function(slide) {
      if(slide)
        this.child_list().slideUp();
      else
        this.child_list().hide();
      this.toggle_button().addClass(closed_class);
      return this;
    }
    
    ,expand_children: function(slide) {
      if(slide)
        this.child_list().slideDown();
      else
        this.child_list().show();
      this.toggle_button().removeClass(closed_class);
      return this;
    }
  });
})(jQuery);


console.log('lib/plugins/disable/disable.js');
;(function(_) {
  var active_class = 'active'
    ,disable_event = 'disable'
    ,enable_event = 'enable';
  
  _.tree.init_disable_plugin = function(tree, options) {
    options.node.prepend(_.tree.disable_button.deep_clone(true));
  };
  
  _.fn.extend({
    disable_button: function() {
      return this.find('.disable:first');
    }
    
    ,disable_click: function(el, node) {
      el.toggleClass(active_class);
      if(el.hasClass(active_class)) node.trigger(disable_event);
      else                     node.trigger(enable_event);    
    }
  });
})(jQuery);


console.log('lib/plugins/destroy/destroy.js');
;(function(_) {
  var destroy_event = 'destroy'

  _.tree.init_destroy_plugin = function(tree, options) {
    options.node.prepend(_.tree.destroy_button.deep_clone(true));
  };
  
  _.fn.extend({
    destroy_button: function() {
      return this.find('.destroy:first');
    }
    
    ,destroy_click: function(el, node) {
      node.trigger(destroy_event);
      node.remove();
    }
  });
})(jQuery);


console.log('lib/plugins/tag_name/tag_name.js');
;(function(_) {
  _.tree.tag_name_label.click(function(e) {
    e.preventDefault();
    _(this).fn('edit');
  });
  
  _.tree.init_tag_name_plugin = function(tree, options) {
    options.node.find('.element').append(_.tree.tag_name_label.deep_clone());
    _(document.body).append(_.tree.tag_name_input);
  }
  
  _.tree.tag_name_label.fn({
    edit: function() {
      var node = parent_node();
      return node.edit_label({
        label: node.tag_name_label()
        ,input: _.tag_name_input
        ,default_value: 'div'
      });
    }
  });
  
  _.fn.extend({
    tag_name_label: function() {
      return this.find('label:first');
    }
  });
})(jQuery);


console.log('lib/plugins/dom_node/dom_node.js');
//jQuery.tree.node = jQuery.dom_node;
;(function(_) {
  _.tree.dom_node.fn({
    paint: function(data) {
      var _this = _(this)
        ,defaults = _.extend({}, {
          tag_name: 'div'
          ,id: ''
        })
        ,data = _.extend(defaults, data);
      
      _this.tag_name_label().html(data.tag_name);
      _this.id_label().html(data.id).hide_if_empty();
      if(data.classes)
        _this.class_list().append(_.array_to_classes_dom(data.classes));
      if(data.attributes)
        _this.attribute_list().append(_.object_to_attributes_dom(data.attributes));
      return _this;
    }
  });
})(jQuery);


console.log('lib/plugins/id/id.js');
;(function(_) {
  _.tree.id_label.click(function(e) {
    e.preventDefault();
    _(this).fn('edit');
  });
  
  _.tree.init_id_plugin = function(tree, options) {
    options.node.find('.element').append(_.tree.id_label.deep_clone(true));
    _(document.body).append(_.tree.id_input);
  };

  _.tree.id_label.fn({
    edit: function() {
/*
  insertion_method: method to insert the input: 'append', 'before', etc.
    defaults to 'after'
  do_not_hide_label: keep the label around so it's css will apply
  default_value: set the label to this if the value is ""
  hide_if_empty: hide the label if the value is ""
  remove_if_empty: remove the label if the value is ""
*/  
      var node = this.parent_node();
      return node.edit_label({
        label: node.id_label()
        ,input: _.id_input
        ,hide_if_empty: true
        ,do_not_hide_label: true
      });
    }
  });
  
  _.fn.extend({
    id_label: function() {
      return this.find('.id:first');
    }
  });
})(jQuery);


console.log('lib/plugins/classes/classes.js');
;(function(_) {
  _.tree.classes_label.click(function(e) {
    e.preventDefault();
    _(this).edit_class(_(e.target));
  });
  
  _.tree.init_classes_plugin = function(tree, options) {
    options.node.find('.element').append(_.tree.classes_label.deep_clone(true));
    _(document.body).append(_.tree.classes_input);
  };

  _.tree.classes_label.fn({
    edit: function(last) {
      if(last) {
        var last_class = this.last_class();
        if(last_class.length) return this.edit_class(last_class);
      }
      else {
        var first_class = this.first_class();
        if(first_class.length) return this.edit_class(first_class);
      }      
      return this.new_class();    
    }
  });
  
  _.fn.extend({
    class_list: function() {
      return this.find('.classes:first');
    }

    ,edit_class: function(cls) {
/*
  insertion_method: method to insert the input: 'append', 'before', etc.
    defaults to 'after'
  do_not_hide_label: keep the label around so it's css will apply
  default_value: set the label to this if the value is ""
  hide_if_empty: hide the label if the value is ""
  remove_if_empty: remove the label if the value is ""
*/  
      var node = this.parent_node(cls);
      return node.edit_label({
        label: cls
        ,input: _.tree.classes_input
        ,remove_if_empty: true
        ,do_not_hide_label: true
      });    
    }
  
    ,new_class: function() {
      var cls = _('<li>');
      this.class_list().append(cls);
      return this.edit_class(cls);
    }
  
    ,previous_class: function(cls) {
      var prev = cls.prev('li').prev('li').prev('li');
      if(prev.length) return this.edit_class(prev);
      return this.prev().fn('edit');
    }
    
    ,next_class: function(cls) {
      var next = cls.next('li');
      if(next.length) return this.edit_class(next);
      return this.next().fn('edit');
    }
  
    ,class_string: function() {
      var classes = this.class_list().children().map(function() {
        var _this = _(this);
        if(_this.is('input')) return _this.val(); 
        return _this.text();    
      });
      return classes.join(' ');
    }
    
    ,classes_to_dom: function() {
      var dom = _.array_to_classes_dom(this.classes());
      return dom[0] === document ? null : dom;
    }
  
    ,last_class: function() {
      return this.class_list().find('li:last');
    }
    
    ,first_class: function() {
      return class_list().find('li:last');
    }
  });
  
  _.array_to_classes_dom = function(array) {
    return _(array.map(function(cls) {
      return '<li>'+cls+'</li>';
    }).join(''));
  }
})(jQuery);


console.log('lib/plugins/attributes/attributes.js');
;(function(_) {
  _.tree.attributes_label.click(function(e) {
    e.preventDefault();
    var el = _(e.target)
      ,_this = _(this)
      ,attr = el.parent();
    if(el.is('dt')) _this.edit_attribute(attr);
    if(el.is('dd')) _this.edit_value(attr); 
  });
  
  _.tree.init_attributes_plugin = function(tree, options) {
    options.node.find('.element').append(_.tree.attributes_label.deep_clone(true));
    _(document.body).append(_.tree.attributes_input);
  };
    
  _.tree.attributes_label.fn({
    edit: function() {
      var first_attr = this.attribute_list().find('li:first');
      
      if(first_attr.length) return this.edit_attr(first_attr);
      
      return this.new_attr();  
    }
  });
  
  _.fn.extend({
    attribute_list: function() {
      return this.find('.attributes:first');
    }
    
    ,new_attr: function() {
      var attr = _('<li><dt><dd></li>');
      this.attribute_list().append(attr);
      return this.edit_attr(attr);
    }
    
    ,previous_attr: function(attr) {
      var prev = attr.prev('li');
      if(prev.length) return this.edit_value(prev);
      this.prev().fn('edit', 'last');
    }
    
    ,next_attr: function(attr) {
      var next = attr.next('li');
      if(next.length) return this.edit_attr(next);
      return this.parent_node().new_attr();
    }
    
    ,edit_attr: function(label) {
      return this.edit_label({
        label: label.find('dt')
        ,input: _.tree.attr_input
        ,insertion_method: 'before'
        ,if_empty: function() {this.parent().remove()}
        ,do_not_hide_label: true
      });
    }
    
    ,edit_value: function(label) {
      return this.edit_label({
        label: label.find('dd')
        ,input: _.tree.value_input
        ,insertion_method: 'append'
        ,do_not_hide_label: true
      });
    }    
    
    ,attributes_to_dom: function() {
      var attrs = {} 
      
      _(this[0].attributes).each(function(which, attr) {
        if(!this.name.match(/id|class/)) {
          attrs[this.name] = this.value;
        }
      });
      
      var dom = _.object_to_attributes_dom(attrs);
      return dom[0] === document ? null : dom; 
    }
  });
  
  _.object_to_attributes_dom = function(object) {
    var dom_string = "", slot;
    for(slot in object)
      dom_string += '<li><dt>'+slot+'</dt><dd>'+object[slot]+'</dd></li>';
    return _(dom_string);
  };
})(jQuery);


console.log('lib/plugins/html_editor/html_editor.js');
;(function(_) {
  _.tree.init_html_editor_plugin = function(tree, options) {
    var html_editor_plugins = 'toggle disable destroy tag_name id classes attributes'.split(/ /);
    options.plugins = options.plugins.concat(html_editor_plugins);
    options.node = _.tree.dom_node.deep_clone(true);
    tree.init_tree_plugins(html_editor_plugins, options);
  };
})(jQuery);


console.log('lib/bubble_custom_event.js');
// PATCH http://dev.jquery.com/attachment/ticket/3379/bubble.patch
;(function() {

function now() { return +new Date; }
var expando = "jQuery" + now();

jQuery.event.trigger = function(type, data, elem, donative, extra) {
    // Clone the incoming data, if any
    data = jQuery.makeArray(data);

    if ( type.indexOf("!") >= 0 ) {
            type = type.slice(0, -1);
            var exclusive = true;
    }

    // Handle a global trigger
    if ( !elem ) {
            // Only trigger if we've ever bound an event for it
            if ( this.global[type] )
                    jQuery.each( jQuery.cache, function(){
                            if ( this.events && this.events[type] )
                                    jQuery.event.trigger( type, data, this.handle.elem );
                    });

    // Handle triggering a single element
    } else {
            // don't do events on text and comment nodes
            if ( elem.nodeType == 3 || elem.nodeType == 8 )
                    return undefined;

            var val, ret, fn = jQuery.isFunction( elem[ type ] || null ),
                    // Check to see if we need to provide a fake event, or not
                    event = !data[0] || !data[0].preventDefault;

            // Pass along a fake event
            if ( event ) {
                    data.unshift({
                            type: type,
                            target: elem,
// PATCH http://dev.jquery.com/attachment/ticket/3379/bubble.patch
                            _preventDefault: null,
                            _stopPropagation: null,
                            preventDefault: function(){ this._preventDefault = true; },
                            stopPropagation: function(){ this._stopPropagation = true; },
// END PATCH
// Doesn't work             timeStamp: now()
                    });
                    data[0][expando] = true; // no need to fix fake event
            }

            // Enforce the right trigger type
            data[0].type = type;
            if ( exclusive )
                    data[0].exclusive = true;


            // Trigger the event, it is assumed that "handle" is a function
            var handle = jQuery.data(elem, "handle");
// PATCH http://dev.jquery.com/attachment/ticket/3379/bubble.patch
            if ( handle )  
            val = handle.apply( elem, data ); 
 		             
            // handle the bubble if need be 
	          if (data[0]._stopPropagation !== true && val !== false && elem.parentNode)  
	            jQuery.event.trigger( type, data, elem.parentNode ); 
	             
	          if (data[0]._preventDefault === true) donative == false; 
// END PATCH
            // Handle triggering native .onfoo handlers (and on links since we don't call .click() for links)
            if ( (!fn || (jQuery.nodeName(elem, 'a') && type == "click")) && elem["on"+type] && elem["on"+type].apply( elem, data ) === false )
                    val = false;

            // Extra functions don't get the custom event object
            if ( event )
                    data.shift();

            // Handle triggering of extra function
            if ( extra && jQuery.isFunction( extra ) ) {
                    // call the extra function and tack the current return value on the end for possible inspection
                    ret = extra.apply( elem, val == null ? data : data.concat( val ) );
                    // if anything is returned, give it precedence and have it overwrite the previous value
                    if (ret !== undefined)
                            val = ret;
            }

            // Trigger the native events (except for clicks on links)
            if ( fn && donative !== false && val !== false && !(jQuery.nodeName(elem, 'a') && type == "click") ) {
                    this.triggered = true;
                    try {
                            elem[ type ]();
                    // prevent IE from throwing an error for some hidden elements
                    } catch (e) {}
            }

            this.triggered = false;
    }

    return val;
};
})();
console.warn('PATCHED bubble custom event')


console.log('lib/tree.js');
;(function(_){
  _.tree.tree_node.fn({
    paint: function(label) {
      return _(this).find('span:first').html(label);
    }
  });

  function defaults() {     
    return {
      node: _.tree.tree_node.deep_clone(true)
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
            node.blur_all();
            _(options.plugins).each(function() {
              if(el.hasClass(this)) el[this+'_click'](el, node);
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
    
/*
  label: the jqueried label
  input: the jqueried input elment

  insertion_method: method to insert the input: 'append', 'before', etc.
    defaults to 'after'
  do_not_hide_label: keep the label around so it's css will apply
  default_value: set the label to this if the value is ""
  hide_if_empty: hide the label if the value is ""
  remove_if_empty: remove the label if the value is ""
*/
    ,edit_label: function(opts) {
      var label = opts.label
        ,input = opts.input;

      _(document.body).blur_all();
      input.val(label.text());
      
      if(opts.do_not_hide_label) label.clear().css('display', '');
      else label.hide();
      
      label[opts.insertion_method || 'after'](input.show());
     
      input
        .size_to_fit()
        .one('blur', function() {
          if(opts.complete) {        
            _(document.body).append(input.hide());
            opts.complete();
          }
          else {
            _(document.body).append(input.hide());
            if(opts.default_value) {
              label
                .html(input.val() || opts.default_value)
                .show();
            }
            else if(opts.hide_if_empty) {      
              label
                .html(input.val())
                click.hide_if_empty();
            }
            else if(opts.remove_if_empty) {
              label
                .html(input.val())
                .remove_if_empty();
            }
            else if(opts.if_empty) {
              label
                .html(input.val())
                .if_empty(opts.if_empty);
            }
            else {
              label.html(input.val());
            }
          }
        });
      
      label.parent().length && opts.success && opts.success.call(label);
      
      setTimeout(function(){input.focus();}, 1);
      return this;
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
    
    ,create_node: function(contents) {
      var node = this.tree().data('tree.options').node.deep_clone();
      node.fn('paint', contents);
      this.removeClass('empty');
      this.child_list().append(node);
      return node;
    }
  });
})(jQuery);
