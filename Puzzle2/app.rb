#require_relative 'rfid'
require 'gtk3'
require 'thread'
require 'glib2'

class App <Gtk::Window

  @@blue=Gdk::RGBA::new(0,0,1.0,1.0)
  @@red=Gdk::RGBA::new(1.0,0,0,1.0)
  @@white=Gdk::RGBA::new(1.0,1.0,1.0,1.0)

  def initialize
    #@r=Rfid.new
    @random=Random.new(1234)
    @mainloop=GLib::MainLoop.new(nil,true)
    @id=nil
    super

    set_title "RFID GUI"
    set_resizable false
    set_size_request 400, 100
    set_border_width 5
    signal_connect "destroy" do
      @mainloop.quit
    end

    init_ui

    show_all
    Thread.new{read}
    @mainloop.run
  end

  def init_ui
    vbox = Gtk::Box.new(:vertical,2)
    add vbox
    @label = Gtk::Label.new 
    @label.text = "Please, login with your university card"
    @label.override_background_color(:normal,@@blue)
    @label.override_color(:normal,@@white)
    vbox.pack_start(@label,:expand=>true,:fill=>true)
    @button = Gtk::Button.new :label=>"Clear"
    @button.set_focus_on_click true
    vbox.pack_start(@button,:fill=>true)
    @button.signal_connect "clicked" do
      if @uid!=nil
        @label.text = "Please, login with your university card"
        @label.override_background_color(:normal,@@blue)
        @uid=nil
        Thread.new{read}
      end
    end
  end

  def update_uid
    @label.text=@uid
    return false
  end

  def read
    sleep(@random.rand(3..5))
    @uid="uid: #{@random.rand(10000..99999)}"
    @label.override_background_color(:normal,@@red)
    #uid="uid: #{@r.read_uid}"
    GLib::Idle.add{update_uid}
  end

  def start_reading
  end
end

window=App.new
