# require_relative 'rfid'
require 'gtk3'
require 'thread'
require 'glib2'

class App <Gtk::Window

  def initialize
    @random=Random.new(1234)
    # @r=Rfid.new
    @mainloop=GLib::MainLoop.new(nil,true)
    super

    set_title "RFID GUI"
    signal_connect "destroy" do
      @thread.kill
      @mainloop.main_quit
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
    vbox.pack_start(@label,:expand=>true,:fill=>true)
    @button = Gtk::Button.new "Clear"
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
      # uid="uid: #{@r.read_uid}"
      sleep(@random.rand(3..5)) # Simulation for the user delay
      uid="uid: #{@random.rand(1000000.9999999)}"
      puts "#{uid} llegida"
      @label.text=uid
    }
  end
end

window=App.new
