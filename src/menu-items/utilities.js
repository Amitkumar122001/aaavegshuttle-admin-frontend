import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PostAddIcon from '@mui/icons-material/PostAdd';
import Man3Icon from '@mui/icons-material/Man3';
import PaymentIcon from '@mui/icons-material/Payment';
import { IconTypography, IconPalette, IconShadow, IconWindmill, IconKey } from '@tabler/icons';
import {
  IconBus,
  IconArrowRightRhombus,
  IconRoute,
  IconSteeringWheel,
  IconEdit,
  Icon360,
  IconPlus,
  IconBusStop,
  IconSearch,
  IconUser
} from '@tabler/icons-react';

import { store } from '../store/index';
// import { UpdateRounded } from '@mui/icons-material';

const icons = {
  DirectionsCarIcon,
  IconWindmill,
  PersonAddIcon,
  LocalAtmIcon,
  IconKey,
  AttachMoneyIcon,
  PostAddIcon,
  Man3Icon,
  PaymentIcon,
  IconBus,
  IconRoute,
  IconSteeringWheel,
  IconEdit,
  IconPlus,
  IconBusStop,
  IconSearch,
  IconTypography,
  IconPalette,
  IconShadow,
  Icon360,
  IconArrowRightRhombus,
  IconUser
};

var role = '';
var arrAdmin = [];
// var arrOperation = [];
// var arrMarketing = [];
var makerChecker = [];

