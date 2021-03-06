var addressPoints = [
	[20.71619, 70.99355, "GHSS Diu", 60],
	[20.2712, 72.9399, "CPS NAROLI GM", 236],
	[21.10894, 72.73243, "GHSS BHIMPORE", 140],
	[20.41397, 72.83961, "GHS NANIDAMAN (E/M)", 295],
	[20.3128, 73.1396, "Govt. Hr. Secondary School Randha (GM)", 161],
	[20.2674, 73.0019, "GHSS T HM", 731],
	[20.3758, 72.9014, "GPS KACHIGAM (GM)",230],
	[20.72698, 70.98837, "GHSS(G)-GHOGHLA",230],
	[20.7098, 70.9625, "GHS Fudam",230],
	[20.2242, 73.0229, "Govt. Hr. Secondary School, Rakholi (GM)",230],
	[20.2242, 73.0229, "Govt. Hr. Secondary School, Rakholi (EM)",230],
	[20.3217, 72.9693, "Govt. Hr. Secondary School, Dadra (EM/GM)",230],
	[20.2811, 73.0599, "Govt. Hr. Secondary School, Galonda (GM)",230],
	[20.2676, 73.0021, "Govt. Hr. Secondary School Silvassa (T) (GM) ",230],
	[20.279, 72.9398, "Govt. Hr. Secondary School Naroli (GM/EM))",230],
	[20.2663, 73.0024, "Govt. Hr. Secondary School Silvassa(T) (EM)",230],
	[20.1287, 73.0711, "Govt. Hr. Secondary School Khanvel (GM/EM)",230],
	[20.1284, 73.0714, "Govt. Hr. Secondary School Khanvel (MM)",230],
	[20.2682, 73.0015, "Govt. Hr. Secondary School Silvassa(T) (MM)",230],
	[20.1749, 73.157, "Govt. Hr. Secondary School Dudhani (GM)",230],
	[20.1944, 73.0212, "Govt. Hr. Secondary School Dapada (GM)",230],
	[20.1117, 73.1482, "Govt. Hr. Secondary School Mandoni (MM)",230],
	[20.2872, 73.0118, "Govt. High School Dokmardi (GM)",230],
	[20.0961, 73.194, "Govt. High School Bedpa (MM)",230],
	[20.0855, 73.1664, "Govt. High School Sindoni (MM)",230],
	[20.3343, 73.0943, "Govt. High School Morkhal (GM)",230],
	[20.2558, 72.9498, "Govt. High School Kharadpada (GM)",230],
	[20.1468, 73.028, "Govt. High School Amboli (MM)",230],
	[20.2767, 73.0047, "Govt. High School Silvassa (Zandachowk) (GM)",230],
	[20.1574, 73.007, "Govt. High School Surangi (GM)",230],
	[20.3072, 73.0618, "Govt. High School Sili (GM)",230],
	[20.2684, 73.0687, "Govt. High School Falandi (GM)",230],
	[20.23861, 73.00389, "Govt. High School Masat (GM)",230],
	[20.11111, 73.02917, "Govt. High School Kherdi (MM)",230],
	[20.14201, 73.02681, "C.P.S. AMBOLI GUJ.MED. AMBOLI",230],
	[20.15642, 73.03019, "P.S. KHADOLI AMBOLI",230],
	[20.14434, 73.04239, "P.S. PALADPADA AMBOLI",230],
	[20.15041, 73.03728, "P.S. MARAGPADA AMBOLI",230],
	[20.15281, 73.04339, "P.S. KOLIPADA AMBOLI",230],
	[20.12982, 72.98656, "P.S. MORPADA AMBOLI",230],
	[20.13198, 72.99244, "P.S. KADUPADA AMBOLI",230],
	[20.14328, 72.98505, "P.S. BARAFPADA AMBOLI",230],
	[20.12452, 72.98641, "P.S.DHODHADPADA AMBOLI",230],
	[20.14329, 72.97576, "P.S.BHUJADPADA AMBOLI",230],
	[20.12554, 72.96874, "P.S.PATELPADA AMBOLI",230],
	[20.13992, 73.00902, "P.S. MANIPADA AMBOLI",230],
	[20.12944, 73.01784, "P.S. KHOTHARPADA AMBOLI",230],
	[20.14128, 73.05556, "P.S. BINDRABIN AMBOLI",230],
	[20.13112, 73.05564, "P.S. MANIPADA.BIN AMBOLI",230],
	[20.151, 73.04664, "P.S.TINODA AMBOLI",230],
	[20.12088, 73.02738, "P.S. KALA AMBOLI",230],
	[20.13106, 73.02673, "P.S.MANIPADA.KALA AMBOLI",230],
	[20.09826, 73.03011, "P.S.BAHEDPADA.KHER AMBOLI",230],
	[20.54328, 73.61808, "C.P.S. DADRA DADRA",230],
	[20.31901, 72.9573, "P.S.VAGHDHARA DADRA",230],
	[20.32883, 72.97628, "P.S. ROHITWAS DADRA",230],
	[21.63745, 73.63745, "P.S.DEMNI DADRA",230],
	[20.30927, 72.97124, "P.S.TIGHRA DADRA",230],
	[20.3068, 73.01385, "P.S.VAGHCHHIPA DADRA",230],
	[20.19432, 73.02144, "C.P.S. DAPADA DAPADA",230],
	[20.18322, 73.02194, "P.S. KHADIPADA DAPADA",230],
	[20.18119, 73.0055, "P.S. CHIKHALI PATELPADA DAPADA",230],
	[20.18903, 72.99908, "P.S. JANATHIYAPADA DAPADA",230],
	[20.18125, 72.99747, "P.S.CHIKHALI DADRIPADA DAPADA",230],
	[20.17644, 73.02231, "P.S. SHINGADPADA DAPADA",230],
	[20.19036, 73.033, "P.S. DUNGARIPADA DAPADA",230],
	[20.18956, 73.00564, "P.S. ZATIPADA DAPADA",230],
	[20.18908, 73.01303, "P.S. CHAUDHARIPADA DAPADA",230],
	[20.19481, 73.01997, "P.S.DHODIPADA DAPADA",230],
	[20.20836, 73.02267, "C.P.S VASONA DAPADA",230],
	[20.20278, 73.03347, "P.S. AMRUNPADA DAPADA",230],
	[20.21042, 73.02897, "P.S. VADPADA DAPADA",230],
	[20.21258, 73.01597, "P.S. BOBAPADA DAPADA",230],
	[20.20414, 73.02867, "P.S. GADHERPADA DAPADA",230],
	[20.20861, 73.00122, "P.S. KOKANPADA DAPADA",230],
	[20.20458, 73.00392, "P.S. CHINCHPADA DAPADA",230],
	[20.19997, 73.01447, "P.S. NIMALPADA DAPADA",230],
	[20.18592, 73.05628, "P.S. FANASPADA DAPADA",230],
	[20.18506, 73.04725, "P.S. PATI DAPADA",230],
	[20.15717, 73.00694, "C.P.S. SURANGI DAPADA",230],
	[20.16422, 73.00061, "P.S. JUNA PATELPADA DAPADA",230],
	[20.15997, 73.01158, "P.S. KADUPADA DAPADA",230],
	[20.1525, 73.01203, "P.S. VADHIYAPADA DAPADA",230],
	[20.16494, 73.00803, "P.S. RAIPADA DAPADA",230],
	[20.17125, 73.0025, "P.S.DADRIPADA DAPADA",230],
	[20.16183, 72.99369, "P.S. APTI DAPADA",230],
	[20.14867, 72.99169, "P.S. APTI PATELPADA DAPADA",230],
	[20.17495, 73.15718, "C.P.S.DUDHANI DUDHANI",230],
	[20.19193, 73.13526, "P.S. JAMALPADA DUDHANI",230],
	[20.18862, 73.15115, "P.S. KAUNCHA DUDHANI",230],
	[20.18884, 73.15115, "P.S. RANPADA DUDHANI",230],
	[20.16701, 73.16553, "P.S.KHORIPADA DUDHANI",230],
	[20.19573, 73.17414, "P.S.RUIPADA DUDHANI",230],
	[20.18525, 73.16197, "P.S. TOKARPADA DUDHANI",230],
	[20.16485, 73.15952, "P.S. KALAMDEVI DUDHANI",230],
	[20.18753, 73.18341, "P.S.GUNSA DUDHANI",230],
	[20.19234, 73.1865, "P.S. PATELPADA GUNSA DUDHANI",230],
	[20.17347, 73.19091, "P.S.BILDHARI DUDHANI",230],
	[20.19783, 73.14531, "P.S. CHIKHLIPADA DUDHANI",230],
	[20.1715, 73.18571, "P.S. GHODBARI MARATHI DUDHANI",230],
	[20.1628, 73.18571, "P.S. KARBHARIPADA MARATHI DUDHANI",230],
	[20.15373, 73.1555, "C.P.S. KARCHOND DUDHANI",230],
	[20.13668, 73.18065, "P.S. UMARMATHA DUDHANI",230],
	[20.14688, 73.16199, "P.S. CHIKARPADA DUDHANI",230],
	[20.13593, 73.14429, "P.S. KHADKUNIYA DUDHANI",230],
	[20.13679, 73.14791, "P.S. PAYRIPADA DUDHANI",230],
	[20.14305, 73.15154, "P.S. MAMLIPADA DUDHANI",230],
	[20.14869, 73.13143, "P.S. KHERARBARI DUDHANI",230],
	[20.14516, 73.1188, "P.S. PATELPADA KE. DUDHANI",230],
	[20.13799, 73.13441, "P.S. GAVANPADA DUDHANI",230],
	[20.16095, 73.13547, "P.S. MEDHA DUDHANI",230],
	[20.15157, 73.14056, "P.S. UPLAMEDHA DUDHANI",230],
	[20.16718, 73.15191, "P.S. AMBABARI DUDHANI",230],
	[20.12794, 73.06723, "C.P.S. KHANVEL GUJARATI MEDIUM KHANVEL",230],
	[20.15706, 73.08471, "P.S. UMARVARNI KHANVEL",230],
	[20.16684, 73.08265, "P.S. KARBHARIPADA KHANVEL",230],
	[20.1534, 73.1074, "P.S. GORATPADA KHANVEL",230],
	[20.13263, 73.08497, "P.S. KHUTALI KHANVEL",230],
	[20.14648, 73.09109, "P.S. DIGHEMAL KHANVEL",230],
	[20.12743, 73.05648, "P.S. CHAUDA KHANVEL",230],
	[20.1062, 73.07587, "P.S. TALAVALI KHANVEL",230],
	[20.10018, 73.08669, "P.S. RUDANA KHANVEL",230],
	[20.0969, 73.08245, "P.S.KASPADA RUDANA KHANVEL",230],
	[20.28178, 73.05964, "C.P.S. GALONDA KILVANI",230],
	[20.31967, 73.06228, "P.S. KUVAPADA KILVANI",230],
	[20.30956, 73.07728, "P.S. TALAVPADA KILVANI",230],
	[20.30042, 73.07669, "P.S. RANPADA KILVANI",230],
	[20.30733, 73.0615, "P.S. SILI KILVANI",230],
	[20.29797, 73.0925, "P.S. KILVANI KILVANI",230],
	[20.28814, 73.08658, "P.S. PATELPADA KILVANI KILVANI",230],
	[20.28939, 73.07422, "P.S. ZARIPADA KILVANI",230],
	[20.27808, 73.07211, "P.S. PATELPADA GALONDA KILVANI",230],
	[20.28947, 73.05367, "P.S. PARSIPADA KILVANI",230],
	[20.29042, 73.06131, "P. S. VAKHARPADA GALONDA KILVANI",230],
	[20.26855, 73.06863, "C.P.S. FALANDI KILVANI",230],
	[20.26247, 73.06382, "P.S. NIMBARPADA KILVANI",230],
	[20.26968, 73.04965, "P.S. GARDIPADA KILVANI",230],
	[20.25972, 73.07139, "P.S. UMARKUI KILVANI",230],
	[20.24944, 73.06722, "P.S. BHUJADPADA KILVANI",230],
	[20.25166, 73.07509, "P.S. KHORIPADA KILVANI",230],
	[20.23347, 73.08996, "P.S. BEDUNPADA KILVANI",230],
	[20.26049, 73.0774, "P.S. OZARPADA KILVANI",230],
	[20.26275, 73.09286, "P.S. DUNGARPADA KILVANI",230],
	[20.26847, 73.07467, "P.S. HATPADA KILVANI",230],
	[20.27217, 73.08125, "P.S. BHAGATPADA KILVANI",230],
	[20.24604, 73.05998, "P.S. BIVALAPADA UMARKUI KILVANI",230],
	[20.26575, 73.10133, "P.S. NAMACHALAPADA KILVANI",230],
	[20.28546, 73.03766, "C.P.S. ATHOLA KILVANI",230],
	[20.27713, 73.03836, "P.S. DUNGARIFALIA KILVANI",230],
	[20.28201, 73.04537, "P.S. DHODHFALIA KILVANI",230],
	[20.2615, 73.04619, "P.S. BARIPADA KILVANI",230],
	[20.28084, 73.0354, "P.S. HOLIFALIA KILVANI",230],
	[20.285, 73.04556, "P.S. KOLIPADA KILVANI",230],
	[20.29281, 73.03828, "P.S. BARATPADA GALONDA KILVANI",230],
	[20.29828, 73.04081, "P.S. JANATHIYAPADA KILVANI",230],
	[20.30414, 73.0409, "P.S. KAPARIYAPADA KILVANI",230],
	[20.31644, 73.04389, "P.S. KOBAPADA KILVANI",230],
	[20.31817, 73.04994, "P.S. SANVARPADA KILVANI",230],
	[20.28142, 72.93256, "P.S. DHAPSA NAROLI",230],
	[20.27819, 72.95136, "P.S. KAKADFALIA NAROLI",230],
	[20.26639, 72.94667, "P.S. KOYAFALIA NAROLI",230],
	[20.26356, 72.93686, "P.S. VALYAGOLA NAROLI",230],
	[20.25108, 72.93697, "P.S. KANADI NAROLI",230],
	[20.27145, 72.92867, "P.S. NAVAFALIA NAROLI",230],
	[20.26489, 72.92206, "P.S. KUMBHARVADI NAROLI",230],
	[20.25642, 72.95003, "C.P.S. KHARADPADA NAROLI",230],
	[20.24253, 72.95778, "P.S. DANDIKAR NAROLI",230],
	[20.25214, 72.94897, "P.S. CHOWKIPADA NAROLI",230],
	[20.24644, 72.96322, "P.S. DHANARYA NAROLI",230],
	[20.25817, 72.96694, "P.S. ATHAL NAROLI",230],
	[20.26837, 72.98082, "P.S. KHADIPADA NAROLI",230],
	[20.25731, 72.97583, "P.S. BARIPADA NAROLI",230],
	[20.26681, 72.96917, "P.S SINDURFALIA NAROLI",230],
	[20.19161, 72.97028, "P.S. LUHARI NAROLI",230],
	[20.2025, 72.96992, "P.S. PARESHPADA NAROLI",230],
	[20.19308, 72.97475, "P.S. KHANCHPADA NAROLI",230],
	[20.19067, 72.98611, "P.S. KHADIPADA LUHARI NAROLI",230],
	[20.20006, 72.96347, "P.S. BORDENPADA NAROLI",230],
	[20.21483, 73.04858, "P.S. KARAD RAKHOLI",230],
	[20.22292, 73.02403, "C.P.S. RAKHOLI RAKHOLI",230],
	[20.22864, 73.04783, "P.S. DUNGARPADA RAKHOLI",230],
	[20.22992, 73.05792, "P.S. SALKARPADA RAKHOLI",230],
	[20.24575, 73.04275, "P.S. ZARIPADA RAKHOLI",230],
	[20.24364, 73.02986, "P.S. CHOKIPADA RAKHOLI",230],
	[20.25117, 73.02519, "P.S. VAIJALPADA RAKHOLI",230],
	[20.22231, 73.0415, "P.S. PLOTPADA RAKHOLI",230],
	[20.23439, 73.02347, "P.S. BHOYAPADA RAKHOLI",230],
	[20.25147, 73.00919, "C.P.S. SAMARVARNI RAKHOLI",230],
	[20.25911, 73.01294, "P.S. PATELPADA RAKHOLI",230],
	[20.25511, 73.00497, "P.S. AMBAFALIA RAKHOLI",230],
	[20.25231, 72.99669, "P.S VADPADA RAKHOLI",230],
	[20.25911, 73.01294, "P.S. RAGHUFALIA RAKHOLI",230],
	[20.2385, 73.00386, "P.S. MASAT RAKHOLI",230],
	[20.24189, 73.01122, "P.S. PADRIPADA GUJ.MEDIUM RAKHOLI",230],
	[20.24372, 73.00281, "P.S. KHADIPADA RAKHOLI",230],
	[20.22489, 73.01219, "P.S. KUDACHA RAKHOLI",230],
	[20.31078, 73.13503, "C.P.S. RANDHA RANDHA",230],
	[20.29136, 73.15926, "P.S. NANARANDHA RANDHA",230],
	[20.28879, 73.10665, "P.S. DUNGRIPADA NANA RANDHA RANDHA",230],
	[20.29836, 73.15494, "P.S.BANAPADA RANDHA",230],
	[20.31324, 73.14945, "P.S. BHOYAPADA RANDHA",230],
	[20.31224, 73.15362, "P.S. GANGODAPADA RANDHA",230],
	[20.3075, 73.14334, "P.S. PARSIPADA RANDHA",230],
	[20.27783, 73.12231, "P.S. EKALBARA RANDHA",230],
	[20.29713, 73.12978, "P.S. BORSAPADA RANDHA",230],
	[20.29258, 73.16524, "P.S. DUNGRIPADA BONTA RANDHA",230],
	[20.28005, 73.11424, "P.S. KANBIPADA RANDHA",230],
	[20.2883, 73.13339, "P.S. DHAMODIAPADA RANDHA",230],
	[20.29542, 73.14327, "P.S. KHORIPADA RANDHA",230],
	[20.33443, 73.09423, "C.P.S. MORKHAL RANDHA",230],
	[20.3288, 73.09004, "P.S. DUNGRIPADA RANDHA",230],
	[20.31962, 73.1042, "P.S. KHADKIPADA RANDHA",230],
	[20.32813, 73.08659, "P.S. RAUTPADA RANDHA",230],
	[20.32743, 73.16061, "P.S. DABHADPADA RANDHA",230],
	[20.33804, 73.10016, "P.S. BHUSARPADA RANDHA",230],
	[20.27671, 73.00472, "C.P.S. SILVASSA GUJ.MEDIUM SILVASSA",230],
	[20.28498, 72.99586, "P.S. DAYATFALIA SILVASSA",230],
	[20.27669, 72.99353, "P.S. ULTANFALIYA SILVASSA",230],
	[20.26655, 73.00928, "P.S. PATLIYAFALIYA SILVASSA",230],
	[20.26745, 73.00151, "P.S. TOKARKHADA SILVASSA",230],
	[20.26639, 72.99466, "P.S. BHURKUDFALIYA SILVASSA",230],
	[20.25908, 72.99911, "P.S. KAMLIFALIYA SILVASSA",230],
	[20.26299, 73.02477, "P.S. BALDEVI SILVASSA",230],
	[20.27301, 73.02475, "P.S. DANDULFALIA SILVASSA",230],
	[20.28727, 73.01181, "P.S.DOKMARDI SILVASSA",230],
	[20.27766, 73.02313, "P.S.AGRIVAD SILVASSA",230],
	[20.14201, 73.02681, "C.P.S. AMBOLI MARATHI AMBOLI",230],
	[20.13188, 72.97436, "P.S.DAVARPADA MARATHI AMBOLI",230],
	[20.12301, 73.01349, "P.S. KARACHGAM MARATHI AMBOLI",230],
	[20.11132, 73.00938, "P.S.KHADIPADA MARATHI AMBOLI",230],
	[20.11444, 73.01652, "P.S.GAVITPADA MARATHI AMBOLI",230],
	[20.11469, 73.00636, "P.S.KAKADPADA MARATHI AMBOLI",230],
	[20.1112, 73.0292, "P.S.KHERDI MARATHI AMBOLI",230],
	[20.09772, 73.02211, "P.S.KHUMARPADA MARATHI AMBOLI",230],
	[20.10462, 73.01245, "P.S. KASPADA AMBOLI",230],
	[20.11224, 73.03711, "P.S. GHODEAMBA MARATHI AMBOLI",230],
	[20.10839, 73.02124, "P.S.KHADIPADA MARATHI AMBOLI1",230],
	[20.08837, 73.03433, "P.S.DOLARA MARATHI AMBOLI",230],
	[20.07931, 73.03718, "P.S. PATILPADA MARATHI AMBOLI",230],
	[20.0998, 73.03937, "P.S. PARZAI MARATHI AMBOLI",230],
	[20.09773, 73.04417, "P.S. PATILPADA MARATHI AMBOLI1",230],
	[20.10255, 73.04685, "P.S. BARIPADA PARZAI MARATHI AMBOLI",230],
	[20.12868, 73.07076, "C.P.S. KHANVEL MARATHI MEDIUM KHANVEL",230],
	[20.13795, 73.06707, "P.S. DONGRIPADA MARATHI MEDIU KHANVEL",230],
	[20.11687, 73.06681, "P.S. PATALIPADA MARATHI MEDIUM KHANVEL",230],
	[20.14504, 73.07085, "P.S. KHORIPADA MARATHI MEDIUM KHANVEL",230],
	[20.1217, 73.0754, "P.S. BHAGATPADA MARATHI MEDIUM KHANVEL",230],
	[20.13348, 73.10243, "P.S. PATELPADA KHANVEL",230],
	[20.13757, 73.11507, "P.S. BEHADMAL KHANVEL",230],
	[20.13298, 73.13098, "P.S. VANGANPADA KHANVEL",230],
	[20.14265, 73.10353, "P.S. KHADKIPADA SHELTI KHANVEL",230],
	[20.15158, 73.09972, "P.S. GONDPADA SHELTI KHANVEL",230],
	[20.12391, 73.08278, "P.S. KATHYAPADA MARATHI KHANVEL",230],
	[20.10731, 73.09089, "P.S. DADRIPADA KHANVEL",230],
	[20.11654, 73.09487, "P.S. CHIMBADPADA KHANVEL",230],
	[20.11235, 73.10312, "P.S. MARAGPADA KHANVEL",230],
	[20.07921, 73.11823, "P.S. CHIKHALDAPADA KHANVEL",230],
	[20.08032, 73.11, "P.S. VANGADPADA KHANVEL",230],
	[20.11143, 73.14822, "C.P.S. MANDONI MANDONI",230],
	[20.11133, 73.1232, "P.S.CHISDA MANDONI",230],
	[20.08398, 73.12375, "P.S. MURDOLPADA MANDONI",230],
	[20.10139, 73.13299, "P.S. AKHARMAL MANDONI",230],
	[20.08517, 73.13201, "P.S. KHOKARPADA MANDONI",230],
	[20.11476, 73.13478, "P.S. MARGACHIMAL MANDONI",230],
	[20.10974, 73.13486, "P.S.DADRIPADA MANDONI",230],
	[20.10799, 73.12717, "P.S. HEDACHIMAL CHISDA MANDONI",230],
	[20.0857, 73.1418, "P.S. KALSUNPADA MANDONI",230],
	[20.10971, 73.15623, "P.S. SUKALIPADA MANDONI MANDONI",230],
	[20.13324, 73.16319, "P.S.DEVIPADA MANDONI",230],
	[20.10473, 73.16157, "P.S. HEDVACHIMAL MANDONI",230],
	[20.12811, 73.17813, "P.S.CHOTHAPADA MANDONI",230],
	[20.11061, 73.17101, "P.S. BARVADPADA MANDONI",230],
	[20.12198, 73.16179, "P.S.VASDA MANDONI",230],
	[20.08538, 73.16649, "C.P.S. SINDONI MANDONI",230],
	[20.09841, 73.17657, "P.S. JAMANVIHIRI MANDONI",230],
	[20.12153, 73.18879, "P.S. VADPADA MANDONI",230],
	[20.11499, 73.19977, "P.S. CHAMPAPADA MANDONI",230],
	[20.11238, 73.18606, "P.S. BESDA MANDONI",230],
	[20.10056, 73.20759, "P.S. BEDPA MANDONI",230],
	[20.09462, 73.1968, "P.S. SUTHARPADA MANDONI",230],
	[20.11193, 73.20839, "P.S. PATELPADA MANDONI",230],
	[20.08731, 73.15339, "P.S.TORNICHIMAL MANDONI",230],
	[20.07701, 73.17591, "P.S. TORANPADA MANDONI",230],
	[20.09329, 73.15596, "P.S. SINDANIPADA MANDONI",230],
	[20.07248, 73.15992, "P.S. LUHARMAL MANDONI",230],
	[20.0649, 73.16096, "P.S.. TENTMAL SINDONI MANDONI",230],
	[20.07716, 73.16935, "P.S. PATILPADA SINDONI MANDONI",230],
	[20.06863, 73.17598, "P.S. KHEDPA MANDONI",230],
	[20.05318, 73.17366, "P.S.HATIPADA MANDONI",230],
	[20.07912, 73.1905, "P.S. BURUJPADA KHEDPA MANDONI",230],
	[20.06562, 73.17323, "P.S. KARBHARIPADA KHEDPA MANDONI",230],
	[20.27671, 73.00472, "C.P.S. SILVASSA MARATHI MEDIUM SILVASSA",230],
	[20.54328, 73.61808, "C.P.S.DADRA ENG.MEDIUM DADRA",230],
	[20.28186, 73.05929, "C.P.S. GALONDA ENG. MED. KILVANI",230],
	[20.29797, 73.0925, "P.S. KILVANI ENG. MEDIUM KILVANI",230],
	[20.12868, 73.07076, "C.P.S. KHANVEL ENG. MEDIUM KHANVEL",230],
	[20.27122, 72.93994, "C.P.S. NAROLI ENG.MEDIUM NAROLI",230],
	[20.22292, 73.02403, "C.P.S. RAKHOLI ENG. MEDIUM RAKHOLI",230],
	[20.24189, 73.01122, "P.S. PADRIPADA ENG.MEDIUM RAKHOLI",230],
	[20.19439, 73.02139, "P.S. DAPADA ENG.MED. DAPADA",230],
	[20.27784, 73.00355, "C.P.S. SILVASSA ENG. MEDIUM SILVASSA",230],
	[20.27576, 73.01509, "P.S.KAKADIYA FALIA ENG. MED. SILVASSA",230],
	[20.27671, 73.00472, "C.P.S. SILVASSA HINDI MEDIUM SILVASSA",230],
	[20.39528, 72.84806, "GPS PATLARA",230],
	[20.39167, 72.8425, "GPS BHARWADFALIA",230],
	[20.38611, 72.83917, "GPS BHAMTI",230],
	[20.37833, 72.85972, "GPS A/S ZARI",230],
	[20.39222, 72.82972, "GPS DAMANWADA E/M",230],
	[20.38, 72.845, "GPS NAILAPARDI",230],
	[20.395, 72.84778, "GPS PARIYARI",230],
	[20.36833, 72.83028, "GPS,VARLIWAD, JAMPORE",230],
	[20.3825, 72.84972, "GPS THANAPARDI",230],
	[20.40361, 72.845, "GPS AMBAWADI",230],
	[20.42389, 72.85389, "GPS BHENSROAD",230],
	[20.43028, 72.84944, "GPS DUNETHA",230],
	[20.40889, 72.85833, "GPS VARKUND",230],
	[20.41167, 72.87028, "GPS RINGANWADA",230],
	[20.41167, 72.82972, "GPS RINGANWADA E/M",230],
	[20.41, 72.88, "GPS DABHEL",230],
	[20.44306, 72.83361, "GPS MARWAD",230],
	[20.45278, 72.84639, "GPS DEVKA",230],
	[20.45917, 72.83361, "GPS DEVKA COLONY",230],
	[20.41389, 72.85278, "GPS KADAIYA",230],
	[20.45278, 72.85861, "GPS BHIMPORE",230],
	[20.45639, 72.87694, "GPS A/S BHIMPORE",230],
	[20.44694, 72.88194, "GPS MOTIVANKAD",230],
	[20.4425, 72.85306, "GPS DALWADA",230],
	[20.40778, 72.83417, "GPS MOTI DAMAN",230],
	[20.41611, 72.83806, "GPS MODEL SCHOOL NANI DAMAN (E/M)",230],
	[20.41861, 72.83111, "GPS KATHIRIYA",230],
	[20.41722, 72.84139, "GPS KHARIWADI",230],
	[20.39528, 72.84806, "GMS PATLARA",230],
	[20.39, 72.84, "GMS BHARWADFALIA",230],
	[20.38611, 72.83917, "GMS BHAMTI",230],
	[20.37833, 72.85972, "GMS ZARI",230],
	[20.38, 72.83, "GMS DAMANWADA E/M",230],
	[20.37806, 72.83389, "GMS PARIYARI",230],
	[20.38, 72.85, "GMS THANAPARDI",230],
	[20.40361, 72.845, "GMS AMBAWADI",230],
	[20.42389, 72.85389, "GMS BHENSROAD",230],
	[20.43028, 72.84944, "GMS DUNETHA",230],
	[20.4, 72.85, "GMS VARKUND",230],
	[20.3875, 72.87583, "GMS KACHIGAM",230],
	[20.41111, 72.88139, "GMS DABHEL",230],
	[20.44306, 72.83361, "GMS MARWAD",230],
	[20.45, 72.85, "GMS DEVKA",230],
	[20.45, 72.84, "GMS DEVKA COLONY",230],
	[20.40417, 72.85278, "GMS KADAIYA",230],
	[20.45333, 72.85944, "GMS BHIMPORE",230],
	[20.45639, 72.87694, "GMS A/S BHIMPORE",230],
	[20.44694, 72.88194, "GMS MOTIVANKAD",230],
	[20.4425, 72.845, "GMS DALWADA",230],
	[20.40778, 72.83417, "GMS MOTI DAMAN",230],
	[20.41361, 72.83444, "GMS NANIDAMAN(E/M) MODEL SCHOOL",230],
	[20.41861, 72.83111, "GMS KATHIRIYA",230],
	[20.39, 72.84, "GHS PATLARA",230],
	[20.38, 72.86, "GHS ZARI",230],
	[20.37, 72.82, "GHS Damanwada E/M",230],
	[20.38, 72.83, "GHS PARIYARI",230],
	[20.43, 72.85, "GHS DUNETHA",230],
	[20.41, 72.86, "GHS VARKUND",230],
	[20.41, 72.88, "GHS DABHEL",230],
	[20.44, 72.83, "GHS MARWAD",230],
	[20.4, 72.83, "GHS MOTIDAMAN",230],
	[20.7289, 70.9901, "GOVT. PRIMARY SCHOOL, GHOGHLA",230],
	[20.7286, 70.9903, "GOVT. HIGH SCHOOL(BOYS), GHOGHLA",230],
	[20.7169, 70.9857, "GOVT. PRIMARY SCHOOL NO.1, DIU",230],
	[20.7154, 70.9928, "GOVT. MIDDLE SCHOOL, DIU",230],
	[20.7158, 70.9933, "GOVT. HIGH SCHOOL(GIRLS), DIU",230],
	[20.7159, 70.993, "GOVT. TECHNICAL TRAINING INSTITUTE, DIU",230],
	[20.7154, 70.9928, "GOVT. PRIMARY SCHOOL. GANDHIPARA",230],
	[20.7139, 70.9617, "GOVT. PRIMARY/MIDDLE SCHOOL, FUDAM",230],
	[20.7111, 70.9482, "GOVT. PRIMARY SCHOOL, MALALA",230],
	[20.718, 70.9391, "GOVT. PRIMARY SCHOOL, KEVDI",230],
	[20.7053, 70.9082, "GOVT. PRIMARY/MIDDLE SCHOOL, NAGOA",230],
	[20.7053, 70.9082, "GOVT. HIGH SCHOOL, NAGOA",230],
	[20.7292, 70.9192, "GOVT. PRIMARY/MIDDLE SCHOOL, BUCHARWADA",230],
	[20.7297, 70.9281, "GOVT. HIGHER SECONDARY SCHOOL, BUCHARWADA",230],
	[20.7236, 70.9044, "GOVT. PRIMARY/MIDDLE SCHOOL, DAGACHI",230],
	[20.7236, 70.9044, "GOVT. HIGH SCHOOL, DAGACHI",230],
	[20.7205, 70.8861, "GOVT. PRIMARY SCHOOL, SAUDWADI",230],
	[20.7205, 70.8861, "GOVT. MIDDLE SCHOOL, SAUDWADI",230],
	[20.721, 70.8861, "GOVT. HIGH SCHOOL, SAUDWADI",230],
	[20.7153, 70.8768, "GOVT. PRIMARY SCHOOL NO.1, VANAKBARA",230],
	[20.7153, 70.8768, "GOVT. PRIMARY SCHOOL NO.2, VANAKBARA",230],
	[20.7099, 70.8752, "GOVT. PRIMARY SCHOOL NO.3, VANAKBARA",230],
	[20.7145, 70.8809, "GOVT. PRIMARY SCHOOL NO.4, VANAKBARA",230],
	[20.7139, 70.8811, "GOVT HIGHER SECONDARY SCHOOL, VANAKBARA",230],
	[20.7199, 70.8779, "GOVT HIGHER SEC. SCHOOL(G), VANAKBARA",230],
	[20.7297, 70.915, "GOVT. PRIMARY SCHOOL. PATELWADI",230]
]    