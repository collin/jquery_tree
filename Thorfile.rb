require 'rubygems'
require 'thor/tasks'
require 'basis/installer'
require 'pathname'

module JQuery
  module Tree
    class Gen < Thor
      desc 'plugin', "Generate a named skeleton for a plugin"
      def plugin(name)
        source_dir = Dir.pwd
        installer = Basis::Installer.new("#{source_dir}/skeletons/plugin", 
                                    "#{source_dir}/lib/plugins")
        installer.install :name => name
      end    
    end
  end
end
