require 'mfrc522' 

class Rfid

  def initialize
    @r = MFRC522.new
  end

  # return uid in hexa str
  def read_uid
    while true do
      begin
        @r.picc_request(MFRC522::PICC_REQA)
        uid, sak = @r.picc_select
        return self.convert_dec_hex(uid)
      rescue CommunicationError => e
        # puts "Error communicating PICC: #{e.message}"
      else
        break
      end
    end
  end

  def convert_dec_hex(uid)
    out=""
    for number in uid do
      out+=number.to_s(16).upcase()
    end
    return out
  end

end

if __FILE__ == $0
  r=Rfid.new
  puts r.read_uid
end
