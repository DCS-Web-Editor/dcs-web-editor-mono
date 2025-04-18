import airdrome_class_1 from "./small/airdrome_class_1.png";
import airdrome_class_2 from "./small/airdrome_class_2.png";
import airdrome_class_3 from "./small/airdrome_class_3.png";
import airdrome_class_4 from "./small/airdrome_class_none.png";
import airdrome_class_0 from "./small/airdrome_class_none.png";
import HOMER from "./small/beacon_without_marker.png";
import AIRPORT_HOMER_WITH_MARKER from "./small/beacon_with_marker.png";
import VOR_DME from "./small/beacon_VOR-DME.png";
import VOR from "./small/beacon_VOR.png";
import VORTAC from "./small/beacon_VORTAC.png";
import TACAN from "./small/beacon_tacan.png";
import RSBN from "./small/beacon_RSBN.png";
import DME from "./small/beacon_DME.png";
import P0091000015 from "./small/P91000015.png";
import P0091000024 from "./small/P91000024.png";
import P0091000004 from "./small/P91000004.png";
import P0091000025 from "./small/P91000025.png";
import P0091000212 from "./small/P91000212.png";
import P0091000352 from "./small/P91000352.png";
import P0091000017 from "./small/P91000017.png";
import P0091000201 from "./small/P91000201.png";
import P0091000070 from "./small/P91000070.png";
import P0091000001 from "./small/P91000001.png";
import P0091000046 from "./small/P91000046.png";
import P0091000021 from "./small/P91000021.png";
import P0091000002 from "./small/P91000002.png";
import P0091000027 from "./small/P91000027.png";
import P0091000045 from "./small/P91000045.png";
import P0091000006 from "./small/P91000006.png";
import P0091000062 from "./small/P91000062.png";
import P0091000079 from "./small/P91000079.png";
import P0000000634 from "./small/P00000634.png";
import P0091000083 from "./small/P91000083.png";
import P0091000076 from "./small/P91000076.png";
import P0091000026 from "./small/P91000026.png";
import P0091000069 from "./small/P91000069.png";
import P0091000038 from "./small/P91000038.png";
import P0091000056 from "./small/P91000056.png";
import P0091000204 from "./small/P91000204.png";
import P0091000211 from "./small/P91000211.png";
import P0091000020 from "./small/P91000020.png";
import P0091000209 from "./small/P91000209.png";
import P0091000039 from "./small/P91000039.png";
import P0091000065 from "./small/P91000065.png";
import P0091000067 from "./small/P91000067.png";
import P0091000005 from "./small/P91000005.png";
import P0091000029 from "./small/P91000029.png";
import P0091000208 from "./small/P91000208.png";
import P0091000036 from "./small/P91000036.png";
import P0091000084 from "./small/P91000084.png";
import P0091000202 from "./small/P91000202.png";
import P0091000080 from "./small/P91000080.png";
import P0091000050 from "./small/P91000050.png";
import P0091000081 from "./small/P91000081.png";
import P0091000217 from "./small/P91000217.png";
import P0091000023 from "./small/P91000023.png";
import P0091000075 from "./small/P91000075.png";
import P0091000082 from "./small/P91000082.png";
import P0091000205 from "./small/P91000205.png";
import P0091000207 from "./small/P91000207.png";
import P0091000216 from "./small/P91000216.png";
import P0091000064 from "./small/P91000064.png";
import P0091000060 from "./small/P91000060.png";
import P0091000214 from "./small/P91000214.png";
import P0091000087 from "./small/P91000087.png";
import P0091000353 from "./small/P91000353.png";
import P0091000063 from "./small/P91000063.png";
import SPAAA_NoRAD_Tank from "./small/SPAAA_NoRAD_Tank.png";
import SAM_SPAAA_RAD_APC from "./small/SAM_SPAAA_RAD_APC.png";
import P0091000086 from "./small/P91000086.png";
import P0091000085 from "./small/P91000085.png";
import P0091000215 from "./small/P91000215.png";
import P_COW from "./small/P_COW.png";
import P91000108 from "./small/P91000108.png";
import P0091000203 from "./small/P91000203.png";
import P0091000213 from "./small/P91000213.png";
import P0091000035 from "./small/P91000035.png";
import P0091000003 from "./small/P91000003.png";
import P0091000014 from "./small/P91000014.png";
import P0091000096 from "./small/P91000096.png";
import P0091000066 from "./small/P91000066.png";
import P0091000072 from "./small/P91000072.png";
import Bullseye from "./small/P0091000347.png";
import LC from "./small/LC.png";
import FARP from "./small/FARP.png";
import FARP_Tent from "./small/FARP_Tent.png";
import Artillery from "./small/Artillery.png";
import Ammo from "./small/Ammo.png";
import Tower from "./small/Tower.png";
import Question from "./small/question.png";
import navigation_point from "./small/navigation_point.png";
import Missile from "./small/missile.png";
import Rocket from "./small/rocket.png";
import Bomb from "./small/bomb.png";
import Bomber from "./small/bomber.png";
import oilrig from "./small/oilrig.png";
import HeliRecon from "./small/heli recon.png";
import civilian from "./small/civilian.png";
import parachute from "./small/parachute.png";
import NavTriangle from "./small/nav_triangle.png";

