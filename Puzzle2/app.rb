require_relative 'rfid'
require 'gtk3'
require 'thread'


class App <Gtk::Window

  def initialize
    @r=Rfid.new
    @mutex = Mutex.new
    @cv=ConditionVariable.new
    super

    set_title "RFID GUI"
    signal_connect "destroy" do
      @thread.kill
      Gtk.main_quit
    end

    init_ui

    show_all
  end

  def init_ui
    vbox = Gtk::Box.new(:vertical,2)
    add vbox
    @label = Gtk::Label.new 
    @label.text = "Please, login with your university card"
    vbox.pack_start(@label,:expand=>true,:fill=>true)
    #grid.attach(@label,0,0,1,1)
    @button = Gtk::Button.new "Clear"
    vbox.pack_start(@button,:fill=>true)
    #grid.attach(@button,0,1,1,1)
    @button.signal_connect "clicked" do
      @mutex.synchronize{
        @label.text = "Please, login with your university card"
        @cv.signal
      }
    end
    @thread=Thread.new{
      @mutex.synchronize{
        while true do
          begin
            read
          rescue => e
            puts e.message
          end
          @cv.wait(@mutex)
        end
      }
    }
  end

  def read
    puts "hola"
    uid="uid: #{@r.read_uid}"
    puts uid
    @label.text=uid
  end
end

window=App.new
Gtk.main
