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
      desc 'button_plugin', "Generate a named skeleton for a button plugin"
      def button_plugin name
        installer = Basis::Installer.new("#{source_dir}/skeletons/button_plugin", 
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
        
        installer.install :name => name, :element => element, :selector => selector
      end
    end
  end
end
