//(c????) Miononno?? 
//(c????) tpoechtrager https://gist.github.com/tpoechtrager/60010eec1173b6678d306bc466b1b56f
javascript: ftb();

function getStatus() {
    $.ajax({
        type: "GET",
        url: "/goform/goform_get_cmd_process",
        data: {
            cmd: "lte_pci,lte_pci_lock,lte_earfcn_lock,wan_ipaddr,wan_apn,pm_sensor_mdm,pm_modem_5g,nr5g_pci,nr5g_action_channel,nr5g_action_band,Z5g_SINR,Z5g_rsrp,wan_active_band,wan_active_channel,wan_lte_ca,lte_multi_ca_scell_info,cell_id,dns_mode,prefer_dns_manual,standby_dns_manual,network_type,rmcc,rmnc,lte_rsrq,lte_rssi,lte_rsrp,lte_snr,wan_lte_ca,lte_ca_pcell_band,lte_ca_pcell_bandwidth,lte_ca_scell_band,lte_ca_scell_bandwidth,lte_ca_pcell_arfcn,lte_ca_scell_arfcn,wan_ipaddr,static_wan_ipaddr,opms_wan_mode,opms_wan_auto_mode,ppp_status,loginfo",
            multi_data: "1"
        },
        dataType: "json",
        success: function (a) {
            for (signal = a, vars = ["lte_pci", "lte_pci_lock", "lte_earfcn_lock", "wan_ipaddr", "wan_apn", "pm_sensor_mdm", "pm_modem_5g", "nr5g_pci", "nr5g_action_band", "nr5g_action_channel", "Z5g_SINR", "Z5g_rsrp", "wan_active_channel", "wan_active_band", "lte_multi_ca_scell_info", "cell_id", "dns_mode", "prefer_dns_manual", "standby_dns_manual", "rmcc", "rmnc", "network_type", "wan_lte_ca", "lte_rssi", "lte_rsrp", "lte_snr", "lte_rsrq", "lte_ca_pcell_bandwidth", "lte_ca_pcell_band"], e = 0; e < vars.length; e++) window[vars[e]] = a[vars[e]];
            if ($("#nr5rsrpb").parent().toggle("" != a.nr5g_action_band), $("#Z5g_SINR").parent().toggle("" != a.nr5g_action_band), setgraph("nr5rsrp", Z5g_rsrp, -130, -60), setgraph("rsrp", lte_rsrp, -130, -60), setgraph("rsrq", lte_rsrq, -16, -3), cell_id = parseInt(cell_id, 16), enbid = Math.trunc(cell_id / 256), $("#earfcn_lock").html(lte_pci_lock + "/" + lte_earfcn_lock), plmn = rmcc.toString() + rmnc.toString(), $("#enbid").html(enbid), "22201" == plmn && (plmn = "2221"), "22299" == plmn && (plmn = "22288"), "22250" == plmn && 6 == enbid.length && (plmn = "22288"), link_lte = "https://lteitaly.it/internal/map.php#bts=" + plmn + "." + enbid, $("#lteitaly").attr("href", link_lte), "ca_activated" == wan_lte_ca ? $("#ca").parent().parent().css("border-color", "red") : $("#ca").parent().parent().css("border-color", "#bbb"), "" != lte_multi_ca_scell_info) {
                ca_v = lte_multi_ca_scell_info.slice(0, -1).split(";"), ca_txt = "";
                for (var e = 0; e < ca_v.length; e++) d = ca_v[e].split(","), b = d[3], w = d[5], ca_txt += '<span style="color:#b00;">B' + b + "</span>(@" + w + "Mhz)+";
                lte_ca_pcell_band = "B" + lte_ca_pcell_band
            }
            else ca_txt = "", lte_ca_pcell_band = wan_active_band;
            for (a.nr5g_action_band && (ca_txt += '<span style="padding:5px;border-radius:3px;font-size:1.2em;background-color:#eef;color:red;font-weight:bold;">' + a.nr5g_action_band + "</span>"), ca_txt = ca_txt.slice(0, -1), lte_multi_ca_scell_info = ca_txt, "manual" == dns_mode && (dns_mode = prefer_dns_manual + " ," + standby_dns_manual), dns_mode = dns_mode.replace(/,+$/, ""), dns_mode = '<span style="color:#b00;">' + dns_mode + "</span>", lte_ca_pcell_bandwidth = lte_ca_pcell_bandwidth && "(@" + lte_ca_pcell_bandwidth + "Mhz)", e = 0; e < vars.length; e++) $("#" + vars[e]).html(window[vars[e]])
        }
    })
}

