const channelData = [
  {
    title: "BBC One",
    url:
      "https://rakuten-tvshows-1-eu.rakuten.wurl.tv/3000.m3u8",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/01/BBC_One_logo_%28box_variant%29.svg",
    language: "English"
  },
  {
    title: "BBC",
    url:
      "https://d2vnbkvjbims7j.cloudfront.net/containerA/LTN/playlist_4300k.m3u8",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/41/BBC_Logo_2021.svg",
    language: "English"
  },
  {
    title: "Bloomberg TV",
    url:
      "https://liveprodusphoenixeast.akamaized.net/USPhx-HD/Channel-TX-USPhx-AWS-virginia-1/Source-USPhx-16k-1-s6lk2-BP-07-02-81ykIWnsMsg_live.m3u8",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/66/Bloomberg_Television_logo.svg",
    language: "English"
  },
  {
    title: "Cartoon Network SEA",
    url:
      "https://cdn1.skygo.mn/live/disk1/Cartoon_Network/HLS-FTA/Cartoon_Network.m3u8",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/80/Cartoon_Network_2010_logo.svg",
    language: "English"
  },
  {
    title: "Cartoon Network",
    url:
      "https://dmitnthvll.cdn.mangomolo.com/dubaisports/smil:dubaisports.stream.smil/chunklist_b4000000.m3u8",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/80/Cartoon_Network_2010_logo.svg",
    language: "English"
  },
  {
    title: "CNBC",
    url:
      "https://liveprodusphoenixeast.global.ssl.fastly.net/USPhx-HD/Channel-TX-USPhx-AWS-virginia-1/Source-USPhx-16k-1-s6lk2-BP-07-03-0Yn1cQZHOtP_live.m3u8",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e3/CNBC_logo.svg",
    language: "English"
  },
  {
    title: "Dubai Sports 1",
    url:
      "https://dmitnthvll.cdn.mangomolo.com/dubaisports/smil:dubaisports.stream.smil/chunklist_b4000000.m3u8",
    image: "https://bx-tv.com/wp-content/uploads/2021/07/Dubai-Sports1.jpg",
    language: ""
  },
  {
    title: "Fox News",
    url:
      "https://fox-foxnewsnow-samsungus.amagi.tv/playlist720p.m3u8",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/67/Fox_News_Channel_logo.svg",
    language: "English"
  },
  {
    title: "Rakuten TV",
    url:
      "https://rakuten-family-1-eu.rakuten.wurl.tv/3000.m3u8",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e5/Rakuten_TV_logo.svg",
    language: "English"
  },
  {
    title: "MBC 1",
    url:
      "https://d3o3cim6uzorb4.cloudfront.net/out/v1/0965e4d7deae49179172426cbfb3bc5e/index_3.m3u8",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/8d/Mbc1logo_%282%29.png",
    language: "English"
  },
  {
    title: "MYX",
    url:
      "https://myxnola-abscbn-ono.amagi.tv/index.m3u8",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/0f/Myxphlogo.svg",
    language: "English"
  },
  {
    title: "PBS Kids",
    url:
      "https://2-fss-2.streamhoster.com/pl_140/amlst:200914-1298290/chunklist_b2000000.m3u8",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e3/PBS_Kids_logo_%282022%29.svg",
    language: "English"
  },
  {
    title: "Russia Today",
    url:
      "https://rt-glb.rttv.com/dvr/rtnews/playlist_2500Kb.m3u8",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/a0/Russia-today-logo.svg",
    language: ""
  },
  {
    title: "Fox Weather",
    url:
      "https://247wlive.foxweather.com/stream/index_1280x720.m3u8",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b9/Fox_Weather_logo.svg",
    language: "English"
  },
  {
    title: "CBS News",
    url:
      "https://dai.google.com/linear/hls/pa/event/Sid4xiTQTkCT1SLu6rjUSQ/stream/be5b302b-0d25-4da1-b940-9d6614f451ed:BRU/variant/df9d5f9fc8201f0878fd4a77927eea3b/bandwidth/3338376.m3u8",
    image: "https://upload.wikimedia.org/wikipedia/commons/1/19/CBS_News.svg",
    language: "English"
  },
  {
    title: "Newsmax TV",
    url:
      "https://nmxlive.akamaized.net/hls/live/529965/Live_1/index5000.m3u8",
    image: "https://upload.wikimedia.org/wikipedia/commons/8/85/Newsmax_logo.svg",
    language: "English"
  },
  {
    title: "Newsnet",
    url:
      "https://2-fss-2.streamhoster.com/pl_138/amlst:201950-1311088/chunklist_b2000000.m3u8",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/98/NewsNetLogo2022.png",
    language: "English"
  },
  {
    title: "QVC",
    url:
      "https://qvc-amd-live.akamaized.net/hls/live/2034113/lsqvc1uscln/medhigh.m3u8",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/31/QVC_logo_2019.svg",
    language: "English"
  },
  {
    title: "Cheddar News",
    url:
      "https://livestream.chdrstatic.com/b93e5b0d43ea306310a379971e384964acbe4990ce193c0bd50078275a9a657d/cheddar-42620/cheddarweblive/cheddar/primary/2.m3u8",
    image: "https://variety.com/wp-content/uploads/2024/01/Cheddar.png",
    language: "English"
  },
  {
    title: "France 24 English",
    url:
      "https://cdn.klowdtv.net/803B48A/n1.klowdtv.net/live2/france24_720p/chunks.m3u8",
    image: "https://seeklogo.com/images/F/France_24-logo-7B73A4DA96-seeklogo.com.png",
    language: "English"
  },
  {
    title: "Gulli",
    url:
      "https://origin-caf900c010ea8046.live.6cloud.fr/out/v1/c65696b42ca34e97a9b5f54758d6dd50/cmaf/hlsfmp4_short_q2hyb21h_gulli_sd_index_1.m3u8",
    image: "https://static.wikia.nocookie.net/tvfanon6528/images/3/3b/Gulli_%282010-.n.v.%29.png",
    language: ""
  },
  {
    title: "HLN Belgium",
    url:
      "https://dpg-eventstreams.akamaized.net/hlnlivesrt-xmr/streamx/hlnlivesrt_720p.m3u8",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/47/Logo-HLN.svg",
    language: ""
  },
  {
    title: "Hr-Fernsehen",
    url:
      "https://hrhls.akamaized.net/hls/live/2024525/hrhls/master-720p-3200.m3u8",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/53/Hr-fernsehen-logo.svg",
    language: ""
  },
  {
    title: "WDR Fernsehen",
    url:
      "https://wdrfsww247.akamaized.net/hls/live/2009628/wdr_msl4_fs247ww/master_3328.m3u8",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Wdr_fernsehen_logo_2016.svg",
    language: ""
  },
  {
    title: "24 Канал",
    url:
      "https://streamvideol1.luxnet.ua/news24/livenews_1080p/index.m3u8",
    image: "https://upload.wikimedia.org/wikipedia/commons/0/04/24_Kanal_logo.svg",
    language: ""
  },
  {
    title: "Russia 24",
    url:
      "https://vgtrksmotrim.cdnvideo.ru/hls/russia_24/playlist_3.m3u8?md5=PSXO0zYDsNWYIEHD5CDguA&e=1724151186&hls_proxy_host=70b013ca21e8364cd537747cf862272b",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/66/Rossiya-24_Logo.svg",
    language: ""
  },
  {
    title: "Channel 13",
    url:
      "https://d18b0e6mopany4.cloudfront.net/out/v1/08bc71cf0a0f4712b6b03c732b0e6d25/index_3.m3u8",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/cd/New_Logo_13_2022.jpg",
    language: "Israel"
  },
  {
    title: "NBC News",
    url:
      "https://d2gjhy8g9ziabr.cloudfront.net/v1/manifest/3fec3e5cac39a52b2132f9c66c83dae043dc17d4/prod-samsungtvplus-stitched/a881a623-4444-4457-8744-4c5d95a8d9d8/4.m3u8",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9f/NBC_News_2013_logo.png",
    language: "English"
  },
  {
    title: "ABC News",
    url:
      "https://content-aapm1.uplynk.com/channel/3324f2467c414329b3b0cc5cd987b6be/g.m3u8?rays=hjigfedcba&ad.flex=15&ad.access_level=0&expand=drmOff&v=3&ad.adunit=/abc-news/abcnews.com/web/video&ad.vast3=1&ad.vid=$program_id&ad=abcnews_live&ad.pp=datg-live-vdms&ad.v=2&ad.&pbs=4795d4c6aa174cd8aada496a200d05b1",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2a/ABC_News_logo_2021.svg",
    language: "English"
  },
  {
    title: "HLN US",
    url:
      "https://turnerlive.warnermediacdn.com/hls/live/586496/cnngo/hln/VIDEO_0_3564000.m3u8",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4f/HLN_%28TV_network%29_2017_logo.svg",
    language: "English"
  },
  {
    title: "CBC News",
    url:
      "https://lnc-cbc2.tubi.video/master1080P.m3u8",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/29/CBC_News_Logo.svg",
    language: "English"
  },
  {
    title: "FOX Business",
    url:
      "https://stream.livenewspro.com:1936/foxbusiness/foxbusiness//chunklist_w104799145_tkc2VjZW5kdGltZT0xNzI0MjAwNzUwJnNlY2hhc2g9TjAwcHlINVU2SmoyYWRIcEtnQmtJWkx5TE51ZUl0blFCSlhMMzN4WkdVdz0mc2Vjc3RhcnR0aW1lPTE3MjQxMjU3NTA=.m3u8",
    image: "https://upload.wikimedia.org/wikipedia/commons/a/aa/Fox_Business_2017.png",
    language: "English"
  },
  {
    title: "The Weather Channel",
    url:
      "https://livetvde.net/weather/tracks-v1a1/mono.m3u8?token=af4349cee97d4f5cf396d4c4ad93aa557cdd6edf-0d1cd5e25226f33bc6d83fd9495e0283-1724144545-1724133745",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/77/The_Weather_Channel_logo_2005-present.svg",
    language: "English"
  },
  {
    title: "Global News Calgary",
    url:
      "https://live.corusdigitaldev.com/groupd/live/8970c668-40cd-4ca9-8c4d-25fd04f619b5/live.isml/live-audio_1=96000-video=2499968.m3u8",
    image: "https://i1.wp.com/media.globalnews.ca/videostatic/1003/251/GCMN170111_DANIELLE.png",
    language: "English"
  },
  {
    title: "Global News Edmonton",
    url:
      "https://live.corusdigitaldev.com/groupb/live/215422c9-d1b9-4009-aaca-32e403f22b01/live.isml/live-audio_1=96000-video=2499968.m3u8",
    image: "https://i0.wp.com/media.globalnews.ca/videostatic/50/90/5pmNEWS.png",
    language: "English"
  },
  {
    title: "CPAC",
    url:
      "https://cpac-live.cdn.vustreams.com/groupa/live/f9809cea-1e07-47cd-a94d-2ddd3e1351db/live.isml/live-video_track=5400000.m3u8",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2d/2016_CPAC_logo.svg",
    language: "English"
  },
  {
    title: "France 3",
    url:
      "https://livetvde.net/france3/tracks-v1a1/mono.m3u8?token=aebae5a93dd6def346e38dffe3ab5b16d005931e-effd223dbd3d14b2a726a0ce61fb29bf-1724148885-1724138085",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/dd/France_3_2018.svg",
    language: ""
  },
  {
    title: "TF1",
    url:
      "https://livetvde.net/tf1/tracks-v1a1/mono.m3u8?token=b0e504842fd8f4a85706334bf7a38d09a6dd651c-40f2cf9c7887b7fab0e62d587ed22a78-1724148970-1724138170",
    image: "https://companieslogo.com/img/orig/TFI.PA-8c6da426.png",
    language: ""
  },
  {
    title: "Euronews",
    url:
      "https://rakuten-euronews-1-nl.samsung.wurl.tv/32f463ebb125922dd9112b6506d51d94.m3u8",
    image: "https://upload.wikimedia.org/wikipedia/commons/3/39/Euronews._2016_alternative_logo.png",
    language: "English"
  },
  {
    title: "AT5",
    url:
      "https://n1.cdn.jetstre.am/session/4570fe27fa8901d714511626523def43/sz/atvijf/wowza4/live/live/chunklist.m3u8",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/9c/AT5_Logo.png",
    language: ""
  },
  {
    title: "RTL",
    url:
      "https://livetvde.net/rtl/tracks-v1a1/mono.m3u8?token=218155aea7e8ee90bdba7251175264a3aaf3c006-a7b78319d35b3891d22138d9ef8443b7-1724150129-1724139329",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b7/RTL_Logo.svg",
    language: ""
  },
  {
    title: "HSN",
    url:
      "https://qvc-amd-live.akamaized.net/hls/live/2034113/lshsn1us/medhigh.m3u8",
    image: "https://upload.wikimedia.org/wikipedia/commons/c/cb/HSN_logo.svg",
    language: "English"
  },
  {
    title: "NDR Fernsehen",
    url:
      "https://ndrint.akamaized.net/hls/live/2020766/ndr_int/master-1080p-5000.m3u8",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e9/Logo_NDR_Fernsehen_2017.svg",
    language: ""
  },
  {
    title: "WDR Fernsehen",
    url:
      "https://wdrfsww247.akamaized.net/hls/live/2009628/wdr_msl4_fs247ww/master_3328.m3u8",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/b3/Wdr_fernsehen_logo_2016.svg",
    language: ""
  },
  {
    title: "Makan 33",
    url:
      "https://makan.media.kan.org.il/hls/live/2024680/2024680/source1_4k/chunklist.m3u8",
    image: "https://upload.wikimedia.org/wikipedia/en/5/56/MeKan_33_logo_2017.png",
    language: ""
  },
  {
    title: "FOX 11",
    url:
      "https://dcs-live-uw1.mp.lura.live/server/play/vAQozBaC9R1Luz7b/rendition.m3u8?track=video-3&anvsid=m177610536-nf95709b9124b0b55b27ddac75fae19cc&ts=1724144063&anvtrid=988acd1725fa7b39f67193d520d5351c",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6f/Fts-los-angeles-a.svg",
    language: "English"
  },
  {
    title: "24 TV",
    url:
      "https://turkmedya-live.ercdn.net/tv24/tv24_720p.m3u8",
    image: "https://seeklogo.com/images/1/24-tv-logo-33D3C57D1B-seeklogo.com.png",
    language: ""
  },
  {
    title: "MBC Persia",
    url:
      "https://shls-mbcpersia-prod-dub.shahid.net/out/v1/bdc7cd0d990e4c54808632a52c396946/index_1.m3u8",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/24/MBC_Persia.jpg",
    language: ""
  },
  {
    title: "VOA Persian",
    url:
      "https://voa-ingest.akamaized.net/hls/live/2033876/tvmc07/playlist_1080.m3u8",
    image: "https://e7.pngegg.com/pngimages/649/233/png-clipart-logo-voice-of-america-voa-learning-english-voa-persian-organization-blue-note-miscellaneous-blue.png",
    language: ""
  },
  {
    title: "Bloomberg TV Asia",
    url:
      "https://liveprodapnortheast.akamaized.net/ap1/Channel-APTVqvs-AWS-Tokyo-2/Source-APTVqvs-10000-1-swyg20-BP-HD-4-VmYRYIYETkuD_live.m3u8",
    image: "https://bx-tv.com/wp-content/uploads/2021/05/jp-bloomberg.jpg",
    language: ""
  },
  {
    title: "TBN",
    url:
      "https://d7ge95bb03xsu.cloudfront.net/out/v1/0c95a89614194912834019fc37d741ef/tbn-freecast_7.m3u8",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6f/TBN_logo_2015.jpg",
    language: "English"
  },
  {
    title: "Ariana Television Network",
    url:
      "https://d10rltuy0iweup.cloudfront.net/ATNNEWS/myStream/chunklist_w1017714042.m3u8",
    image: "https://static.wikia.nocookie.net/logopedia/images/3/3f/Ariana_television_logo.png",
    language: ""
  },
  {
    title: "AL Horreya TV",
    url:
      "https://5d658d7e9f562.streamlock.net/alhorreya.tv/alhorreya.smil/chunklist_w777707101_b2928000_slar.m3u8",
    image: "https://www.alhorreya.org/images/alhorreya-logo-loading.png",
    language: ""
  },
  {
    title: "Beach TV",
    url:
      "https://5ed325193d4e1.streamlock.net:444/LiveTV/MTVHD/chunklist_w1126852658.m3u8",
    image: "https://www.kindpng.com/picc/m/596-5962389_beach-tv-orange-hd-png-download.png",
    language: "English"
  },
  {
    title: "BR Dachmarke",
    url:
      "https://mcdn.br.de/br/fs/bfs_sued/hls/int/master1080p5000.m3u8",
    image: "https://upload.wikimedia.org/wikipedia/commons/9/98/BR_Dachmarke.svg",
    language: ""
  },
  {
    title: "TRT Belgesel",
    url:
      "https://tv-trtbelgesel.medya.trt.com.tr/master_720.m3u8",
    image: "https://upload.wikimedia.org/wikipedia/commons/b/ba/TRT_Belgesel_kurumsal_logo_%282015-2019%29.png",
    language: ""
  },
  {
    title: "Yle TV",
    url:
      "https://yletvworld.akamaized.net/hls/live/622540/yletv1w/yletv_video1080p50.m3u8",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/6e/Yle_TV1_logo.svg",
    language: ""
  },
  {
    title: "7x Music",
    url:
      "https://stream.e2is.in/hls/7xMusic.m3u8",
    image: "https://jiotvimages.cdn.jio.com/dare_images/shows/700/-/2024-06-09/2406091871016.jpg",
    language: ""
  },
  {
    title: "Horse & Country TV",
    url:
      "https://hnc-free-viewlift.amagi.tv/playlist1080_P.m3u8",
    image: "https://static.wikia.nocookie.net/logopedia/images/3/39/Horse_%26_Country_%282009%29.svg",
    language: "English"
  },
  {
    title: "Buzzr",
    url:
      "https://buzzr-samsungus.amagi.tv/1080p-vtt/index.m3u8",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d6/Buzzr_logo.svg",
    language: "English"
  },
  {
    title: "RMC Découverte",
    url:
      "https://livetvde.net/rmcdeco/tracks-v1a1/mono.m3u8?token=d9951406be36af17648b4d158d3508f506d26685-70760ff994b160daf51e76f3c91e2aba-1724161891-1724151091",
    image: "https://upload.wikimedia.org/wikipedia/fr/b/b3/RMC_D%C3%A9couverte_logo_2017.svg",
    language: ""
  },
  {
    title: "NTV Canada",
    url:
      "https://2-fss-1.streamhoster.com/pl_122/201748-1431018-1/chunklist.m3u8",
    image: "https://ntv.ca/wp-content/uploads/2022/11/home-800x450.jpg",
    language: "English"
  },
  {
    title: "Sharjah Sports",
    url:
      "https://svs.itworkscdn.net/smc4sportslive/smc4.smil/playlist.m3u8",
    image: "https://upload.wikimedia.org/wikipedia/ar/4/4e/%D8%A7%D9%84%D8%B4%D8%A7%D8%B1%D9%82%D8%A9_%D8%A7%D9%84%D8%B1%D9%8A%D8%A7%D8%B6%D9%8A%D8%A9.jpg",
    language: "Arabic"
  },
  {
    title: "Sky News",
    url:
      "https://linear417-gb-hls1-prd-ak.cdn.skycdp.com/100e/Content/HLS_001_1080_30/Live/channel(skynews)/07_1080-30.m3u8",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/de/Sky-news-logo.svg",
    language: "English"
  },
  {
    title: "NBC News Now",
    url:
      "https://dai2.xumo.com/xumocdn/p=roku/amagi_hls_data_xumo1212A-xumo-nbcnewsnow/CDN/playlist.m3u8",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f0/NBC_News_%282023%29.svg",
    language: "English"
  },

  {
    title: "Global News",
    url:
      "https://live.corusdigitaldev.com/groupd/live/49a91e7f-1023-430f-8d66-561055f3d0f7/live.isml/master.m3u8",
    image: "https://upload.wikimedia.org/wikipedia/commons/d/d1/Global_News.svg",
    language: "English"
  },
  {
    title: "ICI RDI",
    url: "https://rcavlive.akamaized.net/hls/live/704025/xcanrdi/master.m3u8",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/ICI_RDI_logo.svg/1920px-ICI_RDI_logo.svg.png",
    language: "English"
  },
  {
    title: "Al Arabiya",
    url:
      "https://live.alarabiya.net/alarabiapublish/alarabiya.smil/alarabiapublish/alarabiya_1080p/chunks.m3u8",
    image: "https://seeklogo.com/images/A/al-arabiya-logo-E8E441B937-seeklogo.com.png",
    language: "Arabic"
  },
  {
    title: "Al Jazeera Arabic",
    url: "https://live-hls-web-aja.getaj.net/alternative/AJA/01.m3u8",
    image: "https://signagelive.com/wp-content/uploads/2024/03/AlJazeera_515-1.png",
    language: "Arabic"
  },
  {
    title: "Al Jazeera English",
    url: "https://live-hls-web-aje-fa.getaj.net/alternative/AJE/01.m3u8",
    image: "https://signagelive.com/wp-content/uploads/2024/03/AlJazeera_515-1.png",
    language: "English"
  },
  {
    title: "AMG TV",
    url:
      "https://2-fss-2.streamhoster.com/pl_138/201660-1270634-1/chunklist.m3u8",
    image: "https://channels-discourse.s3.dualstack.us-east-1.amazonaws.com/original/2X/4/4afc90f6d1da26dda0d8218b273b14bdd73ffcc0.png",
    language: "English"
  },

  {
    title: "Animax",
    url:
      "http://cdns.jp-primehome.com:8000/zhongying/live/playlist.m3u8?cid=bs15",
    image: "https://upload.wikimedia.org/wikipedia/commons/2/2b/Animax_logo.svg",
    language: "English"
  },
  {
    title: "RTV Drenthe",
    url: "https://cdn.rtvdrenthe.nl/live/rtvdrenthe/tv/1080p/prog_index.m3u8",
    image: "https://i.imgur.com/GaGqM4z.png",
    language: "Dutch"
  },

  {
    title: "RTV Utrecht",
    url: "https://media.rtvutrecht.nl/live/rtvutrecht/rtvutrecht/index.m3u8",
    image: "https://i.imgur.com/c0I24N6.png",
    language: "Dutch"
  },
  {
    title: "Omroep Flevoland",
    url:
      "https://d5ms27yy6exnf.cloudfront.net/live/omroepflevoland/tv/index.m3u8",
    image: "https://i.imgur.com/d1CmTcI.png",
    language: "Dutch"
  },
  {
    title: "NH Nieuws",
    url:
      "https://rrr.sz.xlcdn.com/?account=nhnieuws&file=live&type=live&service=wowza&protocol=https&output=playlist.m3u8",
    image: "https://i.imgur.com/SQPVOwn.png",
    language: "Dutch"
  }
];

