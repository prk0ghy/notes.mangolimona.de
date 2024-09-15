# EasyBox 904 xDSL recovery

> ## recover easybox 904 with macos as recovery machine

> download vodafone firmware and rename

>   https://www.vodafone.de/media/downloads/files/fullimage_AT904X-04.16.zip

`mv fullimage_AT904X-04.16.bin fullimage.img`

> change your interface ip to 192.168.2.100

> allow tftpd trough the firewall /usr/libexec/tftpd
> i did this trough ui but should work like this:
> sudo /usr/libexec/ApplicationFirewall/socketfilterfw --add /usr/libexec/tftpd

`sudo launchctl load -F /System/Library/LaunchDaemons/tftp.plist`

`netstat -na |grep \*.69`

> user@host %
> udp4       0      0  *.69                   *.*
> udp6       0      0  *.69                   *.*

>  boot easybox into recovery
>   - power off
>   - press and keep pressed reset button
>   - power on
>   - wait 10 sec
>   - release reset button
>
>   easybox should load the image
>
> 

> ## cleanup

```sh
sudo launchctl unload -F /System/Library/LaunchDaemons/tftp.plist

sudo /usr/libexec/ApplicationFirewall/socketfilterfw --remove /usr/libexec/tftpd

sudo rm /private/tftpboot/fullimage.img
```

> ## links
>   https://www.vodafone.de/hilfe/router/easybox-904.html
>   https://forum.openwrt.org/t/easybox-904-xdsl-openwrt-installation/96822
>
