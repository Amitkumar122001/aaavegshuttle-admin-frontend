// assets

import { IconTypography, IconPalette, IconShadow, IconWindmill } from '@tabler/icons';
import {
  IconBus,
  IconArrowRightRhombus,
  IconRoute,
  IconSteeringWheel,
  IconEdit,
  Icon360,
  IconPlus,
  IconBusStop,
  IconSearch
} from '@tabler/icons-react';

// constant
const icons = {
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
  IconWindmill,
  Icon360,
  IconArrowRightRhombus
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //
// inside children object key target=true route on new page
const buses = {
  id: 'buses',
  title: 'BUS',
  // caption: 'Bus Caption',
  type: 'group',
  children: [
    {
      id: 'authentication',
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
          id: 'add route',
          title: 'Add Route',
          type: 'item',
          url: '/add_route',
          icon: icons.IconRoute,
          breadcrumbs: false,
          target: false
        },
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
          id: 'add conductor',
          title: 'Add Conductor',
          type: 'item',
          url: '/add_conductor',
          icon: icons.IconShadow,
          breadcrumbs: false,
          target: false
        },
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
          id: 'all bus',
          title: 'All Bus',
          type: 'item',
          url: '/all_bus',
          icon: icons.IconArrowRightRhombus,
          breadcrumbs: false
        },
        {
          id: 'all conductor',
          title: 'All Conductor',
          type: 'item',
          url: '/all_conductor',
          icon: icons.IconArrowRightRhombus,
          breadcrumbs: false
        },
        {
          id: 'all driver',
          title: 'All Driver',
          type: 'item',
          url: '/all_driver',
          icon: icons.IconArrowRightRhombus,
          breadcrumbs: false
        },
        {
          id: 'all route',
          title: 'All Route',
          type: 'item',
          url: '/all_route',
          icon: icons.IconArrowRightRhombus,
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
        },
        {
          id: 'update trip',
          title: 'Update Trip',
          type: 'item',
          url: '/update_trip',
          icon: icons.IconEdit,
          breadcrumbs: false,
          target: false
        },
        {
          id: 'add booking',
          title: 'Add Booking',
          type: 'item',
          url: '/add_booking',
          icon: icons.IconArrowRightRhombus,
          breadcrumbs: false
        },
        {
          id: 'all booking',
          title: 'All Booking',
          type: 'item',
          url: '/all_booking',
          icon: icons.IconArrowRightRhombus,
          breadcrumbs: false
        },
        {
          id: 'update booking',
          title: 'Update Booking',
          type: 'item',
          url: '/update_booking',
          icon: icons.IconArrowRightRhombus,
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default buses;