function err(a, e, n) {
    alert("Communication Error"), console.log(a), console.log(e), console.log(n)
}

function setgraph(a, n, l, r) {
    trval = n, x = ((n = (n = r < n ? r : n) < l ? l : n) - l) / (r - l) * 100, w = x <= 30 ? 30 : x, ws = String(w) + String.fromCharCode(37), e = "#" + a + "b", $(e).animate({
        width: ws,
        speed: "fast"
    }), $(e).html(a + " : " + trval), x < 50 ? $(e).css("background-color", "yellow").css("color", "black") : (85 < x ? $(e).css("background-color", "orange") : $(e).css("background-color", "green")).css("color", "white")
}

function lockcell(e, n) {
    $.ajax({
        type: "GET",
        url: "/goform/goform_get_cmd_process",
        data: {
            cmd: "wa_inner_version,cr_version,RD",
            multi_data: "1"
        },
        dataType: "json",
        success: function (a) {
            ad = hex_md5(hex_md5(a.wa_inner_version + a.cr_version) + a.RD), $.ajax({
                type: "POST",
                url: "/goform/goform_set_cmd_process",
                data: {
                    isTest: "false",
                    goformId: "LTE_LOCK_CELL_SET",
                    lte_pci_lock: e,
                    lte_earfcn_lock: n,
                    AD: ad
                },
                success: function (a) {
                    console.log(a), j = JSON.parse(a), "success" == j.result ? alert("Now you have to Reboot!") : alert("Error. Modem didn't like it!")
                },
                error: err
            })
        }
    })
}

function cslock() {
    c = parseInt(lte_pci, 16) + "," + wan_active_channel;
    var a = prompt("Please input PCI,EARFCN, separated by ',' char (example 116,3350). Leave default for lock on current main band.", c);
    null != a && "" !== a && (a = a.split(","), "YES" == prompt("If you cell lock, you have to RESET your router to take the lock away! If you are sure, type YES  (!UPPERCASE)") && lockcell(a[0], a[1]))
}

function ltebandselection() {
    var a = prompt("Please input LTE bands number, separated by + char (example 1+3+20).If you want to use every supported band, write 'AUTO'.", "AUTO");
    if (null != (a = a && a.toLowerCase()) && "" !== a) {
        var e = a.split("+"),
            n = 0;
        if (all_bands = "0xA3E2AB0908DF", "AUTO" === a.toUpperCase()) n = all_bands;
        else {
            for (var l = 0; l < e.length; l++) n += Math.pow(2, parseInt(e[l]) - 1);
            n = "0x" + n.toString(16)
        }
        $.ajax({
            type: "GET",
            url: "/goform/goform_get_cmd_process",
            data: {
                cmd: "wa_inner_version,cr_version,RD",
                multi_data: "1"
            },
            dataType: "json",
            success: function (a) {
                ad = hex_md5(hex_md5(a.wa_inner_version + a.cr_version) + a.RD), $.ajax({
                    type: "POST",
                    url: "/goform/goform_set_cmd_process",
                    data: {
                        isTest: "false",
                        goformId: "BAND_SELECT",
                        is_gw_band: 0,
                        gw_band_mask: 0,
                        is_lte_band: 1,
                        lte_band_mask: n,
                        AD: ad
                    },
                    success: function (a) {
                        console.log(a)
                    },
                    error: err
                })
            }
        })
    }
}

function nrbandselection() {
    var e, a = (a = prompt("Please input 5G bands number, separated by + char (example 3+78).If you want to use every supported band, write 'AUTO'.", "AUTO")) && a.toLowerCase();
    null != a && "" !== a && (e = a.split("+").join(","), "AUTO" === a.toUpperCase() && (e = "1,2,3,5,7,8,20,28,38,41,50,51,66,70,71,74,75,76,77,78,79,80,81,82,83,84"), $.ajax({
        type: "GET",
        url: "/goform/goform_get_cmd_process",
        data: {
            cmd: "wa_inner_version,cr_version,RD",
            multi_data: "1"
        },
        dataType: "json",
        success: function (a) {
            ad = hex_md5(hex_md5(a.wa_inner_version + a.cr_version) + a.RD), $.ajax({
                type: "POST",
                url: "/goform/goform_set_cmd_process",
                data: {
                    isTest: "false",
                    goformId: "WAN_PERFORM_NR5G_BAND_LOCK",
                    nr5g_band_mask: e,
                    AD: ad
                },
                success: function (a) {
                    console.log(a)
                },
                error: err
            })
        }
    }))
}