const channelList = document.querySelector(".channel-list");
channelData.forEach((channel) => {
  const markup = `
    <li class="channel">
      <div class="handle">☰</div>
      <button class="play-channel" title="${channel.title}" data-m3u8="${channel.url}">
        <img class="channel-poster" src="${channel.image}">
      </button>
      <div class="channel-info">
        <a href="#" class="channel-title" data-url="${channel.url}">${channel.title}</a>
        <div class="channel-language">${channel.language}</div>
      </div>
    </li>`;
  channelList.insertAdjacentHTML("beforeend", markup);
});

const video = document.querySelector("#player");
const channelPlays = document.querySelectorAll(".play-channel");
const channelTitles = document.querySelectorAll(".channel-title");
const channels = document.querySelectorAll(".channel");
const nowPlayingTitle = document.querySelector("#channel-playing");

function loadStream(channelPlay) {
  channels.forEach((channel) => {
    channel.dataset.playing = "false";
  });
  const url = channelPlay.dataset.m3u8 || channelPlay.querySelector(".channel-title").dataset.url;
  const parent = channelPlay.closest("li");
  const title = parent.querySelector(".channel-title").textContent;
  parent.dataset.playing = "true";
  if (Hls.isSupported()) {
    const hls = new Hls();
    hls.loadSource(url);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, () => {
      video.play();
      nowPlayingTitle.textContent = title;
      // Scroll to the player when a channel is clicked
      video.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }
}

// Add event listeners for the play buttons
channelPlays.forEach((channelPlay) => {
  channelPlay.addEventListener("click", (e) => {
    loadStream(channelPlay);
  });
});

// Add event listeners for the titles
channelTitles.forEach((channelTitle) => {
  channelTitle.addEventListener("click", (e) => {
    e.preventDefault(); // Prevent default anchor behavior
    const channelPlay = channelTitle.closest(".channel").querySelector(".play-channel");
    loadStream(channelPlay);
  });
});
