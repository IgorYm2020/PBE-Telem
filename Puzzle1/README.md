# Puzzle 1
## RFID reader with MFRC-RC522 module
### Dependencies
As in all the project, Ruby is the main dependency.
That said, we will be using [atitan/MFRC522_Ruby](https://github.com/atitan/MFRC522_Ruby) library:
```
gem install mfrc522
```
## Usage
This file has declared a class named Rfid, with a method called readuid().
It returns the RFID value in hexadecimal and capitalized.
For debugging, you can uncomment the line 17:
```ruby
puts "Error communicating PICC: #{e.message}"
```
The expected message of the error is:
```
status_picc_timeout
```
