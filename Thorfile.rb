require 'rubygems'
require 'thor/tasks'
require 'basis/installer'
require 'pathname'
require Dir.pwd + '/tools/build'

module JQuery
  module Tree
    class Build < Thor
      def create_builder uri_root, options
        JQuery::Tree.const_set :UriRoot, uri_root
        builder = JQuery::Tree::Builder
        if options.include? 'target'        
          builder.send :define_method, :build_target do 
            Pathname.new options[:target] 
          end
        end
        builder.new
      end
    
      public
      desc 'package', "build package once"
      method_options 'target' => :optional
      def package uri_root = ""
        create_builder(uri_root, options).build_all
      end
      
      desc 'continuously', 'watch for changes to the file system and rebuild the package'
      method_options 'target' => :optional
      def continuously uri_root = ""
        b = create_builder(uri_root, options)
        b.build_all
        b.build_continuously
      end
    end
    
    class Gen < Thor
      private
      def source_dir
        Dir.pwd
      end
      public
      desc 'button_plugin', "Generate a named skeleton for a button plugin"
      def button_plugin name
        installer = Basis::Installer.new("#{source_dir}/skeletons/button_plugin", 
                                    "#{source_dir}/lib/plugins")
        installer.install :name => name
      end
      
      desc 'generic_plugin', "Generate a palin generic plugin"
      def generic_plugin name
        installer = Basis::Installer.new("#{source_dir}/skeletons/generic_plugin", 
                                    "#{source_dir}/lib/plugins")
        installer.install :name => name
      end
      
      desc 'label_plugin', "Generate a named skeleton for a label plugin"
      def label_plugin name
        installer = Basis::Installer.new("#{source_dir}/skeletons/label_plugin", 
                                    "#{source_dir}/lib/plugins")
        ARGV.clear
        puts "provide markup for this label"
        element = gets.chomp
        
        puts "provide a canonical selector for this label, from a li.tree_node context"
        selector = gets.chomp
        
        puts "provide a the type of tree node this label appears in"
        selector = gets.chomp
        
        installer.install :name => name, 
          :element => element, 
          :selector => selector,
          :node_type => node_type
      end
      desc 'node_type_plugin', "Generate a named skeleton for a node type plugin"
      def node_type_plugin name
        installer = Basis::Installer.new("#{source_dir}/skeletons/node_type_plugin", 
                                    "#{source_dir}/lib/plugins")
        ARGV.clear
        puts "provide name for it\'s label"
        label = gets.chomp

        installer.install :name => name, 
          :label => label
      end
    end
  end
end
