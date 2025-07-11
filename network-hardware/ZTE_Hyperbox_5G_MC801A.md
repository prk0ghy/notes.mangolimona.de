# ZTE Custom DNS Script


Source: https://community.magenta.at/topic/7342-zte-mc801-dns-server-%C3%A4ndern/
Original code from @Miononno



Hallo zusammen,

ich habe auch den ZTE MC801A der Telekom und nutze ebenfalls ein PiHole zum blocken. Der Router ist durch die Telekom stark restriktiert!

Da ich ebenfalls keinen DNS über den Router einstellen konnte, habe ich DHCP über mein Raspberry Pi laufen lassen. Das führte jedoch dazu, dass mein Router aufgrund unbekannter Weise sich immer vom Netz verabschiedet hat. Die Lösung die ben06 beschreiben hat ist möglich, jedoch viel zu umständlich.

 

Nach langer Suche bin ich auf eine Lösung gestoßen welche anwenderfreundlich ist!

 

Ihr habt die Möglichkeit durch Javascript auf die Einstellungen des Routers zuzugreifen. Folgendes müsst ihr machen:

1. Nutzt Google Chrome als Browser um das Javascript laufen zu lassen. (Für Mac-User sollte auch Safari funktionieren.)

 

2. Erstellt ein Lesezeiten mit dem Namen "Egal" ich habe es "801" genannt und als Adresse gibt kopiert ihr folgendes Script rein und speichert es:

 

-----------------------------



------------------------------------------------------------------------

Der Code wurde von @Miononno erstellt. Also Ruhm geht an Ihn!!!

 

3. Loggt euch über den Chrome Browser in euern Router ein und öffnet dann das gespeicherte Lesezeichen.

 

4. Nun habt ihr oben viele Einstellungsmöglichkeiten (Sh. Bild) die vorher nicht möglich waren. Unteranderem auch den DNS ändern. Einfach auf "DNS Mode" klicken und dort tragt ihr dann wie gewohnt die IP-Adresse des Pi`s + eine 2te Adesse ein. (X.X.X.X,X.X.X.X = DNS1,DNS2)

 

5. Done! ;)

 

PS: Das Scipt gibt euch viel mehr Möglichkeiten, wie z.B. fixierte Band Auswahl und die genaue Verbindungsqualität in Echtzeit! Also falls ihr eine externe 5G Richtantenne benutzt könnt ihr diese nun sogar besser ausrichten!

 

Anbei noch ein Screenshot wie es bei euch aussehen sollte.

 

Ich hoffe es kann einigen Nutzern helfen!

Viele Grüße aus Deutschland!

FleischMensch! 