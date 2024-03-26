import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import Loadable from 'ui-component/Loadable';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/Default')));

// utilities routing
const UtilsTypography = Loadable(lazy(() => import('views/utilities/Typography')));
const UtilsColor = Loadable(lazy(() => import('views/utilities/Color')));
const UtilsShadow = Loadable(lazy(() => import('views/utilities/Shadow')));
const UtilsMaterialIcons = Loadable(lazy(() => import('views/utilities/MaterialIcons')));
const UtilsTablerIcons = Loadable(lazy(() => import('views/utilities/TablerIcons')));

// sample page routing
const SamplePage = Loadable(lazy(() => import('views/sample-page')));

// bus
import { AddBus } from 'views/addBus/AddBus';
import { AllBus } from 'views/allBus/AllBus';
// Route
import { AddRoute } from 'views/addRoute/AddRoute';
import { AllRoute } from 'views/allRoute/AllRoute';
// driver
import { AddDriver } from 'views/addDriver/AddDriver';
import { AllDriver } from 'views/allDriver/AllDriver';

// conductor
import { AddConductor } from 'views/addConductor/AddConductor';
import { AllConductor } from 'views/allConductor/AllConductor';

import { UpdateTrip } from 'views/updateTrip/UpdateTrip';
import { AddTrip } from 'views/addTrip/AddTrip';
// User
import { AddUser } from 'views/addUser/AddUser';
import { AllUser } from 'views/allUser/AllUser';
import { SearchUser } from 'views/searchUser/SearchUser';

import { AllBooking } from 'views/allBooking/AllBooking';
// Vendor
import { AllVendor } from 'views/allVendor/AllVendor';
import { AddVendor } from 'views/addVendor/AddVendor';
import { SearchVendor } from 'views/searchVendor/SearchVendor';
// stop
import { AddStop } from 'views/addStops/AddStop';
import { AllStop } from 'views/allStop/AllStop';
import { AllTrip } from 'views/allTrip/AllTrip';

// Pair Bus Driver
import { PairBusDriver } from 'views/pairBusDriver/PairBusDriver';

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: 'dashboard',
      children: [
        {
          path: 'default',
          element: <DashboardDefault />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-typography',
          element: <UtilsTypography />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-color',
          element: <UtilsColor />
        }
      ]
    },
    {
      path: 'utils',
      children: [
        {
          path: 'util-shadow',
          element: <UtilsShadow />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'tabler-icons',
          element: <UtilsTablerIcons />
        }
      ]
    },
    {
      path: 'icons',
      children: [
        {
          path: 'material-icons',
          element: <UtilsMaterialIcons />
        }
      ]
    },
    {
      path: 'sample-page',
      element: <SamplePage />
    },
    {
      path: 'add_route',
      element: <AddRoute />
    },
    {
      path: 'all_route',
      element: <AllRoute />
    },
    {
      path: 'add_bus',
      element: <AddBus />
    },
    {
      path: 'add_driver',
      element: <AddDriver />
    },
    {
      path: 'add_conductor',
      element: <AddConductor />
    },
    {
      path: 'all_bus',
      element: <AllBus />
    },
    {
      path: 'all_driver',
      element: <AllDriver />
    },
    {
      path: 'all_conductor',
      element: <AllConductor />
    },
    {
      path: 'update_trip',
      element: <UpdateTrip />
    },
    {
      path: 'add_trip',
      element: <AddTrip />
    },
    {
      path: 'add_stop',
      element: <AddStop />
    },
    {
      path: 'search_user',
      element: <SearchUser />
    },
    {
      path: 'add_user',
      element: <AddUser />
    },
    {
      path: 'all_user',
      element: <AllUser />
    },
    {
      path: 'all_booking',
      element: <AllBooking />
    },
    {
      path: 'all_stop',
      element: <AllStop />
    },
    {
      path: 'all_vendor',
      element: <AllVendor />
    },
    {
      path: 'add_vendor',
      element: <AddVendor />
    },
    {
      path: 'search_bus',
      element: <SearchVendor />
    },
    {
      path: 'all_trip',
      element: <AllTrip />
    },
    {
      path: 'pairBusDriver',
      element: <PairBusDriver />
    }
  ]
};

export default MainRoutes;
