require 'rubygems'

require 'continuous_builder'
require 'haml'

require 'sass'
require 'sass/plugin'
#require 'jabs'

require 'pathname'
Pathname.send :alias_method, '/', '+'

module JQuery
  module Tree
    Version = "0.0.1"
    Root = Pathname.new(Pathname(__FILE__).dirname)/'..'
    class Builder < ContinuousBuilder
      Unique = "jquery_tree"
      watches :examples,
        :files => Root/'examples'/'**'/'*.html.haml',
        :module => Haml
        
      watches :haml,
        :files => Root/'lib'/'**'/'*.html.haml',
        :module => Haml
           
      watches :sass,
        :files => Root/'lib'/'**'/'*.css.sass',
        :module => Sass,
        :style => :compressed,
        :load_paths => Pathname.glob(Root/'lib'/'**')
        
      watches :resources,
        :files => Root/'lib'/'**'/'*{.css,.js,.html}',
        :update => :build_embedded,
        :wait_for_all_edits => true
      
      watches :vendor,
        :files => Root/'vendor'/'**'/'*.js',
          :update => :build_embedded,
          :wait_for_all_edits => true
 
=begin loop of death      
      watches :self, 
        :files => Root/'script'/'build',
        :update => :reload_builder
=end
      
      def reload_builder path
        load __FILE__
      end
      
      def build_embedded path
        scripts = []
        
        stylesheets = Pathname.glob(Root/'lib'/'**'/'*.css').map do |sheet|
          flat = sheet.read
          flat.gsub!("\n", "")
          flat.gsub!("\r\n", "")
          flat.gsub! /\/\*.*\*\//, "" 
          flat.gsub! /\"/ , "\\\""
          flat
        end.join('')
        
        style_el = "<style>#{stylesheets}</style>"
        
      scripts << StringIO.new(%{
function load_styles_#{Unique}() {
  jQuery("head").append("#{style_el}");
}
if(document.body) load_styles_#{Unique}();
else jQuery(load_styles_#{Unique});
      })

        scripts << StringIO.new("if(!jQuery.tree) jQuery.tree = {};")
        
        Pathname.glob(Root/'lib'/'**'/'*.html').each do |script|
          flat = script.read
          flat.gsub! "\r\n", ""
          flat.gsub! "\n", ""
          flat.gsub! /\/\*.*\*\//, "" 
          flat.gsub! /\"/ , "\\\""
          name = script.basename.to_s.gsub('.html', '')
          jquery = "jQuery.tree.#{name} = jQuery(\"#{flat}\");"       
          io = StringIO.new jquery
          scripts << io
        end 
        
        Pathname.glob(Root/'lib'/'**'/'*.js').each do |script|
          scripts << script
        end
        
        vendor = []
        vendor << Root/'vendor'/'effen'/'jquery.fn.js'
        vendor << Root/'vendor'/'jquery_extensions'/'jquery.extension.js'
        vendor << Root/'vendor'/'jquery_keybinder'/'jquery.keybinder.js'
        
        f = File.open(build_target/"jquery.tree-#{Version}.js", 'w+')
        f.write(scripts_string = scripts.map do |script| 
          (script.is_a?(StringIO) ? "" : "console.log('#{script}');\n")+script.read
        end.join("\n\n"))
        f.close()
        
        f = File.open(build_target/"jquery.tree.vendor_bundle-#{Version}.js", 'w+')
        f.write(vendor_string = vendor.map do |script| 
          "console.log('#{script}');\n"+script.read
        end.join("\n\n"))
        f.close()
        
        f = File.open(build_target/"jquery.tree.bundle-#{Version}.js", 'w+')
        f.write((Root/'vendor'/'jquery'/'jquery-1.2.6.js').read << "\n\n#{vendor_string}\n\n#{scripts_string}")
        f.close()
                
        #FileUtils.rm(Pathname.glob(Root/'lib'/'**'/'*.{html,css}'))
               
        icons = (build_target/'icons')
        icons.unlink if icons.exist?
        FileUtils.ln_s((Root/'assets'/'icons'), icons)      
      end
      
      def build_target
        Root/'pkg'
      end
    end
  end
end