import iconMap from "./iconMap.json";

export const getIcon = function geticon(unitType: string) {
    const iconName: string = (iconMap as any)[unitType];

    const icon = toExport.icons[iconName] || toExport.icons.Question;
    return icon;
};
export const getIconName = function geticon(unitType: string) {
    const iconName: string = (iconMap as any)[unitType];
    return iconName;
};

const toExport: any = {
    getIcon,
    getIconName,
    icons: {
        airdrome_class_1,
        airdrome_class_2,
        airdrome_class_3,
        airdrome_class_4,
        airdrome_class_0,
        HOMER,
        AIRPORT_HOMER: HOMER,
        AIRPORT_HOMER_WITH_MARKER,
        VOR_DME,
        DME,
        VOR,
        VORTAC,
        TACAN,
        RSBN,
        P0091000015,
        P0091000024,
        P0091000004,
        P0091000025,
        P0091000212,
        P0091000352,
        P0091000017,
        P0091000201,
        P0091000070,
        P0091000001,
        P0091000046,
        P0091000021,
        P0091000002,
        P0091000027,
        P0091000045,
        P0091000006,
        P0091000062,
        P0091000079,
        P0000000634,
        P0091000083,
        P0091000076,
        P0091000026,
        P0091000069,
        P0091000038,
        P0091000056,
        P0091000204,
        P0091000211,
        P0091000020,
        P0091000209,
        P0091000039,
        P0091000065,
        P0091000067,
        P0091000005,
        P0091000029,
        P0091000208,
        P0091000036,
        P0091000084,
        P0091000202,
        P0091000080,
        P0091000050,
        P0091000081,
        P0091000217,
        P0091000023,
        P0091000075,
        P0091000082,
        P0091000205,
        P0091000207,
        P0091000216,
        P0091000064,
        P0091000060,
        P0091000214,
        P0091000087,
        P0091000353,
        P0091000063,
        SPAAA_NoRAD_Tank,
        SAM_SPAAA_RAD_APC,
        P0091000086,
        P0091000085,
        P0091000215,
        P_COW,
        P91000108,
        P0091000203,
        P0091000213,
        P0091000035,
        P0091000003,
        P0091000014,
        P0091000096,
        P0091000066,
        P0091000072,
        FARP,
        FARP_Tent,
        Artillery,
        Ammo,
        Tower,
        Question,
        LC,
        Bullseye,
        navigation_point,
        Missile,
        Rocket,
        Bomb,
        Bomber,
        oilrig,
        HeliRecon,
        civilian,
        NavTriangle,
        parachute,
    },
};

export default toExport;

export const SYMBOLS = {
    plane: import.meta.glob("./plane/symbols/*.png", { eager: true }),
    vehicle: import.meta.glob("./vehicle/symbols/*.png", { eager: true }),
    helicopter: import.meta.glob("./helicopter/symbols/*.png", { eager: true }),
};

export const FACTORY = {
    plane: import.meta.glob("./plane/factory/*.png", { eager: true }),
    vehicle: import.meta.glob("./vehicle/factory/*.png", { eager: true }),
    ship: import.meta.glob("./ship/factory/*.png", { eager: true }),
    helicopter: import.meta.glob("./helicopter/factory/*.png", { eager: true }),
    fortifications: import.meta.glob("./fortifications/factory/*.png", {
        eager: true,
    }),
};
