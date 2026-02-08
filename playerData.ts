// d-league web/playerData.ts

export interface PlayerProfile {
    id: string;
    teamId: string;
    name: string;
    englishName?: string;
    number: number;
    gender: string;
    nationality: string;
    age: number;
}

export const ALL_PLAYERS: PlayerProfile[] = [
    // ... (前面的球隊資料保持不變) ...

    // ==========================================
    // 瘋Dog (t_crazydog)
    // ==========================================
    { id: 'cd-19', teamId: 't_crazydog', number: 19, name: '吳亦民', englishName: 'Wu Yi Min', gender: '男', nationality: '台灣', age: 28 },
    { id: 'cd-17', teamId: 't_crazydog', number: 17, name: '林柏佑', englishName: 'LIN PO YU', gender: '男', nationality: '台灣', age: 25 },
    { id: 'cd-03', teamId: 't_crazydog', number: 3, name: '王柏元', englishName: 'Wang Po-Yuan', gender: '男', nationality: '台灣', age: 25 },
    { id: 'cd-14', teamId: 't_crazydog', number: 14, name: '劉佳興', englishName: 'Liu chia hsing', gender: '男', nationality: '台灣', age: 33 },
    { id: 'cd-24', teamId: 't_crazydog', number: 24, name: '文俊偉', englishName: 'WUN JYUN-WEI', gender: '男', nationality: '台灣', age: 43 },
    { id: 'cd-10', teamId: 't_crazydog', number: 10, name: '張博宇', englishName: 'Zhang boyu', gender: '男', nationality: '台灣', age: 21 },
    { id: 'cd-07', teamId: 't_crazydog', number: 7, name: '徐鐸', englishName: 'HSU TUO', gender: '男', nationality: '台灣', age: 38 },
    { id: 'cd-20', teamId: 't_crazydog', number: 20, name: '陳建宏', englishName: 'CHEN, MARCELO', gender: '男', nationality: '阿根廷', age: 37 },
    { id: 'cd-23', teamId: 't_crazydog', number: 23, name: '江展宇', englishName: 'Jan Yu Chiang', gender: '男', nationality: '台灣', age: 22 },
    { id: 'cd-09', teamId: 't_crazydog', number: 9, name: '王亦瑋', englishName: 'Wang Yiwei', gender: '男', nationality: '台灣', age: 23 },
    { id: 'cd-25', teamId: 't_crazydog', number: 25, name: '陳柏諧', englishName: 'Po Hsieh Chen', gender: '男', nationality: '台灣', age: 32 },
    { id: 'cd-22', teamId: 't_crazydog', number: 22, name: '蔡穎杰', englishName: 'TSAI YING CHIEN', gender: '男', nationality: '台灣/阿根廷', age: 42 },
    { id: 'cd-05', teamId: 't_crazydog', number: 5, name: '劉力瑋', englishName: 'LIU-LI-WEI', gender: '男', nationality: '台灣', age: 35 },
    { id: 'cd-06', teamId: 't_crazydog', number: 6, name: '楊承諺', englishName: 'Yang-Cheng-Yen', gender: '男', nationality: '台灣', age: 29 },
    { id: 'cd-08', teamId: 't_crazydog', number: 8, name: '吳詠祥', englishName: 'Wu-Yong-Xiang', gender: '男', nationality: '台灣', age: 19 },
    // ✅ 新增：王佳祈
    { id: 'cd-14-new', teamId: 't_crazydog', number: 14, name: '王佳祈', englishName: 'WANG,JIA-QI', gender: '男', nationality: '台灣', age: 25 },

    // ... (後面的球隊資料保持不變) ...
    // ==========================================
    // 鳥仕足球俱樂部 (t_niaoshi)
    // ==========================================
    { id: 'ns-10', teamId: 't_niaoshi', number: 10, name: '許御力', englishName: 'Shu Yu-li', gender: '男', nationality: '台灣', age: 41 },
    { id: 'ns-14', teamId: 't_niaoshi', number: 14, name: '王志誠', englishName: 'Wong Chi Shing', gender: '男', nationality: '香港', age: 32 },
    { id: 'ns-08', teamId: 't_niaoshi', number: 8, name: '于克元', englishName: 'YU KE YUAN', gender: '男', nationality: '台灣', age: 30 },
    { id: 'ns-20', teamId: 't_niaoshi', number: 20, name: '于克偉', englishName: 'YU,KE-WEI', gender: '男', nationality: '台灣', age: 36 },
    { id: 'ns-06', teamId: 't_niaoshi', number: 6, name: '吳昱陞', englishName: 'YuSheng Wu', gender: '男', nationality: '台灣', age: 22 },
    { id: 'ns-76', teamId: 't_niaoshi', number: 76, name: '鄭祖鏗', englishName: 'Cheng Cho Hang', gender: '男', nationality: '香港', age: 25 },
    { id: 'ns-77', teamId: 't_niaoshi', number: 77, name: '李家諾', englishName: 'Chia No Lee', gender: '男', nationality: '台灣', age: 29 },
    { id: 'ns-03', teamId: 't_niaoshi', number: 3, name: '陳光禪', englishName: 'Chen guang chen', gender: '男', nationality: '台灣', age: 37 },
    { id: 'ns-25', teamId: 't_niaoshi', number: 25, name: '王竣弘', englishName: 'CHUN-HONG WANG', gender: '男', nationality: '台灣', age: 24 },
    { id: 'ns-29', teamId: 't_niaoshi', number: 29, name: '林耀強', englishName: 'LAM YIU KEUNG', gender: '男', nationality: '台灣', age: 42 },
    { id: 'ns-01', teamId: 't_niaoshi', number: 1, name: '謝俊杰', englishName: 'Chun Kit Tse', gender: '男', nationality: '香港', age: 28 },
    { id: 'ns-17', teamId: 't_niaoshi', number: 17, name: '高義莉', englishName: 'Marie Theresa Gantner', gender: '女', nationality: '德國', age: 28 },
    { id: 'ns-26', teamId: 't_niaoshi', number: 26, name: '陳宇翔', englishName: 'Tan Yu Xiang', gender: '男', nationality: '馬來西亞', age: 25 },
    { id: 'ns-30', teamId: 't_niaoshi', number: 30, name: '陳學璋', englishName: 'Chen Hsueh Chang', gender: '男', nationality: '台灣', age: 33 },
    { id: 'ns-19', teamId: 't_niaoshi', number: 19, name: '陳遠泰', englishName: 'Cheng Yuan Tai', gender: '男', nationality: '台灣', age: 40 },
    { id: 'ns-09', teamId: 't_niaoshi', number: 9, name: '蘇智龍', englishName: 'Su Jhih Long', gender: '男', nationality: '台灣', age: 22 },
    { id: 'ns-91', teamId: 't_niaoshi', number: 91, name: '翁吉韡', englishName: 'Went Ji Wei', gender: '男', nationality: '台灣', age: 23 },
    { id: 'ns-11', teamId: 't_niaoshi', number: 11, name: '戴威閎', englishName: 'Dai Wei Hong', gender: '男', nationality: '台灣', age: 22 },
    { id: 'ns-16', teamId: 't_niaoshi', number: 16, name: '黃首駿', englishName: 'Wong Sau Chun', gender: '男', nationality: '香港', age: 30 },
    { id: 'ns-27', teamId: 't_niaoshi', number: 27, name: '劉康任', englishName: 'Liu Keng Jen', gender: '男', nationality: '台灣', age: 26 },

    // ==========================================
    // PPI TAINAN FC (t_ppi)
    // ==========================================
    { id: 'ppi-11', teamId: 't_ppi', number: 11, name: '杰菲', englishName: 'CEVIN ADE PRATAMA', gender: '男', nationality: '印尼', age: 26 },
    { id: 'ppi-12', teamId: 't_ppi', number: 12, name: '木哈馬', englishName: 'MUHAMAD RIZKI', gender: '男', nationality: '印尼', age: 23 },
    { id: 'ppi-29', teamId: 't_ppi', number: 29, name: 'Iradaf Mandaya G.A Bahrun', englishName: 'IRADAF MANDAYA G.A BAHRUN', gender: '男', nationality: '印尼', age: 34 },
    { id: 'ppi-08', teamId: 't_ppi', number: 8, name: '萬地', englishName: 'MUHAMMAD IWANDI', gender: '男', nationality: '印尼', age: 32 },
    { id: 'ppi-17', teamId: 't_ppi', number: 17, name: '伊拉曼', englishName: 'ILHAM FIRDAUS SUNARTO', gender: '男', nationality: '印尼', age: 23 },
    { id: 'ppi-92', teamId: 't_ppi', number: 92, name: '伊而凡', englishName: 'IRFAN KHOLIQ AJI SUK', gender: '男', nationality: '印尼', age: 29 },
    { id: 'ppi-99', teamId: 't_ppi', number: 99, name: '麥羅', englishName: 'MANARUL HIDAYAT', gender: '男', nationality: '印尼', age: 26 },
    { id: 'ppi-10', teamId: 't_ppi', number: 10, name: '拉非', englishName: 'RAFIF JAMIL', gender: '男', nationality: '印尼', age: 24 },
    { id: 'ppi-94', teamId: 't_ppi', number: 94, name: '孺立', englishName: 'RANGGA RULIANTO', gender: '男', nationality: '印尼', age: 21 },
    { id: 'ppi-07', teamId: 't_ppi', number: 7, name: '布丹', englishName: 'RIZKY PERDANA PUTRA', gender: '男', nationality: '印尼', age: 25 },
    { id: 'ppi-27', teamId: 't_ppi', number: 27, name: '高世科', englishName: 'CAO THE KHOA', gender: '男', nationality: '越南', age: 26 },
    { id: 'ppi-19', teamId: 't_ppi', number: 19, name: 'YEHUDA GAGAH WICAKSONO', englishName: 'YEHUDA GAGAH WICAKSONO', gender: '男', nationality: '印尼', age: 18 },
    { id: 'ppi-25', teamId: 't_ppi', number: 25, name: '優沙', englishName: 'YOSUA TATAK WIBAWA', gender: '男', nationality: '印尼', age: 30 },
    { id: 'ppi-98', teamId: 't_ppi', number: 98, name: '拉拉', englishName: 'LINGGA ANDI LALA', gender: '男', nationality: '印尼', age: 27 },
    { id: 'ppi-03', teamId: 't_ppi', number: 3, name: '阿麥德', englishName: 'AHMAD ANTRI WAHYUDI', gender: '男', nationality: '印尼', age: 28 },
    { id: 'ppi-18', teamId: 't_ppi', number: 18, name: '牙提', englishName: 'TOMI HARYADI', gender: '男', nationality: '印尼', age: 26 },
    { id: 'ppi-95', teamId: 't_ppi', number: 95, name: '蘇凡迪', englishName: 'SUKMA HADI NOVANDI', gender: '男', nationality: '印尼', age: 26 },
    { id: 'ppi-96', teamId: 't_ppi', number: 96, name: '劉駿輝', englishName: 'YEREMIA IMMANUEL SUSILO', gender: '男', nationality: '印尼', age: 25 },

    // ==========================================
    // 蒼龍FC (t_canglong)
    // ==========================================
    { id: 'cl-07', teamId: 't_canglong', number: 7, name: '盧冠宇', englishName: 'Lu Kuan Yu', gender: '男', nationality: '台灣', age: 26 },
    { id: 'cl-06', teamId: 't_canglong', number: 6, name: '王浩誠', englishName: 'Wang Hao Cheng', gender: '男', nationality: '台灣', age: 28 },
    { id: 'cl-10', teamId: 't_canglong', number: 10, name: '毛邦澤', englishName: 'Mao Peng Tse', gender: '男', nationality: '台灣', age: 21 },
    { id: 'cl-05', teamId: 't_canglong', number: 5, name: '葉晉嘉', englishName: 'Yeh Jin Jia', gender: '男', nationality: '台灣', age: 21 },
    { id: 'cl-18', teamId: 't_canglong', number: 18, name: '張丞均', englishName: 'Jhang Cheng Jyun', gender: '男', nationality: '台灣', age: 17 },
    { id: 'cl-04', teamId: 't_canglong', number: 4, name: '林聖恩', englishName: 'Lin Sheng En', gender: '男', nationality: '台灣', age: 20 },
    { id: 'cl-15', teamId: 't_canglong', number: 15, name: '洪子程', englishName: 'Hung Zhi Cheng', gender: '男', nationality: '台灣', age: 16 },
    { id: 'cl-08', teamId: 't_canglong', number: 8, name: '潘晨維', englishName: 'Pan Cheng Wei', gender: '男', nationality: '台灣', age: 19 },
    { id: 'cl-21', teamId: 't_canglong', number: 21, name: '郭彥廷', englishName: 'Kuo Yen Ting', gender: '男', nationality: '台灣', age: 18 },
    { id: 'cl-39', teamId: 't_canglong', number: 39, name: '鄧子博', englishName: 'Teng Tz Bo', gender: '男', nationality: '台灣', age: 16 },
    { id: 'cl-17', teamId: 't_canglong', number: 17, name: '丁誌暉', englishName: 'Din Zhi Hui', gender: '男', nationality: '台灣/美國', age: 18 },
    { id: 'cl-19', teamId: 't_canglong', number: 19, name: '林湧鈞', englishName: 'Lin Yung Chun', gender: '男', nationality: '台灣', age: 18 },
    { id: 'cl-23', teamId: 't_canglong', number: 23, name: '黃歷迦', englishName: 'Wong Lik ka', gender: '男', nationality: '香港', age: 27 },
    { id: 'cl-01', teamId: 't_canglong', number: 1, name: '吳嘉華', englishName: 'Wu Jia Hua', gender: '男', nationality: '台灣', age: 27 },
    { id: 'cl-11', teamId: 't_canglong', number: 11, name: '林家鈞', englishName: 'LIN CHIA-CHUN', gender: '男', nationality: '台灣', age: 20 },
    { id: 'cl-69', teamId: 't_canglong', number: 69, name: '曾少凱', englishName: 'TSENG,SHAO-KAI', gender: '男', nationality: '台灣', age: 21 },
    { id: 'cl-14', teamId: 't_canglong', number: 14, name: '蘇宗霆', englishName: 'TSUNG-TING SU', gender: '男', nationality: '台灣', age: 32 },
    { id: 'cl-24', teamId: 't_canglong', number: 24, name: '吳志華', englishName: 'WU ZHIH HUA', gender: '男', nationality: '台灣', age: 31 },
    { id: 'cl-03', teamId: 't_canglong', number: 3, name: '李昆鴻', englishName: 'LI,KUN-HONG', gender: '男', nationality: '台灣', age: 27 },
    { id: 'cl-77', teamId: 't_canglong', number: 77, name: '郭愈', englishName: 'KUO YU', gender: '男', nationality: '台灣', age: 19 },
];