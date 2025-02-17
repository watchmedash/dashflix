const channelData = [
  {
    title: "Akaku",
    url:
      "https://s3-us-west-2.amazonaws.com/akaku.castus-vod/live/ch3/video.m3u8",
    image: "https://cdn.akaku.org/Channel55.png",
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
    title: "EBS Kids",
    url:
      "https://ebsonair.ebs.co.kr/ebsufamilypc/familypc1m/chunklist.m3u8",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQRjO5fqVcDmYgsvy_2pfxEWzG_f1LIND3uZg&s",
    language: "English"
  },
  {
    title: "QVC",
    url:
      "https://qvc-amd-live.akamaized.net/hls/live/2034113/lsqvc1uscln/medhigh.m3u8",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/QVC_logo_2019.svg/1200px-QVC_logo_2019.svg.png",
    language: "English"
  },
  {
    title: "3ABN Latino",
    url:
      "https://3abn.bozztv.com/3abn2/Lat_live/smil:Lat_live.smil/chunklist_w643679685_b2328000_slen.m3u8?nimblesessionid=156680343",
    image: "https://www.adventisttv.org/assets/img/main/3ABN_Latino.png",
    language: "Latino"
  },
  {
    title: "3ABN",
    url:
      "https://3abn.bozztv.com/3abn2/3abn_live/smil:3abn_live.smil/chunklist_w424857750_b2628000_slen.m3u8?nimblesessionid=156680337",
    image: "https://3abn.org/img/3abn-ogg.png",
    language: "English"
  },
  {
    title: "3ABN Kids",
    url:
      "https://3abn.bozztv.com/3abn2/Kids_live/smil:Kids_live.smil/chunklist_w634438310_b2328000_slen.m3u8?nimblesessionid=156679208",
    image: "https://3abnkids.tv/img/3ABN-KIDS-LOGO.png",
    language: "English"
  },
  {
    title: "NBC News",
    url:
      "https://d2gjhy8g9ziabr.cloudfront.net/v1/manifest/3fec3e5cac39a52b2132f9c66c83dae043dc17d4/prod-samsungtvplus-stitched/9896e224-f455-466a-908d-62d5be955cc4/4.m3u8",
    image: "https://upload.wikimedia.org/wikipedia/commons/f/f0/NBC_News_%282023%29.svg",
    language: "English"
  },
  {
    title: "MSNBC",
    url:
      "https://livenewsplayer.com:1936/msnbcsd/msnbcsd//chunklist_w96992070_tkc2VjZW5kdGltZT0xNzM5NzgzNDE0JnNlY2hhc2g9OFdscXZsVHFGQVZJZ241eVZ5QUZzakUzUUJqdzhDdHdfTjBicnZZRnYwQT0mc2Vjc3RhcnR0aW1lPTE3Mzk3NzI2MTQ=.m3u8",
    image: "https://media-cldnry.s-nbcnews.com/image/upload/newsgroup-logos/msnbc/logo-vertical/default-black-498x404.png",
    language: "English"
  },
  {
    title: "The Weather Channel",
    url:
      "https://livenewsplayer.com:1936/weathersd/weathersd//chunklist_w786740579_tkc2VjZW5kdGltZT0xNzM5ODQ3OTIzJnNlY2hhc2g9OTFiVkczM1AzY215X2ZBSndhZF95M2txb1ZZRmZ5WjE0YnBhMThnNUhVUT0mc2Vjc3RhcnR0aW1lPTE3Mzk3NzI5MjM=.m3u8",
    image: "https://upload.wikimedia.org/wikipedia/commons/7/77/The_Weather_Channel_logo_2005-present.svg",
    language: "English"
  },
  {
    title: "Sky News Australia",
    url:
      "https://skynewsau-live.akamaized.net/hls/live/2002691/skynewsau-extra3/master_576p.m3u8",
    image: "https://content.api.news/v3/images/bin/5b4fdbc3df286aa953bcc0b3a0df5c38",
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
    title: "CNBC",
    url:
      "https://liveprodusphoenixeast.global.ssl.fastly.net/USPhx-HD/Channel-TX-USPhx-AWS-virginia-1/Source-USPhx-16k-1-s6lk2-BP-07-03-0Yn1cQZHOtP_live.m3u8",
    image: "https://upload.wikimedia.org/wikipedia/commons/e/e3/CNBC_logo.svg",
    language: "English"
  },
  {
    title: "Fox News",
    url:
      "https://fox-foxnewsnow-samsungus.amagi.tv/playlist720p.m3u8",
    image: "https://upload.wikimedia.org/wikipedia/commons/6/67/Fox_News_Channel_logo.svg",
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
      "https://ott.studentsdemo.com/stream/phcathenatv/myxph/master.m3u8?u=phc&p=34110cccc727d627ffe67a3750390af2993c1fd2acea793a0758167fc5f38430",
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
    title: "HLN US",
    url:
      "https://turnerlive.warnermediacdn.com/hls/live/586496/cnngo/hln/VIDEO_0_3564000.m3u8",
    image: "https://upload.wikimedia.org/wikipedia/commons/4/4f/HLN_%28TV_network%29_2017_logo.svg",
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
    image: "https://bx-tv.com/wp-content/uploads/2022/11/7x-music-Punjabi.jpg",
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
  },
  {
    title: "UAAP Varsity Channel",
    url:
      "https://ott.studentsdemo.com/stream/phcathenatv/uaapvarsitychannel/master.m3u8?u=phc&p=34110cccc727d627ffe67a3750390af2993c1fd2acea793a0758167fc5f38430",
    image: "https://i.imgur.com/pSLEHMa.png",
    language: "English"
  },
  {
    title: "UNTV",
    url:
      "https://ott.studentsdemo.com/stream/phcathenatv/untv/master.m3u8?u=phc&p=34110cccc727d627ffe67a3750390af2993c1fd2acea793a0758167fc5f38430",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/9/99/UNTV-Logo-2016.svg/300px-UNTV-Logo-2016.svg.png",
    language: "English"
  },
  {
    title: "tvN Movies Pinoy",
    url:
      "https://ott.studentsdemo.com/stream/phcathenatv/tvnmoviespinoy/master.m3u8?u=phc&p=34110cccc727d627ffe67a3750390af2993c1fd2acea793a0758167fc5f38430",
    image: "https://i.imgur.com/9fKNEHY.png",
    language: "English"
  },
  {
    title: "TV5",
    url:
      "https://ott.studentsdemo.com/stream/phcathenatv/tv5/master.m3u8?u=phc&p=34110cccc727d627ffe67a3750390af2993c1fd2acea793a0758167fc5f38430",
    image: "https://i.imgur.com/jsCBRq0.png",
    language: "English"
  },
  {
    title: "TV Maria",
    url:
      "https://ott.studentsdemo.com/stream/phcathenatv/tvmaria/master.m3u8?u=phc&p=34110cccc727d627ffe67a3750390af2993c1fd2acea793a0758167fc5f38430",
    image: "https://static.wikia.nocookie.net/logopedia/images/c/cd/TV_MARIA_PH.png/revision/latest?cb=20200421061144",
    language: "English"
  },
  {
    title: "True FM TV",
    url:
      "https://ott.studentsdemo.com/stream/phcathenatv/truefmtv/master.m3u8?u=phc&p=34110cccc727d627ffe67a3750390af2993c1fd2acea793a0758167fc5f38430",
    image: "https://static.wikia.nocookie.net/logopedia/images/a/a0/TRUETV_Logo_2024.png",
    language: "English"
  },
  {
    title: "TMC",
    url:
      "https://ott.studentsdemo.com/stream/phcathenatv/tmc/master.m3u8?u=phc&p=34110cccc727d627ffe67a3750390af2993c1fd2acea793a0758167fc5f38430",
    image: "https://i.imgur.com/2k0yRUd.png",
    language: "English"
  },
  {
    title: "Teleradyo Serbisyo SD",
    url:
      "https://ott.studentsdemo.com/stream/phcathenatv/teleradyoserbisyosd/master.m3u8?u=phc&p=34110cccc727d627ffe67a3750390af2993c1fd2acea793a0758167fc5f38430",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2e/TeleRadyo_Serbisyo_logo.svg/500px-TeleRadyo_Serbisyo_logo.svg.png",
    language: "English"
  },
  {
    title: "Teleradyo Serbisyo HD",
    url:
      "https://ott.studentsdemo.com/stream/phcathenatv/teleradyoserbisyohd/master.m3u8?u=phc&p=34110cccc727d627ffe67a3750390af2993c1fd2acea793a0758167fc5f38430",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/2/2e/TeleRadyo_Serbisyo_logo.svg/500px-TeleRadyo_Serbisyo_logo.svg.png",
    language: "English"
  },
  {
    title: "SMNI",
    url:
      "https://ott.studentsdemo.com/stream/phcathenatv/smni/master.m3u8?u=phc&p=34110cccc727d627ffe67a3750390af2993c1fd2acea793a0758167fc5f38430",
    image: "https://upload.wikimedia.org/wikipedia/en/d/df/SMNI39.jpg",
    language: "English"
  },
  {
    title: "Setanta Sports",
    url:
      "https://ott.studentsdemo.com/stream/phcathenatv/setantasports/master.m3u8?u=phc&p=34110cccc727d627ffe67a3750390af2993c1fd2acea793a0758167fc5f38430",
    image: "https://upload.wikimedia.org/wikipedia/commons/5/5d/Setanta-logo.jpg",
    language: "English"
  },
  {
    title: "RPTV",
    url:
      "https://ott.studentsdemo.com/stream/phcathenatv/rptv/master.m3u8?u=phc&p=34110cccc727d627ffe67a3750390af2993c1fd2acea793a0758167fc5f38430",
    image: "https://i.imgur.com/IDCHfXm.png",
    language: "English"
  },
  {
    title: "PTV",
    url:
      "https://ott.studentsdemo.com/stream/phcathenatv/ptv/master.m3u8?u=phc&p=34110cccc727d627ffe67a3750390af2993c1fd2acea793a0758167fc5f38430",
    image: "https://i.imgur.com/plyCuAw.png",
    language: "English"
  },
  {
    title: "PBO",
    url:
      "https://ott.studentsdemo.com/stream/phcathenatv/pbo/master.m3u8?u=phc&p=34110cccc727d627ffe67a3750390af2993c1fd2acea793a0758167fc5f38430",
    image: "https://i.imgur.com/oOMAyoX.png",
    language: "English"
  },
  {
    title: "PBA Rush",
    url:
      "https://ott.studentsdemo.com/stream/phcathenatv/pbarush/master.m3u8?u=phc&p=34110cccc727d627ffe67a3750390af2993c1fd2acea793a0758167fc5f38430",
    image: "https://i.imgur.com/tvxCVRr.png",
    language: "English"
  },
  {
    title: "One Sports +",
    url:
      "https://ott.studentsdemo.com/stream/phcathenatv/onesports-1/master.m3u8?u=phc&p=34110cccc727d627ffe67a3750390af2993c1fd2acea793a0758167fc5f38430",
    image: "https://i.imgur.com/nFLt8cN.png",
    language: "English"
  },
  {
    title: "One Sports",
    url:
      "https://ott.studentsdemo.com/stream/phcathenatv/onesports/master.m3u8?u=phc&p=34110cccc727d627ffe67a3750390af2993c1fd2acea793a0758167fc5f38430",
    image: "https://i.imgur.com/RrBWZ16.png",
    language: "English"
  },
  {
    title: "One PH",
    url:
      "https://ott.studentsdemo.com/stream/phcathenatv/oneph/master.m3u8?u=phc&p=34110cccc727d627ffe67a3750390af2993c1fd2acea793a0758167fc5f38430",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/c/c6/OnePHCignal.svg/300px-OnePHCignal.svg.png",
    language: "English"
  },
  {
    title: "One News",
    url:
      "https://ott.studentsdemo.com/stream/phcathenatv/onenews/master.m3u8?u=phc&p=34110cccc727d627ffe67a3750390af2993c1fd2acea793a0758167fc5f38430",
    image: "https://i.imgur.com/flKo7E5.png",
    language: "English"
  },
  {
    title: "NET25",
    url:
      "https://ott.studentsdemo.com/stream/phcathenatv/net25/master.m3u8?u=phc&p=34110cccc727d627ffe67a3750390af2993c1fd2acea793a0758167fc5f38430",
    image: "https://static.wikia.nocookie.net/russel/images/9/9d/Net_25_Logo_2021.png",
    language: "English"
  },
  {
    title: "NBA TV Philippines",
    url:
      "https://ott.studentsdemo.com/stream/phcathenatv/nbatvphilippines/master.m3u8?u=phc&p=34110cccc727d627ffe67a3750390af2993c1fd2acea793a0758167fc5f38430",
    image: "https://i.imgur.com/g5Q35IH.png",
    language: "English"
  },
  {
    title: "Metro Channel",
    url:
      "https://ott.studentsdemo.com/stream/phcathenatv/metrochannel/master.m3u8?u=phc&p=34110cccc727d627ffe67a3750390af2993c1fd2acea793a0758167fc5f38430",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Metro_Channel_logo.png/300px-Metro_Channel_logo.png",
    language: "English"
  },
  {
    title: "MPTV",
    url:
      "https://ott.studentsdemo.com/stream/phcathenatv/mptv/master.m3u8?u=phc&p=34110cccc727d627ffe67a3750390af2993c1fd2acea793a0758167fc5f38430",
    image: "https://i.imgur.com/gomDxSz.png",
    language: "English"
  },
  {
    title: "Knowledge Channel",
    url:
      "https://ott.studentsdemo.com/stream/phcathenatv/knowledgechannel/master.m3u8?u=phc&p=34110cccc727d627ffe67a3750390af2993c1fd2acea793a0758167fc5f38430",
    image: "https://static.wikia.nocookie.net/logopedia/images/9/9b/Knowledge-Channel.png",
    language: "English"
  },
  {
    title: "Kapamilya Channel",
    url:
      "https://ott.studentsdemo.com/stream/phcathenatv/kapamilyachannel/master.m3u8?u=phc&p=34110cccc727d627ffe67a3750390af2993c1fd2acea793a0758167fc5f38430",
    image: "https://i.imgur.com/POt9KB8.png",
    language: "English"
  },
  {
    title: "Jeepney TV",
    url:
      "https://ott.studentsdemo.com/stream/phcathenatv/jeepneytv/master.m3u8?u=phc&p=34110cccc727d627ffe67a3750390af2993c1fd2acea793a0758167fc5f38430",
    image: "https://upload.wikimedia.org/wikipedia/en/thumb/1/15/Jeepney_TV_Logo_2015.svg/300px-Jeepney_TV_Logo_2015.svg.png",
    language: "English"
  },
  {
    title: "INC TV",
    url:
      "https://ott.studentsdemo.com/stream/phcathenatv/inctv/master.m3u8?u=phc&p=34110cccc727d627ffe67a3750390af2993c1fd2acea793a0758167fc5f38430",
    image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/INCTV_Logo_With_Shadow.webp/300px-INCTV_Logo_With_Shadow.webp.png",
    language: "English"
  },
  {
    title: "IBC13",
    url:
      "https://ott.studentsdemo.com/stream/phcathenatv/ibc13/master.m3u8?u=phc&p=34110cccc727d627ffe67a3750390af2993c1fd2acea793a0758167fc5f38430",
    image: "https://static.wikia.nocookie.net/signons-and-signoffs/images/4/45/IBC_13_Logo.png",
    language: "English"
  },
  {
    title: "GTV",
    url:
      "https://ott.studentsdemo.com/stream/phcathenatv/gtv/master.m3u8?u=phc&p=34110cccc727d627ffe67a3750390af2993c1fd2acea793a0758167fc5f38430",
    image: "https://i.imgur.com/geuq18u.png",
    language: "English"
  },
  {
    title: "GMA",
    url:
      "https://ott.studentsdemo.com/stream/phcathenatv/gma/master.m3u8?u=phc&p=34110cccc727d627ffe67a3750390af2993c1fd2acea793a0758167fc5f38430",
    image: "https://i.imgur.com/Cu1tAY8.png",
    language: "English"
  },
  {
    title: "DZRH TV",
    url:
      "https://ott.studentsdemo.com/stream/phcathenatv/dzrhtv/master.m3u8?u=phc&p=34110cccc727d627ffe67a3750390af2993c1fd2acea793a0758167fc5f38430",
    image: "https://upload.wikimedia.org/wikipedia/en/9/99/DZRH_logo_2021.png",
    language: "English"
  },
  {
    title: "CLTV 36",
    url:
      "https://ott.studentsdemo.com/stream/phcathenatv/cltv36/master.m3u8?u=phc&p=34110cccc727d627ffe67a3750390af2993c1fd2acea793a0758167fc5f38430",
    image: "https://upload.wikimedia.org/wikipedia/en/b/ba/CLTV-36_Logo.jpeg",
    language: "English"
  },
  {
    title: "Cinemo",
    url:
      "https://ott.studentsdemo.com/stream/phcathenatv/cinemo/master.m3u8?u=phc&p=34110cccc727d627ffe67a3750390af2993c1fd2acea793a0758167fc5f38430",
    image: "https://i.imgur.com/4xDiXMP.png",
    language: "English"
  },
  {
    title: "Cinema One",
    url:
      "https://ott.studentsdemo.com/stream/phcathenatv/cinemaone/master.m3u8?u=phc&p=34110cccc727d627ffe67a3750390af2993c1fd2acea793a0758167fc5f38430",
    image: "https://i.imgur.com/hJ6MBiA.png",
    language: "English"
  },
  {
    title: "Buko",
    url:
      "https://ott.studentsdemo.com/stream/phcathenatv/buko/master.m3u8?u=phc&p=34110cccc727d627ffe67a3750390af2993c1fd2acea793a0758167fc5f38430",
    image: "https://i.imgur.com/c740k3p.png",
    language: "English"
  },
  {
    title: "Blast Sports",
    url:
      "https://ott.studentsdemo.com/stream/phcathenatv/blastsports/master.m3u8?u=phc&p=34110cccc727d627ffe67a3750390af2993c1fd2acea793a0758167fc5f38430",
    image: "https://i.imgur.com/XxHlcBN.png",
    language: "English"
  },
  {
    title: "Billonaryo News Channel",
    url:
      "https://ott.studentsdemo.com/stream/phcathenatv/billonaryonewschannel/master.m3u8?u=phc&p=34110cccc727d627ffe67a3750390af2993c1fd2acea793a0758167fc5f38430",
    image: "https://static.wikia.nocookie.net/russel/images/a/a8/Bilyonaryo_News_Channel_Logo_2024.png",
    language: "English"
  },
  {
    title: "Viva Cinema",
    url:
      "https://ott.studentsdemo.com/stream/phcathenatv/vivacinema/master.m3u8?u=phc&p=34110cccc727d627ffe67a3750390af2993c1fd2acea793a0758167fc5f38430",
    image: "https://i.imgur.com/5jn4U88.png",
    language: "English"
  },
  {
    title: "A2Z",
    url:
      "https://ott.studentsdemo.com/stream/phcathenatv/a2z/master.m3u8?u=phc&p=34110cccc727d627ffe67a3750390af2993c1fd2acea793a0758167fc5f38430",
    image: "https://i.imgur.com/3myn4zH.png",
    language: "English"
  },
  {
    title: "ALIW TV",
    url:
      "https://ott.studentsdemo.com/stream/phcathenatv/aliwtv/master.m3u8?u=phc&p=34110cccc727d627ffe67a3750390af2993c1fd2acea793a0758167fc5f38430",
    image: "https://alcgroup.com.ph/wp-content/uploads/2024/10/Aliw-Channel-23-e1729733268662-768x252.png",
    language: "English"
  },
  {
    title: "ALL TV",
    url:
      "https://ott.studentsdemo.com/stream/phcathenatv/alltv/master.m3u8?u=phc&p=34110cccc727d627ffe67a3750390af2993c1fd2acea793a0758167fc5f38430",
    image: "https://brandlogo.org/wp-content/uploads/2024/05/All-TV-Logo-300x300.png.webp",
    language: "English"
  },
  {
    title: "ANC PH",
    url:
      "https://ott.studentsdemo.com/stream/phcathenatv/ancph/master.m3u8?u=phc&p=34110cccc727d627ffe67a3750390af2993c1fd2acea793a0758167fc5f38430",
    image: "https://static.wikia.nocookie.net/russel/images/4/4c/ANC_Logo_2015.png",
    language: "English"
  },
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
