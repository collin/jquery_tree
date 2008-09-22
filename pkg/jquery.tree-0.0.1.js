;(jQuery(function() {
  jQuery("head").append("<style>.tree{font-size:.7em;font-family:sans-serif}.tree .tree_node.dragging{position:absolute;border:1px outset;background-color:white !important;z-index:10000000000}.tree .tree_node.inspected> button.toggle{background-image:url(/icons/close.png)}.tree .tree_node .toggle{border:none;background:none;width:16px;height:16px;display:inline;float:left;position:relative;top:2px;top:4px}.tree .tree_node .toggle.closed{background-image:url(/icons/open.png)}.tree .tree_node.empty > button.toggle{visibility:hidden}.tree ol,.tree ul{list-style:none}.tree ol{white-space:nowrap;background-color:white;padding:0}.tree ol .inspected{background-color:#fcc}.tree ol .inspected .tree_node{background-color:white}.tree ol li{white-space:nowrap;display:block;clear:both;padding-left:10px;margin-left:0px}.tree.inspected> button.toggle{background-image:url(/icons/close.png)}.tree .toggle{border:none;display:inline;position:relative;top:4px;float:left;width:12px;height:12px;background:none;width:16px;height:16px}.tree .toggle.closed{background-image:url(/icons/open.png)}.tree.empty > button.toggle{visibility:hidden}li.inspected> button.disable{background-color:transparent;background-image:url(/icons/block.png)}li button.disable{border:none;display:inline;position:relative;top:4px;float:left;width:12px;height:12px;background:none;margin-right:10px}li button.disable.active{background-image:url(/icons/active_block.png)}li.inspected> button.destroy{background-color:transparent;background-image:url(/icons/destroy.png)}li button.destroy{border:none;display:inline;position:relative;top:4px;float:left;width:12px;height:12px;background:none;margin-right:10px;opacity:.5}li button.destroy:hover{opacity:1}li.tree_node label{color:blue;display:inline}li.tree_node .element{display:inline;position:relative;line-height:20px}li.tree_node .element:before{content:\"<\";margin-right:-.3em}li.tree_node .element:after{content:\">\";margin-left:-.3em}li.tree_node .id{display:inline;color:red;margin-left:-.3em}li.tree_node .id:before,li.tree_node .id_input:before{content:\"#\"}li.tree_node .attributes,li.tree_node dd,li.tree_node dt{display:inline;margin:0;padding:0}li.tree_node .attributes> li,li.tree_node dd> li,li.tree_node dt> li{margin:0;padding:0;display:inline}li.tree_node dt{color:blue;margin-left:.3em}li.tree_node dt:after{content:\"=\";color:black}li.tree_node dd{color:red}li.tree_node dd:before,li.tree_node dd:after{content:'\"';color:black}</style>");
}));

jQuery.tree_node = jQuery("<li class='tree_node empty'>  <ol></ol></li>");

jQuery.toggle_button = jQuery("<button class='toggle'></button>");

jQuery.disable_button = jQuery("<button class='disable'></button>");

jQuery.destroy_button = jQuery("<button class='destroy'></button>");

jQuery.tag_name_button = jQuery("<button class='tag_name'></button>");

jQuery.tag_name_input = jQuery("<input type='text'>.tag_name</input>");

jQuery.tag_name_label = jQuery("<label/>");

jQuery.dom_node = jQuery("<li class='tree_node empty'>  <div class='element'></div>  <ol></ol></li>");

jQuery.id_input = jQuery("<input type='text'>.id</input>");

jQuery.id_label = jQuery("<div class=\"id\"/>");

jQuery.classes_input = jQuery("<input type='text'>.classes</input>");

jQuery.classes_label = jQuery("<li class=\"classes\"/>");

jQuery.attributes_input = jQuery("<input type='text'>.attributes</input>");

jQuery.attributes_label = jQuery("<dl class=\"attributes\"><li><dt/><dd/></li></dl>");

