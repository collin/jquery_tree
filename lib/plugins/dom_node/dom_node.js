;(function(_) {
  _.tree.dom_node.fn({
    edit: function() {
      var _this = _(this);
      _this.tag_name_label().fn('edit');
      return _this;
    }
    
    ,paint: function(data) {
      var _this = _(this)
        ,defaults = _.extend({}, {
          tag_name: 'div'
          ,id: ''
        })
        ,data = _.extend(defaults, data);
      
      if(_this.child_list().children().length) _this.removeClass('empty');
      
      _this.tag_name_label().html(data.tag_name);
      _this.id_label().html(data.id).hide_if_empty();
      if(data.classes)
        _this.class_list().append(_.array_to_classes_dom(data.classes));
      if(data.attributes)
        _this.attribute_list().append(_.object_to_attributes_dom(data.attributes));
      return _this;
    }
    
    ,to_haml: function(indent) {
      var _this = _(this);
      
      return indent 
        + _this
            .find('.element')
              .serialize_children_to_haml()
        + "\n"
        + _this
            .child_list()
              .serialize_children_to_haml(indent);
    }
  });
})(jQuery);
