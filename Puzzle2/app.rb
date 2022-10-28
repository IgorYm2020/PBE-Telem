require_relative 'rfid'
require 'gtk3'
require 'thread'
require 'glib2'

class App <Gtk::Window

  def initialize
    @r=Rfid.new
    @mainloop=GLib::MainLoop.new(nil,true)
    super

    set_title "RFID GUI"
    signal_connect "destroy" do
      @thread.kill
      @mainloop.quit
    end

    init_ui

    show_all
    @mainloop.run
  end

  def init_ui
    vbox = Gtk::Box.new(:vertical,2)
    add vbox
    @label = Gtk::Label.new 
    @label.text = "Please, login with your university card"
    read
    vbox.pack_start(@label,:expand=>true,:fill=>true)
    @button = Gtk::Button.new :label=>"Clear"
    vbox.pack_start(@button,:fill=>true)
    @button.signal_connect "clicked" do
      puts "Netejat"
      @thread.kill
      @label.text = "Please, login with your university card"
      read
    end
    
  end

  def read
    @thread=Thread.new{
      error=false
      while error do
        begin
          GLib::Idle.add(false,read)
        rescue => e
          puts e.message
          error=true
        end
      end
      uid="uid: #{@r.read_uid}"
      puts "#{uid} llegida"
      @label.text=uid
    }
  end
end

window=App.new