store.subscribe(() => {
  const state = store.getState();
  var updatedRole = state?.customization?.role;
  // console.log(updatedRole);
  if (updatedRole) {
    role = updatedRole;
    arrAdmin = [
      // route
      {
        id: 'route',
        title: 'Route',
        type: 'collapse',
        icon: icons.IconUser,
        children: [
          {
            id: 'add route',
            title: 'Add Route',
            type: 'item',
            url: '/add_route',
            icon: icons.IconRoute,
            breadcrumbs: false,
            target: false
          },
          {
            id: 'all route',
            title: 'All Route',
            type: 'item',
            url: '/all_route',
            icon: icons.IconArrowRightRhombus,
            breadcrumbs: false
          }
        ]
      },
      // stop
      {
        id: 'stop',
        title: 'Stop',
        type: 'collapse',
        icon: icons.IconUser,
        children: [
          {
            id: 'add stop',
            title: 'Add Stop',
            type: 'item',
            url: '/add_stop',
            icon: icons.IconBusStop,
            target: false,
            breadcrumbs: false
          },
          {
            id: 'all stop',
            title: 'All Stop',
            type: 'item',
            url: '/all_stop',
            icon: icons.IconArrowRightRhombus,
            breadcrumbs: false
          }
        ]
      },
      // vendor
      {
        id: 'vendor',
        title: 'Vendor',
        type: 'collapse',
        icon: icons.IconUser,
        children: [
          {
            id: 'add vendor',
            title: 'Add Vendor',
            type: 'item',
            url: '/add_vendor',
            icon: icons.IconPlus,
            breadcrumbs: false,
            target: false
          },
          {
            id: 'all vendor',
            title: 'All Vendor',
            type: 'item',
            url: '/all_vendor',
            icon: icons.IconUser,
            breadcrumbs: false,
            target: false
          },

          {
            id: 'search vendor',
            title: 'Search Vendor',
            type: 'item',
            url: '/search_bus',
            icon: icons.IconSearch,
            breadcrumbs: false,
            target: false
          }
        ]
      },
      // bus
      {
        id: 'buses',
        title: 'Bus',
        type: 'collapse',
        icon: icons.IconBus,
        children: [
          {
            id: 'add bus',
            title: 'Add Bus',
            type: 'item',
            url: '/add_bus',
            icon: icons.IconPlus,
            breadcrumbs: false,
            target: false
          },
          {
            id: 'all bus',
            title: 'All Bus',
            type: 'item',
            url: '/all_bus',
            icon: icons.IconArrowRightRhombus,
            breadcrumbs: false
          }
        ]
      },
      // driver
      {
        id: 'driver',
        title: 'Driver',
        type: 'collapse',
        icon: icons.IconUser,
        children: [
          {
            id: 'add driver',
            title: 'Add Driver',
            type: 'item',
            url: '/add_driver',
            icon: icons.IconSteeringWheel,
            breadcrumbs: false,
            target: false
          },
          {
            id: 'all driver',
            title: 'All Driver',
            type: 'item',
            url: '/all_driver',
            icon: icons.IconArrowRightRhombus,
            breadcrumbs: false
          }
        ]
      },
      // conductor
      {
        id: 'conductor',
        title: 'Conductor',
        type: 'collapse',
        icon: icons.IconUser,
        children: [
          {
            id: 'add conductor',
            title: 'Add Conductor',
            type: 'item',
            url: '/add_conductor',
            icon: icons.IconShadow,
            breadcrumbs: false,
            target: false
          },
          {
            id: 'all conductor',
            title: 'All Conductor',
            type: 'item',
            url: '/all_conductor',
            icon: icons.IconArrowRightRhombus,
            breadcrumbs: false
          }
        ]
      },
      // trip
      {
        id: 'trip',
        title: 'Trip',
        type: 'collapse',
        icon: icons.Icon360,
        children: [
          {
            id: 'add trip',
            title: 'Add Trip',
            type: 'item',
            url: '/add_trip',
            icon: icons.IconPlus,
            breadcrumbs: false,
            target: false
          },
          {
            id: 'all trip',
            title: 'All Trip',
            type: 'item',
            url: '/all_trip',
            icon: icons.IconPlus,
            breadcrumbs: false,
            target: false
          }
        ]
      },
      // Pair bus driver
      {
        id: 'pairbusdriver',
        title: 'Pair Bus Driver',
        type: 'collapse',
        icon: icons.Icon360,
        children: [
          {
            id: 'busdriver',
            title: 'Pair Bus Diver',
            type: 'item',
            url: '/pairBusDriver',
            icon: icons.IconPlus,
            breadcrumbs: false,
            target: false
          }
        ]
      },
      // trip management
      {
        id: 'tripmanagement',
        title: 'Trip Management',
        type: 'collapse',
        icon: icons.Icon360,
        children: [
          {
            id: 'tripmanage',
            title: 'Trip Management',
            type: 'item',
            url: '/tripmanagement',
            icon: icons.IconPlus,
            breadcrumbs: false,
            target: false
          }
        ]
      },
      // user
      {
        id: 'users',
        title: 'User',
        type: 'collapse',
        icon: icons.IconUser,
        children: [
          {
            id: 'all user',
            title: 'All User',
            type: 'item',
            url: '/all_user',
            icon: icons.IconUser,
            breadcrumbs: false,
            target: false
          },
          {
            id: 'search user',
            title: 'Search User',
            type: 'item',
            url: '/search_user',
            icon: icons.IconSearch,
            breadcrumbs: false
          },
          {
            id: 'all Booking',
            title: 'All Booking',
            type: 'item',
            url: '/all_booking',
            icon: icons.IconUser,
            breadcrumbs: false,
            target: false
          }
        ]
      }
    ];
    makerChecker = [
      // user
      {
        id: 'users',
        title: 'User',
        type: 'collapse',
        icon: icons.IconUser,
        children: [
          {
            id: 'search user',
            title: 'Search User',
            type: 'item',
            url: '/search_user',
            icon: icons.IconSearch,
            breadcrumbs: false
          },
          {
            id: 'all user',
            title: 'All User',
            type: 'item',
            url: '/all_user',
            icon: icons.IconUser,
            breadcrumbs: false,
            target: false
          },
          {
            id: 'all Booking',
            title: 'All Booking',
            type: 'item',
            url: '/all_booking',
            icon: icons.IconUser,
            breadcrumbs: false,
            target: false
          }
        ]
      }
    ];
  }
  createUtilitiesObject();
});
const utilities = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children: []
};

function createUtilitiesObject() {
  utilities.children = role ? (role == 'admin' ? arrAdmin : role == 'checker' ? makerChecker : []) : arrAdmin;
}

export default utilities;