function reboot() {
    $.ajax({
        type: "GET",
        url: "/goform/goform_get_cmd_process",
        data: {
            cmd: "wa_inner_version,cr_version,RD",
            multi_data: "1"
        },
        dataType: "json",
        success: function (a) {
            ad = hex_md5(hex_md5(a.wa_inner_version + a.cr_version) + a.RD), $.ajax({
                type: "POST",
                url: "/goform/goform_set_cmd_process",
                data: {
                    isTest: "false",
                    goformId: "REBOOT_DEVICE",
                    AD: ad
                },
                success: function (a) {
                    console.log(a)
                },
                error: err
            })
        }
    })
}

function i1() {
    $.ajax({
        type: "GET",
        url: "/goform/goform_get_cmd_process",
        data: {
            cmd: "hardware_version,web_version,wa_inner_version,cr_version,RD",
            multi_data: "1"
        },
        dataType: "json",
        success: function (a) {
            v = "HW version:" + a.hardware_version + "\nWEB version:" + a.web_version + "\nWA INNER version:" + a.wa_inner_version, alert(v)
        }
    })
}

function i2() {
    if (ca_txt = wan_active_band + " - PCI,EARFCN:" + parseInt(lte_pci, 16) + "," + wan_active_channel, "" != signal.lte_multi_ca_scell_info) {
        ca_v = signal.lte_multi_ca_scell_info.slice(0, -1).split(";");
        for (var a = 0; a < ca_v.length; a++) d = ca_v[a].split(","), b = d[3], e = d[4], p = d[1], ca_txt += "\nB" + b + " - PCI,EARFCN:" + p + "," + e
    }
    ca_txt += "\n\n" + nr5g_action_band + " - PCI:" + parseInt(nr5g_pci, 16) + " - EARFCN:" + nr5g_action_channel, alert(ca_txt)
}

function setdns() {
    var e, a = (a = prompt("Please input 2 dns servers, separated by \",\"  (example 1.1.1.1,1.0.0.1).If you want to use PROVIDER settings, write 'AUTO'.", "AUTO")) && a.toLowerCase();
    null != a && "" !== a && (e = a.split(","), dns_mode = "auto" === a ? "auto" : "manual", $.ajax({
        type: "GET",
        url: "/goform/goform_get_cmd_process",
        data: {
            cmd: "wa_inner_version,cr_version,RD",
            multi_data: "1"
        },
        dataType: "json",
        success: function (a) {
            ad = hex_md5(hex_md5(a.wa_inner_version + a.cr_version) + a.RD), $.ajax({
                type: "POST",
                url: "/goform/goform_set_cmd_process",
                data: {
                    isTest: "false",
                    goformId: "APN_PROC_EX",
                    wan_apn: signal.wan_apn,
                    profile_name: "miononno",
                    apn_action: "save",
                    apn_mode: "manual",
                    pdp_type: "IP",
                    dns_mode: "manual",
                    prefer_dns_manual: e[0],
                    standby_dns_manual: e[1],
                    index: 1,
                    AD: ad
                },
                success: function (a) {
                    $.ajax({
                        type: "GET",
                        url: "/goform/goform_get_cmd_process",
                        data: {
                            cmd: "wa_inner_version,cr_version,RD",
                            multi_data: "1"
                        },
                        dataType: "json",
                        success: function (a) {
                            ad = hex_md5(hex_md5(a.wa_inner_version + a.cr_version) + a.RD), $.ajax({
                                type: "POST",
                                url: "/goform/goform_set_cmd_process",
                                data: {
                                    isTest: "false",
                                    goformId: "APN_PROC_EX",
                                    apn_mode: "manual",
                                    apn_action: "set_default",
                                    set_default_flag: 1,
                                    pdp_type: "IP",
                                    pdp_type_roaming: "IP",
                                    index: 1,
                                    AD: ad
                                },
                                error: err
                            })
                        },
                        error: err
                    })
                },
                error: err
            })
        }
    }))
}

