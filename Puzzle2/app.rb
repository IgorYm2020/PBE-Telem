require_relative 'rfid'
require 'gtk3'
require 'thread'
require 'glib2'

class App <Gtk::Window

  def initialize
    @r=Rfid.new
    @mainloop=GLib::MainLoop.new(nil,true)
    @id=nil
    super

    set_title "RFID GUI"
    signal_connect "destroy" do
      @mainloop.quit
    end

    init_ui

    show_all
    start_reading
    @mainloop.run
  end

  def init_ui
    vbox = Gtk::Box.new(:vertical,2)
    add vbox
    @label = Gtk::Label.new 
    @label.text = "Please, login with your university card"
    vbox.pack_start(@label,:expand=>true,:fill=>true)
    @button = Gtk::Button.new :label=>"Clear"
    vbox.pack_start(@button,:fill=>true)                                                                                             
    @button.signal_connect "clicked" do                                                                                              
      if @uid!=nil                                                                                                                   
        @label.text = "Please, login with your university card"                                                                      
        @uid=nil                                                                                                                     
        start_reading                                                                                                                
      end                                                                                                                            
    end                                                                                                                              
  end                                                                                                                                
                                                                                                                                     
  def update_uid                                                                                                                     
    @label.text=@uid                                                                                                                 
    return false                                                                                                                     
  end                                                                                                                                
                                                                                                                                     
  def read                                                                                                                           
    uid="uid: #{@r.read_uid}"                                                                                                                                                                                          
    GLib::Idle.add{update_uid}                                                                                                       
  end                                                                                                                                
                                                                                                                                     
  def start_reading                                                                                                                  
    Thread.new{read}                                                                                                                 
  end
end

window=App.new