;(function(_) {
  var closed_class = 'closed'
    ,open_event = 'expand'
    ,close_event = 'collapse';
  _.tree.animate = true;
  
  _.inject_toggle_dom = function() {
    _.tree_node.prepend(_.toggle_button);
  }
  
  _.fn.extend({
    toggle_button: function() {
      return this.find('.toggle:first');
    }
    
    ,toggle_click: function(el, node) {
      if(el.hasClass(closed_class)) {
        node.trigger(expand_event);
        node.expand_children(_.tree.animate);
      }
      else
        node.trigger(collapse event);
        node.collapse_children(_.tree.animate);
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


;(function(_) {
  var active_class = 'active'
    ,disable_event = 'disable'
    ,enable_event = 'enable';
  
  _.inject_disable_dom = function() {
    _.tree_node.prepend(_.disable_button]);
  }
  
  _.fn.extend({
    disable_button: function() {
      return this.find('.disable:first');
    }
    
    ,disable_click: function(el, node) {
      el.toggleClass(active_class);
      if(el.hasClass(active_class) node.trigger(disable_event);
      else                    node.trigger(enable_event);    
    }
  });
})(jQuery);


;(function(_) {
  var destroy_event = 'destroy'

  _.inject_destroy_dom = function() {
    _.tree_node.prepend(_.destroy_button]);
  }
  
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


;(function(_) {
  _.inject_tag_name_dom = function() {
    _.dom_node.find('.element').append(_.tag_name_label);
    _(document.body).append(_.tag_name_input);
  }
  
  _.tag_name_label.fn('edit', function() {
    var node = parent_node();
    return node.edit_label({
      label: node.tag_name_label()
      ,input: _.tag_name_input
      ,default_value: 'div'
    });
  });
  
  _.fn.extend({
    tag_name_label: function() {
      return this.find('label:first');
    }
  });
})(jQuery);


jQuery.tree.node = _.dom_node;


;(function(_) {
  _.inject_id_dom = function() {
    _.dom_node.find('.element').append(_.id_label);
  }

  _.id_label.fn('edit', {function() {
/*
  insertion_method: method to insert the input: 'append', 'before', etc.
    defaults to 'after'
  do_not_hide_label: keep the label around so it's css will apply
  default_value: set the label to this if the value is ""
  hide_if_empty: hide the label if the value is ""
  remove_if_empty: remove the label if the value is ""
*/  
    var node = this.parent_node();"
    return node.edit_label({
      label: node.id_label()
      ,input: _.id_input
      ,hide_if_empty: true
      ,do_not_hide_label: true
    });
  });
  
  _.fn.extend({
    id_label: function() {
      return this.find('.id:first');
    }
  });
})(jQuery);


;(function(_) {
  _.inject_classes_dom = function() {
    _.dom_node.find('.element').append(_.classes_label);
  }

  _.classes_label.fn({
    edit: function(last) {
      if(last) {
        var last_class = this.last_class();
        if last_class.length return this.edit_class(last_class);
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

    ,edit_class: function() {
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
        ,input: _.classes_input
        ,remove_if_empty: true
        ,do_not_hide_label: true
      }    
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
      var dom_string = this.classes().map(function(cls) {
        return '<li>'+cls+'</li>';
      }).join('');
      var dom = _(dom_string);
      return dom[0] === document ? null : dom;
    }
  
    ,last_class: function() {
      return this.class_list().find('li:last');
    }
    
    ,first_class: function() {
      return class_list().find('li:last');
    }
  });
})(jQuery);


;(function(_) {
  _.inject_attributes_dom = function() {
    _.dom_node.find('.element').append(_.attributes_label);
    _(document.body).append(_.attributes_input);
  }
    
  _.tag_name_label.fn('edit', function() {
    var first_attr = this.attribute_list().find('li:first');
    
    if(first_attr.length) return this.edit_attr(first_attr);
    
    return this.new_attr();  
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
        ,input: _.attr_input
        ,insertion_method: 'before'
        ,if_empty: function() {this.parent().remove()}
        ,do_not_hide_label: true
      });
    }
    
    ,edit_value: function(label) {
      return this.edit_label({
        label: label.find('dd')
        ,input: _.value_input
        ,insertion_method: 'append'
        ,do_not_hide_label: true
      });
    }    
    
    ,attributes_to_dom: function() {
      var dom_string = _(this[0].attributes).map(function(which, attr) {
        if(!this.name.match(/id|class/)) {
          return '<li><dt>'+attr.name+'</dt><dd>'+attr.value+'</dd></li>';
        }
      }).join('');
      
      var dom = _(dom_string);
      return dom[0] === document ? null : dom; 
    }
  });
})(jQuery);


// PATCH http://dev.jquery.com/attachment/ticket/3379/bubble.patch
jQuery.event.trigger = function(type, data, elem, donative, extra) {
    // Clone the incoming data, if any
    data = jQuery.makeArray(data);

    if ( type.indexOf("!") >= 0 ) {u
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
                            timeStamp: now()
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
}



;(function(_){
  _.tree = {
    button_plugins: []
    
    ,label_plugins: []    
    
    ,node: _.tree_node
    
    ,use_button_plugins: function(names) {
      _(names.split(/ |,/)).each(function() {
        _.button_plugins.push(this);
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
        _.tree.button_plugins.each(function() {
          if(el.hasClass(this)) el[this+'_click'](el, node);
        });
      }        
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
          _(document.body).append(input.hide());
          if(opts.default_value) {
            label
              .html(input.val() || opts.default_value)
              .show();
          }
          else if(opts.hide_if_empty) {      
            label
              .html(input.val())
              .hide_if_empty();
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
        });
      
      label.parent().length && opts.success && opts.success.call(label);
      
      setTimeout(function(){input.focus();}, 1);
      return this;
    }
  });
})(jQuery);