function ftb() {
    $(".color_background_blue").css("background-color", "#456"), $(".headcontainer").hide(), $("body").prepend('<style> .clear {clear: both; } .action{background-color: #448;padding: 10px;border-radius:10px;color: white;font-weight:bolder;margin-right: 5px;margin-left: 5px; } .action:hover{color: white;} li span{margin-left: 5px;} #lte_ca_pcell_bandwidth{margin-left:0;} #lte_rsrq, #lte_rsrp, #lte_rssi, #enbid, #lte_snr, #Z5g_SINR, #cell_id, #lte_ca_pcell_band, #pm_sensor_mdm, #pm_modem_5g, #earfcn_lock, #wan_ipaddr {color: #b00; font-weight: strong; } .f {float: left; border: 1px solid #bbb; border-radius: 5px; padding: 10px; line-height: 2em; margin: 5px; } .f ul {margin: 0; padding: 0; } .f ul li {display: inline; margin-right: 5px;margin-left: 5px; } #network_type {margin-right: 0 !important; } #enbid {font-weight: bold; text-decoration: underline; } .p {border-bottom: 1px solid #ccc; width: auto; height: 20px; } .v {height: 100%25; border-right:1px solid #ccc; } .sb {padding: 10px; border-radius: 10px; display: inline-block; margin: 10px 0 10px 10px; } .v {padding-left: 20px; } </style> <div class="p"> <div class="v" id="nr5rsrpb"></div> </div> <div class="p"> <div class="v" id="rsrpb"></div> </div> <div class="p"> <div class="v" id="rsrqb"></div> </div> <div style="display:block;overflow: auto;"> <div class="f"> <ul> <li>RSRP:<span id="lte_rsrp"></span>dBm</li> <li>RSRQ:<span id="lte_rsrq"></span>dB</li> <li>RSSI:<span id="lte_rssi"></span>dBm</li> <li>SINR:<span id="lte_snr"></span>dB</li> <li>5SINR:<span id="Z5g_SINR"></span>dB</li> </ul> </div> <div class="f"> <ul> <li id="network_type">Che la banda sia con te! Miononno &#9829;</li> </ul> </div> <div class="f"> <ul> <li>ENB ID:<a id="lteitaly" target="lteitaly" href="#"><span id="enbid">#</span></a></li> <li>CELL ID:<span id="cell_id">#</span></li> </ul> </div> <div class="f"> <ul> <li>MAIN:<span id="lte_ca_pcell_band"></span><span id="lte_ca_pcell_bandwidth"></span></li> <li id="ca">CA:<span id="lte_multi_ca_scell_info"></span></li> </ul> </div> <div class="f clear"> <ul> <li><a href="#network_info">Network Info</a></li> <li><a href="#debug_page">Debug</a></li> <li><a href="#voip_setting">V1</a></li> <li><a href="#voip_settings">V2</a></li> <li><a href="#supplement_service">V3</a></li> <li><a href="#voip_advanced_settings">V4</a></li> <li><a href="#ant_switch">A1</a></li> <li><a href="#rf_mmw">A2</a></li> <li><a href="#temp_status">T1</a></li> <li><a href="#thermal_switch">T2</a></li> <li><a href="#bsp_tc_settings">T3</a></li> <li><a href="#wifi_main_chip1">W1</a></li> <li><a href="#wifi_main_chip2">W2</a></li> <li><a href="#wifi_mac_filter">W3</a></li> </ul> </div> <div class="f"> <ul> <li>WAN IP:<span id="wan_ipaddr"></span></li> </ul> </div> <div class="f"> <ul><li>Temp</li> <li>4G:<span id="pm_sensor_mdm"></span>Â°</li> <li>5G:<span id="pm_modem_5g"></span>Â°</li> </ul> </div> <div class="f clear"> <ul> <li><a class="action" onclick="ltebandselection()">SET 4G</a></li> <li><a class="action" onclick="nrbandselection()">SET 5G</a></li> </ul> </div> <div class="f"> <ul> <li><a class="action" onclick="setdns()">DNS&nbsp;MODE</a><span id="dns_mode"></span></li> </ul> </div> <div class="f"> <ul> <li> <a class="action" onclick="i2()">INFO</a> </li> <li> <a class="action" onclick="cslock()">CELL LOCK</a> <span id="earfcn_lock"></span> </li> </ul> </div> <div class="f"> <ul> <li> <a class="action" onclick="reboot()">! REBOOT !</a> </li> </ul> </div> <div class="f"> <ul> <li> <a class="action" onclick="i1()">VER</a> </li> </ul> </div> </div>')
}
signal = "", version = "801-3.0b", $("#txtUserName").attr("maxlength", "100"), console.log("Code by Miononno - v" + version), console.log("type: signal"), window.setInterval(getStatus, 200), $("#change").prop("disabled", !1);