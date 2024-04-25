export const DataPacket = [
  {
    tripMapId: 682,
    tripDate: '2024-04-23',
    basicInfo: {
      routeNumber: 112,
      routeName: 'Peera garhi chowk - Sohna road gurugram',
      busNumber: 'DL1CAH0454-FMB920',
      driverName: 'Neel',
      tripTime: '10:00:00 - 12:00:00',
      vendorName: 'Test1',
      noOfBookings: 1,
      totalBookingAmountOfTrip: '0',
      onTime: null,
      onTimeBoolean: false
    },
    routeDetails: {
      routeId: 1,
      routeNumber: 112,
      startingPoint: 'Peera garhi chowk',
      startingPointLatitude: '28.679550000000000000000000000000',
      startingPointLongitude: '77.094597000000000000000000000000',
      endPoint: 'Sohna road gurugram',
      endPointLatitude: '28.402572000000000000000000000000',
      endPointLongitude: '77.044502000000000000000000000000',
      totalDistance: '55.000',
      routeFixedRate: 1,
      routeBasePrice: 60,
      routeBasePriceAdhoc: 65,
      perKmRoutePrice: '1.500',
      maxRouteFare: 100
    },
    tripDetails: {
      tripId: 1,
      tripStartTime: '10:00:00',
      tripEndTime: '12:00:00',
      tripRunningDays: ['0', '1', '2', '4', '5', '6']
    },
    busDetails: {
      busId: 1,
      busNumber: 'DL1CAH0454-FMB920',
      busCapacity: 30,
      busCategory: 'tempo traveller',
      fuelType: 'Petrol',
      femaleBus: 0,
      busDocuments: null,
      busIsAc: null,
      busRegistrationDate: '1970-01-01'
    },
    driverDetails: {
      driverName: 'Neel',
      driverAddress: 'xyz',
      driverContact: '8920432940',
      driverDocument: {
        driverImage: 'http://13.200.168.251:3000/app/v1/aws/getImage/driverimages/1708681128448_salman.png'
      },
      driverEmergencyContact: null
    },
    stopsWithoutBooking: [
      {
        stopName: 'Radisson blu paschim vihar',
        stopEta: '00:10:00',
        stopLat: '28.665500000000000000000000000000',
        stopLng: '77.092450000000000000000000000000'
      },
      {
        stopName: 'District center',
        stopEta: '00:15:00',
        stopLat: '28.632780000000000000000000000000',
        stopLng: '77.081420000000000000000000000000'
      },
      {
        stopName: 'Janakpuri East Metro Station',
        stopEta: '00:22:00',
        stopLat: '28.633375550000000000000000000000',
        stopLng: '77.086430000000000000000000000000'
      },
      {
        stopName: 'Prem Nagar',
        stopEta: '00:30:00',
        stopLat: '28.635674000000000000000000000000',
        stopLng: '77.097055000000000000000000000000'
      },
      {
        stopName: 'The BBQ Industry',
        stopEta: '00:40:00',
        stopLat: '28.625580000000000000000000000000',
        stopLng: '77.101430000000000000000000000000'
      },
      {
        stopName: 'Cantonment Hospital, Delhi Cantt',
        stopEta: '00:55:00',
        stopLat: '28.602329000000000000000000000000',
        stopLng: '77.126148000000000000000000000000'
      },
      {
        stopName: 'Rajiv Chowk, Gurugram',
        stopEta: '01:30:00',
        stopLat: '28.446860000000000000000000000000',
        stopLng: '77.037360000000000000000000000000'
      },
      {
        stopName: 'Central Park II, Gurugram',
        stopEta: '01:45:00',
        stopLat: '28.429045000000000000000000000000',
        stopLng: '77.037085000000000000000000000000'
      },
      {
        stopName: 'Space Edge Tower 1, Gurugram',
        stopEta: '01:55:00',
        stopLat: '28.419514000000000000000000000000',
        stopLng: '77.040034000000000000000000000000'
      },
      {
        stopName: 'Uppal Southend, Gurugram',
        stopEta: '02:10:00',
        stopLat: '28.409691000000000000000000000000',
        stopLng: '77.042909000000000000000000000000'
      }
    ],
    stopsWithBooking: [
      {
        stopName: 'Iffco Metro Station',
        stopStatus: 1,
        stopID: null,
        stopLat: '28.472431510861890000000000000000',
        stopLong: '77.070912409549800000000000000000',
        seats: 35,
        distanceMeter: 0,
        eta: '09:30:31',
        checkForEta: 'Tue Apr 23 2024 03:57:15 GMT+0000 (Coordinated Universal Time)',
        stopReachTime: '09:29:55',
        onBoardingArr: [],
        offBoardingArr: [],
        onBoardingNumber: 0,
        offBoardingNumber: 0,
        _id: '66273807deb23684b8bfefcd'
      },
      {
        stopName: 'DLF Cyber Park',
        stopStatus: 1,
        stopID: null,
        stopLat: '28.501921497017590000000000000000',
        stopLong: '77.091700922193610000000000000000',
        seats: 35,
        distanceMeter: 2,
        eta: '09:44:13',
        checkForEta: 'Tue Apr 23 2024 04:00:00 GMT+0000 (Coordinated Universal Time)',
        stopReachTime: '09:44:55',
        onBoardingArr: [],
        offBoardingArr: [],
        onBoardingNumber: 0,
        offBoardingNumber: 0,
        _id: '66273807deb23684b8bfefce'
      },
      {
        stopName: 'Ambiance Mall',
        stopStatus: 1,
        stopID: null,
        stopLat: '28.505493457698430000000000000000',
        stopLong: '77.095122189969710000000000000000',
        seats: 35,
        distanceMeter: 2,
        eta: '09:49:10',
        checkForEta: 'Tue Apr 23 2024 04:15:00 GMT+0000 (Coordinated Universal Time)',
        stopReachTime: '09:46:25',
        onBoardingArr: [],
        offBoardingArr: [],
        onBoardingNumber: 0,
        offBoardingNumber: 0,
        _id: '66273807deb23684b8bfefcf'
      },
      {
        stopName: 'DLF Downtown Gurugram',
        stopStatus: 1,
        stopID: null,
        stopLat: '28.503179078044200000000000000000',
        stopLong: '77.093517959701370000000000000000',
        seats: 35,
        distanceMeter: 0,
        eta: '09:50:10',
        checkForEta: '',
        stopReachTime: '09:46:30',
        onBoardingArr: [],
        offBoardingArr: [],
        onBoardingNumber: 0,
        offBoardingNumber: 0,
        _id: '66273807deb23684b8bfefd0'
      },
      {
        stopName: 'Cyber Hub',
        stopStatus: 1,
        stopID: null,
        stopLat: '28.496998087403316000000000000000',
        stopLong: '77.091310212033300000000000000000',
        seats: 35,
        distanceMeter: 2,
        eta: '10:03:45',
        checkForEta: 'Tue Apr 23 2024 04:16:35 GMT+0000 (Coordinated Universal Time)',
        stopReachTime: '10:03:10',
        onBoardingArr: [],
        offBoardingArr: [],
        onBoardingNumber: 0,
        offBoardingNumber: 0,
        _id: '66273807deb23684b8bfefd1'
      },
      {
        stopName: 'Building No. 9A/9B',
        stopStatus: 1,
        stopID: null,
        stopLat: '28.495896151139615000000000000000',
        stopLong: '77.092804566889630000000000000000',
        seats: 35,
        distanceMeter: 0,
        eta: '10:05:45',
        checkForEta: 'Tue Apr 23 2024 04:33:15 GMT+0000 (Coordinated Universal Time)',
        stopReachTime: '10:03:40',
        onBoardingArr: [],
        offBoardingArr: [],
        onBoardingNumber: 0,
        offBoardingNumber: 0,
        _id: '66273807deb23684b8bfefd2'
      },
      {
        stopName: 'Cyber Green / 7A',
        stopStatus: 1,
        stopID: null,
        stopLat: '28.493519497661854000000000000000',
        stopLong: '77.092070255064070000000000000000',
        seats: 35,
        distanceMeter: 0,
        eta: '10:06:45',
        checkForEta: 'Tue Apr 23 2024 04:33:45 GMT+0000 (Coordinated Universal Time)',
        stopReachTime: '10:04:25',
        onBoardingArr: [],
        offBoardingArr: [],
        onBoardingNumber: 0,
        offBoardingNumber: 0,
        _id: '66273807deb23684b8bfefd3'
      },
      {
        stopName: 'Building No. 5 Cyber city',
        stopStatus: 1,
        stopID: null,
        stopLat: '28.488822605250277000000000000000',
        stopLong: '77.091397548171780000000000000000',
        seats: 35,
        distanceMeter: 0,
        eta: '10:10:45',
        checkForEta: 'Tue Apr 23 2024 04:34:30 GMT+0000 (Coordinated Universal Time)',
        stopReachTime: '10:05:30',
        onBoardingArr: [],
        offBoardingArr: [],
        onBoardingNumber: 0,
        offBoardingNumber: 0,
        _id: '66273807deb23684b8bfefd4'
      },
      {
        stopName: 'Bulding No.10 Back Side',
        stopStatus: 1,
        stopID: null,
        stopLat: '28.491779926052512000000000000000',
        stopLong: '77.088110017789000000000000000000',
        seats: 35,
        distanceMeter: 1,
        eta: '10:11:54',
        checkForEta: 'Tue Apr 23 2024 04:35:35 GMT+0000 (Coordinated Universal Time)',
        stopReachTime: '10:11:50',
        onBoardingArr: [],
        offBoardingArr: [],
        onBoardingNumber: 0,
        offBoardingNumber: 0,
        _id: '66273807deb23684b8bfefd5'
      },
      {
        stopName: 'DLF square/Nestle',
        stopStatus: 1,
        stopID: null,
        stopLat: '28.492311092763536000000000000000',
        stopLong: '77.083826318019930000000000000000',
        seats: 34,
        distanceMeter: 1,
        eta: '10:19:49',
        checkForEta: 'Tue Apr 23 2024 04:41:55 GMT+0000 (Coordinated Universal Time)',
        stopReachTime: '10:19:41',
        onBoardingArr: [
          {
            userName: 'Prakhar',
            userId: 25,
            totalSeats: 1
          }
        ],
        offBoardingArr: [],
        onBoardingNumber: 1,
        offBoardingNumber: 0,
        _id: '66273807deb23684b8bfefd6'
      },
      {
        stopName: 'AVL 36 Gurgaon',
        stopStatus: 1,
        stopID: null,
        stopLat: '28.412783874620093000000000000000',
        stopLong: '76.978805783459580000000000000000',
        seats: 34,
        distanceMeter: 2,
        eta: '10:39:45',
        checkForEta: 'Tue Apr 23 2024 04:49:45 GMT+0000 (Coordinated Universal Time)',
        stopReachTime: '10:39:50',
        onBoardingArr: [],
        offBoardingArr: [],
        onBoardingNumber: 0,
        offBoardingNumber: 0,
        _id: '66273807deb23684b8bfefd7'
      },
      {
        stopName: 'DLF New town Heights Sec 86 (G to K Tower)',
        stopStatus: 1,
        stopID: null,
        stopLat: '28.403191739236973000000000000000',
        stopLong: '76.937743959933780000000000000000',
        seats: 34,
        distanceMeter: 2,
        eta: '10:47:43',
        checkForEta: 'Tue Apr 23 2024 05:09:55 GMT+0000 (Coordinated Universal Time)',
        stopReachTime: '10:47:07',
        onBoardingArr: [],
        offBoardingArr: [],
        onBoardingNumber: 0,
        offBoardingNumber: 0,
        _id: '66273807deb23684b8bfefd8'
      },
      {
        stopName: 'DLF New town Heights Sec 86 (A to F Tower)',
        stopStatus: 1,
        stopID: null,
        stopLat: '28.401774065097715000000000000000',
        stopLong: '76.934899662880770000000000000000',
        seats: 34,
        distanceMeter: 0,
        eta: '10:48:43',
        checkForEta: 'Tue Apr 23 2024 05:17:10 GMT+0000 (Coordinated Universal Time)',
        stopReachTime: '10:48:00',
        onBoardingArr: [],
        offBoardingArr: [],
        onBoardingNumber: 0,
        offBoardingNumber: 0,
        _id: '66273807deb23684b8bfefd9'
      },
      {
        stopName: 'Sector 90 Regal Club',
        stopStatus: 1,
        stopID: null,
        stopLat: '28.407765919339436000000000000000',
        stopLong: '76.934038939189020000000000000000',
        seats: 34,
        distanceMeter: 2,
        eta: '10:53:27',
        checkForEta: 'Tue Apr 23 2024 05:18:07 GMT+0000 (Coordinated Universal Time)',
        stopReachTime: '10:52:45',
        onBoardingArr: [],
        offBoardingArr: [],
        onBoardingNumber: 0,
        offBoardingNumber: 0,
        _id: '66273807deb23684b8bfefda'
      },
      {
        stopName: 'DLF New town Heights 90(K Towers)',
        stopStatus: 1,
        stopID: null,
        stopLat: '28.407121410654320000000000000000',
        stopLong: '76.932708803046610000000000000000',
        seats: 34,
        distanceMeter: 0,
        eta: '10:55:27',
        checkForEta: 'Tue Apr 23 2024 05:22:50 GMT+0000 (Coordinated Universal Time)',
        stopReachTime: '10:53:10',
        onBoardingArr: [],
        offBoardingArr: [],
        onBoardingNumber: 0,
        offBoardingNumber: 0,
        _id: '66273807deb23684b8bfefdb'
      },
      {
        stopName: 'DLF New town Heights 90(A to L Towers)',
        stopStatus: 1,
        stopID: null,
        stopLat: '28.406447492329598000000000000000',
        stopLong: '76.931062149343600000000000000000',
        seats: 34,
        distanceMeter: 0,
        eta: '10:56:27',
        checkForEta: 'Tue Apr 23 2024 05:23:15 GMT+0000 (Coordinated Universal Time)',
        stopReachTime: '10:53:40',
        onBoardingArr: [],
        offBoardingArr: [],
        onBoardingNumber: 0,
        offBoardingNumber: 0,
        _id: '66273807deb23684b8bfefdc'
      },
      {
        stopName: 'DLF New town Heights 90(MN Complex)',
        stopStatus: 1,
        stopID: null,
        stopLat: '28.406423185355596000000000000000',
        stopLong: '76.930981090527780000000000000000',
        seats: 34,
        distanceMeter: 0,
        eta: '10:57:27',
        checkForEta: '',
        stopReachTime: '10:53:45',
        onBoardingArr: [],
        offBoardingArr: [],
        onBoardingNumber: 0,
        offBoardingNumber: 0,
        _id: '66273807deb23684b8bfefdd'
      },
      {
        stopName: 'SPAZE PRIVVY',
        stopStatus: 1,
        stopID: null,
        stopLat: '28.414298364399800000000000000000',
        stopLong: '76.934549852000840000000000000000',
        seats: 35,
        distanceMeter: 2,
        eta: '10:57:32',
        checkForEta: 'Tue Apr 23 2024 05:23:50 GMT+0000 (Coordinated Universal Time)',
        stopReachTime: '10:56:40',
        onBoardingArr: [],
        offBoardingArr: [
          {
            userName: 'Prakhar',
            userId: 25,
            totalSeats: 1
          }
        ],
        onBoardingNumber: 0,
        offBoardingNumber: 1,
        _id: '66273807deb23684b8bfefde'
      }
    ]
  },
  {
    tripMapId: 689,
    tripDate: '2024-04-23',
    basicInfo: {
      routeNumber: 16,
      routeName: 'Iffco Metro Station - SPAZE PRIVVY',
      busNumber: '134546',
      driverName: 'Amit kumar test',
      tripTime: '17:00:00 - 18:43:00',
      vendorName: 'Aftab Alam',
      noOfBookings: 4,
      totalBookingAmountOfTrip: '29600',
      onTime: null,
      onTimeBoolean: false
    },
    routeDetails: {
      routeId: 19,
      routeNumber: 16,
      startingPoint: 'Iffco Metro Station',
      startingPointLatitude: '28.472431510861890000000000000000',
      startingPointLongitude: '77.070912409549800000000000000000',
      endPoint: 'SPAZE PRIVVY',
      endPointLatitude: '28.414298364399800000000000000000',
      endPointLongitude: '76.934549852000840000000000000000',
      totalDistance: '37.950',
      routeFixedRate: 0,
      routeBasePrice: 18,
      routeBasePriceAdhoc: 65,
      perKmRoutePrice: '2.000',
      maxRouteFare: 250
    },
    tripDetails: {
      tripId: 17,
      tripStartTime: '17:00:00',
      tripEndTime: '18:43:00',
      tripRunningDays: ['1', '2', '3', '4', '5']
    },
    busDetails: {
      busId: 37,
      busNumber: '134546',
      busCapacity: 35,
      busCategory: 'passenger',
      fuelType: 'Electric',
      femaleBus: 0,
      busDocuments: {
        regCert: 'http://13.200.168.251:3000/app/v1/aws/getImage/driverimages/1713761265308_hashMap.png',
        fitnessCert: 'http://13.200.168.251:3000/app/v1/aws/getImage/driverimages/1713761284640_Screenshot_2024-04-18_102641.png',
        insuranceCert: 'http://13.200.168.251:3000/app/v1/aws/getImage/driverimages/1713761269134_hashMap.png',
        pollutionCert: 'http://13.200.168.251:3000/app/v1/aws/getImage/driverimages/1713761272212_images.jpg',
        carriagePermitCert: 'http://13.200.168.251:3000/app/v1/aws/getImage/driverimages/1713761280199_Screenshot_2024-04-04_180300.png',
        touriestPermitCert: 'http://13.200.168.251:3000/app/v1/aws/getImage/driverimages/1713761276578_Screenshot_2024-04-18_102448.png'
      },
      busIsAc: 0,
      busRegistrationDate: '2024-04-10'
    },
    driverDetails: {
      driverName: 'Amit kumar test',
      driverAddress: 'Noida sector 52',
      driverContact: '6478391292',
      driverDocument: {
        dl: 'http://13.200.168.251:3000/app/v1/aws/getImage/driverimages/1713508313452_imagScreen.png',
        pcc: 'http://13.200.168.251:3000/app/v1/aws/getImage/driverimages/1713508292184_hashMap.png',
        resume: 'http://13.200.168.251:3000/app/v1/aws/getImage/driverimages/1713508317897_Screenshot_2024-02-07_112647.png',
        profile: 'http://13.200.168.251:3000/app/v1/aws/getImage/driverimages/1713508233004_images.jpg',
        aadharBack: 'http://13.200.168.251:3000/app/v1/aws/getImage/driverimages/1713508288104_Screenshot_2024-02-07_112647.png',
        aadharfront: 'http://13.200.168.251:3000/app/v1/aws/getImage/driverimages/1713508282346_Screenshot_2024-04-18_102416.png',
        curr_address: 'http://13.200.168.251:3000/app/v1/aws/getImage/driverimages/1713508248521_Screenshot_2024-02-22_104720.png',
        permanent_address: 'http://13.200.168.251:3000/app/v1/aws/getImage/driverimages/1713508268788_hashMap.png'
      },
      driverEmergencyContact: '5648724382'
    },
    stopsWithoutBooking: [
      {
        stopName: 'DLF Cyber Park',
        stopEta: '00:15:00',
        stopLat: '28.501921497017590000000000000000',
        stopLng: '77.091700922193610000000000000000'
      },
      {
        stopName: 'Ambiance Mall',
        stopEta: '00:22:00',
        stopLat: '28.505493457698430000000000000000',
        stopLng: '77.095122189969710000000000000000'
      },
      {
        stopName: 'DLF Downtown Gurugram',
        stopEta: '00:23:00',
        stopLat: '28.503179078044200000000000000000',
        stopLng: '77.093517959701370000000000000000'
      },
      {
        stopName: 'Cyber Hub',
        stopEta: '00:26:00',
        stopLat: '28.496998087403316000000000000000',
        stopLng: '77.091310212033300000000000000000'
      },
      {
        stopName: 'Building No. 9A/9B',
        stopEta: '00:28:00',
        stopLat: '28.495896151139615000000000000000',
        stopLng: '77.092804566889630000000000000000'
      },
      {
        stopName: 'Cyber Green / 7A',
        stopEta: '00:29:00',
        stopLat: '28.493519497661854000000000000000',
        stopLng: '77.092070255064070000000000000000'
      },
      {
        stopName: 'Building No. 5 Cyber city',
        stopEta: '00:33:00',
        stopLat: '28.488822605250277000000000000000',
        stopLng: '77.091397548171780000000000000000'
      },
      {
        stopName: 'Bulding No.10 Back Side',
        stopEta: '00:42:00',
        stopLat: '28.491779926052512000000000000000',
        stopLng: '77.088110017789000000000000000000'
      },
      {
        stopName: 'DLF square/Nestle',
        stopEta: '00:44:00',
        stopLat: '28.492311092763536000000000000000',
        stopLng: '77.083826318019930000000000000000'
      },
      {
        stopName: 'AVL 36 Gurgaon',
        stopEta: '01:19:00',
        stopLat: '28.412783874620093000000000000000',
        stopLng: '76.978805783459580000000000000000'
      },
      {
        stopName: 'DLF New town Heights Sec 86 (G to K Tower)',
        stopEta: '01:30:00',
        stopLat: '28.403191739236973000000000000000',
        stopLng: '76.937743959933780000000000000000'
      },
      {
        stopName: 'DLF New town Heights Sec 86 (A to F Tower)',
        stopEta: '01:31:00',
        stopLat: '28.401774065097715000000000000000',
        stopLng: '76.934899662880770000000000000000'
      },
      {
        stopName: 'Sector 90 Regal Club',
        stopEta: '01:37:00',
        stopLat: '28.407765919339436000000000000000',
        stopLng: '76.934038939189020000000000000000'
      },
      {
        stopName: 'DLF New town Heights 90(K Towers)',
        stopEta: '01:39:00',
        stopLat: '28.407121410654320000000000000000',
        stopLng: '76.932708803046610000000000000000'
      },
      {
        stopName: 'DLF New town Heights 90(A to L Towers)',
        stopEta: '01:40:00',
        stopLat: '28.406447492329598000000000000000',
        stopLng: '76.931062149343600000000000000000'
      },
      {
        stopName: 'DLF New town Heights 90(MN Complex)',
        stopEta: '01:41:00',
        stopLat: '28.406423185355596000000000000000',
        stopLng: '76.930981090527780000000000000000'
      }
    ],
    stopsWithBooking: [
      {
        stopName: 'Iffco Metro Station',
        stopStatus: 0,
        stopID: null,
        stopLat: '28.472431510861890000000000000000',
        stopLong: '77.070912409549800000000000000000',
        seats: 33,
        distanceMeter: 0,
        eta: '20:17:55',
        checkForEta: 'Tue Apr 23 2024 14:17:21 GMT+0000 (Coordinated Universal Time)',
        stopReachTime: '',
        onBoardingArr: [
          {
            userName: 'Mohit Kaushik ',
            userId: 14,
            totalSeats: 2
          }
        ],
        offBoardingArr: [],
        onBoardingNumber: 2,
        offBoardingNumber: 0,
        _id: '6627bc49279c1a434049d047'
      },
      {
        stopName: 'DLF Cyber Park',
        stopStatus: 0,
        stopID: null,
        stopLat: '28.501921497017590000000000000000',
        stopLong: '77.091700922193610000000000000000',
        seats: 33,
        distanceMeter: 0,
        eta: '20:32:55',
        checkForEta: '',
        stopReachTime: '',
        onBoardingArr: [],
        offBoardingArr: [],
        onBoardingNumber: 0,
        offBoardingNumber: 0,
        _id: '6627bc49279c1a434049d048'
      },
      {
        stopName: 'Ambiance Mall',
        stopStatus: 0,
        stopID: null,
        stopLat: '28.505493457698430000000000000000',
        stopLong: '77.095122189969710000000000000000',
        seats: 33,
        distanceMeter: 0,
        eta: '20:39:55',
        checkForEta: '',
        stopReachTime: '',
        onBoardingArr: [],
        offBoardingArr: [],
        onBoardingNumber: 0,
        offBoardingNumber: 0,
        _id: '6627bc49279c1a434049d049'
      },
      {
        stopName: 'DLF Downtown Gurugram',
        stopStatus: 0,
        stopID: null,
        stopLat: '28.503179078044200000000000000000',
        stopLong: '77.093517959701370000000000000000',
        seats: 33,
        distanceMeter: 0,
        eta: '20:40:55',
        checkForEta: '',
        stopReachTime: '',
        onBoardingArr: [],
        offBoardingArr: [],
        onBoardingNumber: 0,
        offBoardingNumber: 0,
        _id: '6627bc49279c1a434049d04a'
      },
      {
        stopName: 'Cyber Hub',
        stopStatus: 0,
        stopID: null,
        stopLat: '28.496998087403316000000000000000',
        stopLong: '77.091310212033300000000000000000',
        seats: 33,
        distanceMeter: 0,
        eta: '20:43:55',
        checkForEta: '',
        stopReachTime: '',
        onBoardingArr: [],
        offBoardingArr: [],
        onBoardingNumber: 0,
        offBoardingNumber: 0,
        _id: '6627bc49279c1a434049d04b'
      },
      {
        stopName: 'Building No. 9A/9B',
        stopStatus: 0,
        stopID: null,
        stopLat: '28.495896151139615000000000000000',
        stopLong: '77.092804566889630000000000000000',
        seats: 33,
        distanceMeter: 0,
        eta: '20:45:55',
        checkForEta: '',
        stopReachTime: '',
        onBoardingArr: [],
        offBoardingArr: [],
        onBoardingNumber: 0,
        offBoardingNumber: 0,
        _id: '6627bc49279c1a434049d04c'
      },
      {
        stopName: 'Cyber Green / 7A',
        stopStatus: 0,
        stopID: null,
        stopLat: '28.493519497661854000000000000000',
        stopLong: '77.092070255064070000000000000000',
        seats: 33,
        distanceMeter: 0,
        eta: '20:46:55',
        checkForEta: '',
        stopReachTime: '',
        onBoardingArr: [],
        offBoardingArr: [],
        onBoardingNumber: 0,
        offBoardingNumber: 0,
        _id: '6627bc49279c1a434049d04d'
      },
      {
        stopName: 'Building No. 5 Cyber city',
        stopStatus: 0,
        stopID: null,
        stopLat: '28.488822605250277000000000000000',
        stopLong: '77.091397548171780000000000000000',
        seats: 33,
        distanceMeter: 0,
        eta: '20:50:55',
        checkForEta: '',
        stopReachTime: '',
        onBoardingArr: [],
        offBoardingArr: [],
        onBoardingNumber: 0,
        offBoardingNumber: 0,
        _id: '6627bc49279c1a434049d04e'
      },
      {
        stopName: 'Bulding No.10 Back Side',
        stopStatus: 0,
        stopID: null,
        stopLat: '28.491779926052512000000000000000',
        stopLong: '77.088110017789000000000000000000',
        seats: 31,
        distanceMeter: 0,
        eta: '20:59:55',
        checkForEta: '',
        stopReachTime: '',
        onBoardingArr: [
          {
            userName: 'Mohit Kaushik ',
            userId: 14,
            totalSeats: 1
          },
          {
            userName: 'Mohit Kaushik ',
            userId: 58,
            totalSeats: 1
          }
        ],
        offBoardingArr: [],
        onBoardingNumber: 2,
        offBoardingNumber: 0,
        _id: '6627bc49279c1a434049d04f'
      },
      {
        stopName: 'DLF square/Nestle',
        stopStatus: 0,
        stopID: null,
        stopLat: '28.492311092763536000000000000000',
        stopLong: '77.083826318019930000000000000000',
        seats: 31,
        distanceMeter: 0,
        eta: '21:01:55',
        checkForEta: '',
        stopReachTime: '',
        onBoardingArr: [],
        offBoardingArr: [],
        onBoardingNumber: 0,
        offBoardingNumber: 0,
        _id: '6627bc49279c1a434049d050'
      },
      {
        stopName: 'AVL 36 Gurgaon',
        stopStatus: 0,
        stopID: null,
        stopLat: '28.412783874620093000000000000000',
        stopLong: '76.978805783459580000000000000000',
        seats: 31,
        distanceMeter: 0,
        eta: '21:36:55',
        checkForEta: '',
        stopReachTime: '',
        onBoardingArr: [],
        offBoardingArr: [],
        onBoardingNumber: 0,
        offBoardingNumber: 0,
        _id: '6627bc49279c1a434049d051'
      },
      {
        stopName: 'DLF New town Heights Sec 86 (G to K Tower)',
        stopStatus: 0,
        stopID: null,
        stopLat: '28.403191739236973000000000000000',
        stopLong: '76.937743959933780000000000000000',
        seats: 33,
        distanceMeter: 0,
        eta: '21:47:55',
        checkForEta: '',
        stopReachTime: '',
        onBoardingArr: [],
        offBoardingArr: [
          {
            userName: 'Mohit Kaushik ',
            userId: 14,
            totalSeats: 1
          },
          {
            userName: 'Mohit Kaushik ',
            userId: 58,
            totalSeats: 1
          }
        ],
        onBoardingNumber: 0,
        offBoardingNumber: 2,
        _id: '6627bc49279c1a434049d052'
      },
      {
        stopName: 'DLF New town Heights Sec 86 (A to F Tower)',
        stopStatus: 0,
        stopID: null,
        stopLat: '28.401774065097715000000000000000',
        stopLong: '76.934899662880770000000000000000',
        seats: 35,
        distanceMeter: 0,
        eta: '21:48:55',
        checkForEta: '',
        stopReachTime: '',
        onBoardingArr: [],
        offBoardingArr: [
          {
            userName: 'Mohit Kaushik ',
            userId: 14,
            totalSeats: 2
          }
        ],
        onBoardingNumber: 0,
        offBoardingNumber: 2,
        _id: '6627bc49279c1a434049d053'
      },
      {
        stopName: 'Sector 90 Regal Club',
        stopStatus: 0,
        stopID: null,
        stopLat: '28.407765919339436000000000000000',
        stopLong: '76.934038939189020000000000000000',
        seats: 35,
        distanceMeter: 0,
        eta: '21:54:55',
        checkForEta: '',
        stopReachTime: '',
        onBoardingArr: [],
        offBoardingArr: [],
        onBoardingNumber: 0,
        offBoardingNumber: 0,
        _id: '6627bc49279c1a434049d054'
      },
      {
        stopName: 'DLF New town Heights 90(K Towers)',
        stopStatus: 0,
        stopID: null,
        stopLat: '28.407121410654320000000000000000',
        stopLong: '76.932708803046610000000000000000',
        seats: 35,
        distanceMeter: 0,
        eta: '21:56:55',
        checkForEta: '',
        stopReachTime: '',
        onBoardingArr: [],
        offBoardingArr: [],
        onBoardingNumber: 0,
        offBoardingNumber: 0,
        _id: '6627bc49279c1a434049d055'
      },
      {
        stopName: 'DLF New town Heights 90(A to L Towers)',
        stopStatus: 0,
        stopID: null,
        stopLat: '28.406447492329598000000000000000',
        stopLong: '76.931062149343600000000000000000',
        seats: 35,
        distanceMeter: 0,
        eta: '21:57:55',
        checkForEta: '',
        stopReachTime: '',
        onBoardingArr: [],
        offBoardingArr: [],
        onBoardingNumber: 0,
        offBoardingNumber: 0,
        _id: '6627bc49279c1a434049d056'
      },
      {
        stopName: 'DLF New town Heights 90(MN Complex)',
        stopStatus: 0,
        stopID: null,
        stopLat: '28.406423185355596000000000000000',
        stopLong: '76.930981090527780000000000000000',
        seats: 35,
        distanceMeter: 0,
        eta: '21:58:55',
        checkForEta: '',
        stopReachTime: '',
        onBoardingArr: [],
        offBoardingArr: [],
        onBoardingNumber: 0,
        offBoardingNumber: 0,
        _id: '6627bc49279c1a434049d057'
      },
      {
        stopName: 'SPAZE PRIVVY',
        stopStatus: 0,
        stopID: null,
        stopLat: '28.414298364399800000000000000000',
        stopLong: '76.934549852000840000000000000000',
        seats: 35,
        distanceMeter: 0,
        eta: '22:00:55',
        checkForEta: '',
        stopReachTime: '',
        onBoardingArr: [],
        offBoardingArr: [],
        onBoardingNumber: 0,
        offBoardingNumber: 0,
        _id: '6627bc49279c1a434049d058'
      }
    ]
  },
  {
    tripMapId: 694,
    tripDate: '2024-04-23',
    basicInfo: {
      routeNumber: 14,
      routeName: 'Ambiance Mall - Raheja Atharva Sector 109 Gurugram',
      busNumber: 'HR26ER9765',
      driverName: 'Ravi',
      tripTime: '17:45:00 - 19:11:00',
      vendorName: 'Aaveg',
      noOfBookings: 5,
      totalBookingAmountOfTrip: '0',
      onTime: null,
      onTimeBoolean: false
    },
    routeDetails: {
      routeId: 17,
      routeNumber: 14,
      startingPoint: 'Ambiance Mall',
      startingPointLatitude: '28.505493457698430000000000000000',
      startingPointLongitude: '77.095122189969710000000000000000',
      endPoint: 'Raheja Atharva Sector 109 Gurugram',
      endPointLatitude: '28.509584564288968000000000000000',
      endPointLongitude: '77.005637242950800000000000000000',
      totalDistance: '24.200',
      routeFixedRate: 0,
      routeBasePrice: 60,
      routeBasePriceAdhoc: 65,
      perKmRoutePrice: '1.700',
      maxRouteFare: 125
    },
    tripDetails: {
      tripId: 20,
      tripStartTime: '17:45:00',
      tripEndTime: '19:11:00',
      tripRunningDays: ['1', '2', '3', '4', '5']
    },
    busDetails: {
      busId: 38,
      busNumber: 'HR26ER9765',
      busCapacity: 35,
      busCategory: 'EV BUS',
      fuelType: 'Electric',
      femaleBus: 0,
      busDocuments: {
        regCert: 'http://13.200.168.251:3000/app/v1/aws/getImage/driverimages/1711532740340_images.jpg',
        fitnessCert: 'http://13.200.168.251:3000/app/v1/aws/getImage/driverimages/1711532824412_imagScreen.png',
        insuranceCert: 'http://13.200.168.251:3000/app/v1/aws/getImage/driverimages/1711532757793_images.jpg',
        pollutionCert: 'http://13.200.168.251:3000/app/v1/aws/getImage/driverimages/1711532768585_images.jpg',
        carriagePermitCert: 'http://13.200.168.251:3000/app/v1/aws/getImage/driverimages/1711532811590_imagScreen.png',
        touriestPermitCert: 'http://13.200.168.251:3000/app/v1/aws/getImage/driverimages/1711532789188_imagScreen.png'
      },
      busIsAc: 1,
      busRegistrationDate: '2024-03-29'
    },
    driverDetails: {
      driverName: 'Ravi',
      driverAddress: 'dwarka sec 21',
      driverContact: '8802251148',
      driverDocument: {
        adhar: 'http://13.200.168.251:3000/app/v1/aws/getImage/driverimages/1708665067651_driver2.png',
        voterId: 'adjjj'
      },
      driverEmergencyContact: '8802251148'
    },
    stopsWithoutBooking: [
      {
        stopName: 'DLF Downtown Gurugram',
        stopEta: '00:01:00',
        stopLat: '28.503179078044200000000000000000',
        stopLng: '77.093517959701370000000000000000'
      },
      {
        stopName: 'Cyber Hub',
        stopEta: '00:05:00',
        stopLat: '28.496998087403316000000000000000',
        stopLng: '77.091310212033300000000000000000'
      },
      {
        stopName: 'Building No. 9A/9B',
        stopEta: '00:06:00',
        stopLat: '28.495896151139615000000000000000',
        stopLng: '77.092804566889630000000000000000'
      },
      {
        stopName: 'Cyber Green /7A',
        stopEta: '00:08:00',
        stopLat: '28.493519497661854000000000000000',
        stopLng: '77.092070255064070000000000000000'
      },
      {
        stopName: 'Building No. 5 Cyber city',
        stopEta: '00:10:00',
        stopLat: '28.488822605250277000000000000000',
        stopLng: '77.091397548171780000000000000000'
      },
      {
        stopName: 'Bulding No.10 Back Side',
        stopEta: '00:17:00',
        stopLat: '28.491779926052512000000000000000',
        stopLng: '77.088110017789000000000000000000'
      },
      {
        stopName: 'DLF Cyber Park',
        stopEta: '00:22:00',
        stopLat: '28.502164681863103000000000000000',
        stopLng: '77.089717702369130000000000000000'
      },
      {
        stopName: 'Candor Tech Space/ Infotech Centre',
        stopEta: '00:28:00',
        stopLat: '28.510429382635280000000000000000',
        stopLng: '77.074030976434220000000000000000'
      },
      {
        stopName: 'Mahindra Aura',
        stopEta: '00:58:00',
        stopLat: '28.512491427565180000000000000000',
        stopLng: '77.025410456005470000000000000000'
      },
      {
        stopName: 'India Bulls Enigma',
        stopEta: '01:04:00',
        stopLat: '28.501812636675393000000000000000',
        stopLng: '77.009948703928970000000000000000'
      },
      {
        stopName: 'Sobha City main road',
        stopEta: '01:10:00',
        stopLat: '28.515509430356970000000000000000',
        stopLng: '76.996475343628380000000000000000'
      },
      {
        stopName: 'Sobha International City',
        stopEta: '01:13:00',
        stopLat: '28.513567410713133000000000000000',
        stopLng: '76.996526150029600000000000000000'
      },
      {
        stopName: 'ATS Kocoon 1',
        stopEta: '01:15:00',
        stopLat: '28.508635203876768000000000000000',
        stopLng: '77.001193350528500000000000000000'
      },
      {
        stopName: 'ATS Kocoon & Caladium',
        stopEta: '01:17:00',
        stopLat: '28.508252377727930000000000000000',
        stopLng: '77.003607040548590000000000000000'
      },
      {
        stopName: 'International City/ Euro interantional school',
        stopEta: '01:19:00',
        stopLat: '28.509878679821384000000000000000',
        stopLng: '77.003967286722950000000000000000'
      },
      {
        stopName: 'Chintel Paradiso',
        stopEta: '01:20:00',
        stopLat: '28.510969144200953000000000000000',
        stopLng: '77.002697966230510000000000000000'
      },
      {
        stopName: 'ATS Tourmaline',
        stopEta: '01:21:00',
        stopLat: '28.514943177665010000000000000000',
        stopLng: '77.003319159272960000000000000000'
      },
      {
        stopName: 'Chintels Serenity',
        stopEta: '01:22:00',
        stopLat: '28.514205123700340000000000000000',
        stopLng: '77.004438601832500000000000000000'
      },
      {
        stopName: 'Brisk Lumbini',
        stopEta: '01:24:00',
        stopLat: '28.513026006645667000000000000000',
        stopLng: '77.006216721068970000000000000000'
      }
    ],
    stopsWithBooking: [
      {
        stopName: 'Ambiance Mall',
        stopStatus: 0,
        stopID: null,
        stopLat: '28.505493457698430000000000000000',
        stopLong: '77.095122189969710000000000000000',
        seats: 33,
        distanceMeter: 0,
        eta: '22:19:36',
        checkForEta: 'Tue Apr 23 2024 16:29:22 GMT+0000 (Coordinated Universal Time)',
        stopReachTime: '',
        onBoardingArr: [
          {
            userName: 'Prakhar',
            userId: 25,
            totalSeats: 2
          }
        ],
        offBoardingArr: [],
        onBoardingNumber: 2,
        offBoardingNumber: 0,
        _id: '66275a15deb23684b8c35831'
      },
      {
        stopName: 'DLF Downtown Gurugram',
        stopStatus: 0,
        stopID: null,
        stopLat: '28.503179078044200000000000000000',
        stopLong: '77.093517959701370000000000000000',
        seats: 32,
        distanceMeter: 0,
        eta: '22:20:36',
        checkForEta: '',
        stopReachTime: '',
        onBoardingArr: [
          {
            userName: 'Prakhar',
            userId: 25,
            totalSeats: 1
          }
        ],
        offBoardingArr: [],
        onBoardingNumber: 1,
        offBoardingNumber: 0,
        _id: '66275a15deb23684b8c35832'
      },
      {
        stopName: 'Cyber Hub',
        stopStatus: 0,
        stopID: null,
        stopLat: '28.496998087403316000000000000000',
        stopLong: '77.091310212033300000000000000000',
        seats: 30,
        distanceMeter: 0,
        eta: '22:24:36',
        checkForEta: '',
        stopReachTime: '',
        onBoardingArr: [
          {
            userName: 'Prakhar',
            userId: 25,
            totalSeats: 2
          }
        ],
        offBoardingArr: [],
        onBoardingNumber: 2,
        offBoardingNumber: 0,
        _id: '66275a15deb23684b8c35833'
      },
      {
        stopName: 'Building No. 9A/9B',
        stopStatus: 0,
        stopID: null,
        stopLat: '28.495896151139615000000000000000',
        stopLong: '77.092804566889630000000000000000',
        seats: 30,
        distanceMeter: 0,
        eta: '22:25:36',
        checkForEta: '',
        stopReachTime: '',
        onBoardingArr: [],
        offBoardingArr: [],
        onBoardingNumber: 0,
        offBoardingNumber: 0,
        _id: '66275a15deb23684b8c35834'
      },
      {
        stopName: 'Cyber Green /7A',
        stopStatus: 0,
        stopID: null,
        stopLat: '28.493519497661854000000000000000',
        stopLong: '77.092070255064070000000000000000',
        seats: 30,
        distanceMeter: 0,
        eta: '22:27:36',
        checkForEta: '',
        stopReachTime: '',
        onBoardingArr: [],
        offBoardingArr: [],
        onBoardingNumber: 0,
        offBoardingNumber: 0,
        _id: '66275a15deb23684b8c35835'
      },
      {
        stopName: 'Building No. 5 Cyber city',
        stopStatus: 0,
        stopID: null,
        stopLat: '28.488822605250277000000000000000',
        stopLong: '77.091397548171780000000000000000',
        seats: 30,
        distanceMeter: 0,
        eta: '22:29:36',
        checkForEta: '',
        stopReachTime: '',
        onBoardingArr: [],
        offBoardingArr: [],
        onBoardingNumber: 0,
        offBoardingNumber: 0,
        _id: '66275a15deb23684b8c35836'
      },
      {
        stopName: 'Bulding No.10 Back Side',
        stopStatus: 0,
        stopID: null,
        stopLat: '28.491779926052512000000000000000',
        stopLong: '77.088110017789000000000000000000',
        seats: 30,
        distanceMeter: 0,
        eta: '22:36:36',
        checkForEta: '',
        stopReachTime: '',
        onBoardingArr: [],
        offBoardingArr: [],
        onBoardingNumber: 0,
        offBoardingNumber: 0,
        _id: '66275a15deb23684b8c35837'
      },
      {
        stopName: 'DLF Cyber Park',
        stopStatus: 0,
        stopID: null,
        stopLat: '28.502164681863103000000000000000',
        stopLong: '77.089717702369130000000000000000',
        seats: 30,
        distanceMeter: 0,
        eta: '22:41:36',
        checkForEta: '',
        stopReachTime: '',
        onBoardingArr: [],
        offBoardingArr: [],
        onBoardingNumber: 0,
        offBoardingNumber: 0,
        _id: '66275a15deb23684b8c35838'
      },
      {
        stopName: 'Candor Tech Space/ Infotech Centre',
        stopStatus: 0,
        stopID: null,
        stopLat: '28.510429382635280000000000000000',
        stopLong: '77.074030976434220000000000000000',
        seats: 30,
        distanceMeter: 0,
        eta: '22:47:36',
        checkForEta: '',
        stopReachTime: '',
        onBoardingArr: [],
        offBoardingArr: [],
        onBoardingNumber: 0,
        offBoardingNumber: 0,
        _id: '66275a15deb23684b8c35839'
      },
      {
        stopName: 'Mahindra Aura',
        stopStatus: 0,
        stopID: null,
        stopLat: '28.512491427565180000000000000000',
        stopLong: '77.025410456005470000000000000000',
        seats: 30,
        distanceMeter: 0,
        eta: '23:17:36',
        checkForEta: '',
        stopReachTime: '',
        onBoardingArr: [],
        offBoardingArr: [],
        onBoardingNumber: 0,
        offBoardingNumber: 0,
        _id: '66275a15deb23684b8c3583a'
      },
      {
        stopName: 'India Bulls Enigma',
        stopStatus: 0,
        stopID: null,
        stopLat: '28.501812636675393000000000000000',
        stopLong: '77.009948703928970000000000000000',
        seats: 31,
        distanceMeter: 0,
        eta: '23:23:36',
        checkForEta: '',
        stopReachTime: '',
        onBoardingArr: [],
        offBoardingArr: [
          {
            userName: 'Prakhar',
            userId: 25,
            totalSeats: 1
          }
        ],
        onBoardingNumber: 0,
        offBoardingNumber: 1,
        _id: '66275a15deb23684b8c3583b'
      },
      {
        stopName: 'Sobha City main road',
        stopStatus: 0,
        stopID: null,
        stopLat: '28.515509430356970000000000000000',
        stopLong: '76.996475343628380000000000000000',
        seats: 31,
        distanceMeter: 0,
        eta: '23:29:36',
        checkForEta: '',
        stopReachTime: '',
        onBoardingArr: [],
        offBoardingArr: [],
        onBoardingNumber: 0,
        offBoardingNumber: 0,
        _id: '66275a15deb23684b8c3583c'
      },
      {
        stopName: 'Sobha International City',
        stopStatus: 0,
        stopID: null,
        stopLat: '28.513567410713133000000000000000',
        stopLong: '76.996526150029600000000000000000',
        seats: 31,
        distanceMeter: 0,
        eta: '23:32:36',
        checkForEta: '',
        stopReachTime: '',
        onBoardingArr: [],
        offBoardingArr: [],
        onBoardingNumber: 0,
        offBoardingNumber: 0,
        _id: '66275a15deb23684b8c3583d'
      },
      {
        stopName: 'ATS Kocoon 1',
        stopStatus: 0,
        stopID: null,
        stopLat: '28.508635203876768000000000000000',
        stopLong: '77.001193350528500000000000000000',
        seats: 31,
        distanceMeter: 0,
        eta: '23:34:36',
        checkForEta: '',
        stopReachTime: '',
        onBoardingArr: [],
        offBoardingArr: [],
        onBoardingNumber: 0,
        offBoardingNumber: 0,
        _id: '66275a15deb23684b8c3583e'
      },
      {
        stopName: 'ATS Kocoon & Caladium',
        stopStatus: 0,
        stopID: null,
        stopLat: '28.508252377727930000000000000000',
        stopLong: '77.003607040548590000000000000000',
        seats: 31,
        distanceMeter: 0,
        eta: '23:36:36',
        checkForEta: '',
        stopReachTime: '',
        onBoardingArr: [],
        offBoardingArr: [],
        onBoardingNumber: 0,
        offBoardingNumber: 0,
        _id: '66275a15deb23684b8c3583f'
      },
      {
        stopName: 'International City/ Euro interantional school',
        stopStatus: 0,
        stopID: null,
        stopLat: '28.509878679821384000000000000000',
        stopLong: '77.003967286722950000000000000000',
        seats: 31,
        distanceMeter: 0,
        eta: '23:38:36',
        checkForEta: '',
        stopReachTime: '',
        onBoardingArr: [],
        offBoardingArr: [],
        onBoardingNumber: 0,
        offBoardingNumber: 0,
        _id: '66275a15deb23684b8c35840'
      },
      {
        stopName: 'Chintel Paradiso',
        stopStatus: 0,
        stopID: null,
        stopLat: '28.510969144200953000000000000000',
        stopLong: '77.002697966230510000000000000000',
        seats: 31,
        distanceMeter: 0,
        eta: '23:39:36',
        checkForEta: '',
        stopReachTime: '',
        onBoardingArr: [],
        offBoardingArr: [],
        onBoardingNumber: 0,
        offBoardingNumber: 0,
        _id: '66275a15deb23684b8c35841'
      },
      {
        stopName: 'ATS Tourmaline',
        stopStatus: 0,
        stopID: null,
        stopLat: '28.514943177665010000000000000000',
        stopLong: '77.003319159272960000000000000000',
        seats: 31,
        distanceMeter: 0,
        eta: '23:40:36',
        checkForEta: '',
        stopReachTime: '',
        onBoardingArr: [],
        offBoardingArr: [],
        onBoardingNumber: 0,
        offBoardingNumber: 0,
        _id: '66275a15deb23684b8c35842'
      },
      {
        stopName: 'Chintels Serenity',
        stopStatus: 0,
        stopID: null,
        stopLat: '28.514205123700340000000000000000',
        stopLong: '77.004438601832500000000000000000',
        seats: 31,
        distanceMeter: 0,
        eta: '23:41:36',
        checkForEta: '',
        stopReachTime: '',
        onBoardingArr: [],
        offBoardingArr: [],
        onBoardingNumber: 0,
        offBoardingNumber: 0,
        _id: '66275a15deb23684b8c35843'
      },
      {
        stopName: 'Brisk Lumbini',
        stopStatus: 0,
        stopID: null,
        stopLat: '28.513026006645667000000000000000',
        stopLong: '77.006216721068970000000000000000',
        seats: 35,
        distanceMeter: 0,
        eta: '23:43:36',
        checkForEta: '',
        stopReachTime: '',
        onBoardingArr: [],
        offBoardingArr: [
          {
            userName: 'Prakhar',
            userId: 25,
            totalSeats: 4
          }
        ],
        onBoardingNumber: 0,
        offBoardingNumber: 4,
        _id: '66275a15deb23684b8c35844'
      },
      {
        stopName: 'Raheja Atharva Sector 109 Gurugram',
        stopStatus: 0,
        stopID: null,
        stopLat: '28.509584564288968000000000000000',
        stopLong: '77.005637242950800000000000000000',
        seats: 35,
        distanceMeter: 0,
        eta: '23:45:36',
        checkForEta: '',
        stopReachTime: '',
        onBoardingArr: [],
        offBoardingArr: [],
        onBoardingNumber: 0,
        offBoardingNumber: 0,
        _id: '66275a15deb23684b8c35845'
      }
    ]
  }
];
