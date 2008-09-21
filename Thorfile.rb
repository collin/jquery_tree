require 'rubygems'
require 'thor/tasks'
require 'basis/installer'
require 'pathname'

module JQuery
  module Tree
    class Gen < Thor
      private
      def source_dir
        Dir.pwd
      end
      public
      desc 'plugin', "Generate a named skeleton for a plugin"
      def button_plugin name
        installer = Basis::Installer.new("#{source_dir}/skeletons/button_plugin", 
                                    "#{source_dir}/lib/plugins")
        installer.install :name => name
      end
      
      desc 'plugin', "Generate a named skeleton for a plugin"
      def label_plugin name
        installer = Basis::Installer.new("#{source_dir}/skeletons/button_plugin", 
                                    "#{source_dir}/lib/plugins")
        puts "provide markup for this label"
        element = gets.chomp
        
        puts "provide a canonical selector for this label, from a li.tree_node context"
        selector = gets.chomp
        
        installer.install :name => name, :element => element, :selctor => selector
      end
    end
  end
end
