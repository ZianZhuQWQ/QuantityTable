// 页面路径：store/index.js 
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex); //vue的插件机制

//Vuex.Store 构造器选项
const store = new Vuex.Store({
	state: { //存放状态
		nurse: '', // 登录成功存放护士id

		created_at: '', //五个表的登录时间

		result_created_at: '', //老人某次的getQuest

		minicog_score2: '',


		patientInfoData: {
			patient_id: [],
			patient_name: [],
			created_at: [],
			mobile: []
		},




		evaluateFormData: {},
		miniCogData: {},
		hisData: {},
		mmseData: {},
		evaluateFormItems: [{
				label: '名字',
				key: 'patient_name',
				type: 'input'
			},
			{
				label: '性别',
				key: 'sex',
				type: 'radio',
				options: [{
					label: '男',
					value: '1',
				}, {
					label: '女',
					value: '0',
				}]
			},
			{
				label: '年龄',
				key: 'age',
				type: 'number'
			},
			// {
			// 	label: '身高',
			// 	key: 'height',
			// 	type: 'number'
			// },
			// {
			// 	label: '体重',
			// 	key: 'weight',
			// 	type: 'number'
			// },
			{
				label: 'bmi[请输入身高体重，例如：1.6,45 ]',
				key: 'bmi',
				type: 'number'
			},
			{
				label: '出生地',
				key: 'birthplace',
				type: 'input'
			},
			{
				label: '长期居住地',
				key: 'address',
				type: 'input'
			},
			{
				label: '长期居住地（具体）',
				key: 'city',
				type: 'radio',
				options: [{
					label: '城市',
					value: 'city',
				}, {
					label: '农村',
					value: 'village',
				}]
			},
			{
				label: '职业',
				key: 'career',
				type: 'radio',
				options: [{
					label: '国家公务员',
					value: '0',
				}, {
					label: '专业技术人员',
					value: '1',
				}, {
					label: '农、林、牧、渔业人员',
					value: '2',
				}, {
					label: '社会生产和生活服务人员',
					value: '3',
				}, {
					label: '其他不便分类的从业人员',
					value: '4',
				}]
			},
			{
				label: '毒药物接触史',
				key: 'drug',
				type: 'radio',
				options: [{
					label: '是',
					value: '1',
				}, {
					label: '否',
					value: '0',
				}],
			},
			{
				label: '具体毒药物接触史',
				key: 'drug_detail',
				type: 'input',
				showCondition: {
					key: 'drug',
					value: '1'
				}
			},
			{
				label: '长期滥用药物史',
				key: 'drug_history',
				type: 'input',
			},
			{
				label: '吸烟史',
				key: 'smoke',
				type: 'radio',
				options: [{
					label: '是',
					value: '1',
				}, {
					label: '否',
					value: '0',
				}],
			},
			{
				label: '吸烟几年',
				key: 'smoke_age',
				type: 'number',
				showCondition: {
					key: 'smoke',
					value: '1'
				}
			},
			{
				label: '每天几支烟',
				key: 'smoke_avg',
				type: 'number',
				showCondition: {
					key: 'smoke',
					value: '1'
				}
			},
			{
				label: '是否戒烟',
				key: 'smoke_quit',
				type: 'radio',
				options: [{
					label: '是',
					value: '1',
				}, {
					label: '否',
					value: '0',
				}],
				showCondition: {
					key: 'smoke',
					value: '1'
				}
			},
			{
				label: '饮酒史',
				key: 'alcohol',
				type: 'radio',
				options: [{
					label: '是',
					value: '1',
				}, {
					label: '否',
					value: '0',
				}],
			},
			{
				label: '饮酒几年',
				key: 'alcohol_age',
				type: 'number',
				showCondition: {
					key: 'alcohol',
					value: '1'
				}
			},
			{
				label: '每天几多酒',
				key: 'alcohol_avg',
				type: 'number',
				showCondition: {
					key: 'alcohol',
					value: '1'
				}
			},
			{
				label: '是否戒酒',
				key: 'alcohol_quit',
				type: 'radio',
				options: [{
					label: '是',
					value: '1',
				}, {
					label: '否',
					value: '0',
				}],
				showCondition: {
					key: 'alcohol',
					value: '1'
				}
			},
			{
				label: '兴趣爱好',
				key: 'hobby',
				type: 'radio',
				options: [{
					label: '游泳',
					value: '0',
				}, {
					label: '羽毛球',
					value: '1',
				}, {
					label: '跑步',
					value: '2',
				}, {
					label: '乒乓球',
					value: '3',
				}],
			},
			{
				label: '兴趣爱好_智力游戏',
				key: 'hobby_puzzle',
				type: 'input'
			},
			{
				label: '兴趣爱好_音乐',
				key: 'hobby_music',
				type: 'input'
			},
			{
				label: '兴趣爱好_乐器',
				key: 'hobby_instrument',
				type: 'input'
			},
			{
				label: '兴趣爱好_其他',
				key: 'hobby_others',
				type: 'input'
			},
			{
				label: '饮食习惯',
				key: 'habit_diet',
				type: 'radio',
				options: [{
					label: '高盐高脂',
					value: '0',
				}, {
					label: '高蛋白饮食',
					value: '1',
				}, {
					label: '清淡',
					value: '2',
				}, {
					label: '素食',
					value: '3',
				}, {
					label: '夜宵',
					value: '4',
				}],
			},
			{
				label: '生活习惯_按时刷牙',
				key: 'habit_brushteeth',
				type: 'radio',
				options: [{
					label: '是',
					value: '1',
				}, {
					label: '否',
					value: '0',
				}],
			},
			{
				label: '生活习惯_熬夜',
				key: 'habit_stayup',
				type: 'radio',
				options: [{
					label: '是',
					value: '1',
				}, {
					label: '否',
					value: '0',
				}],
			},
			{
				label: '生活习惯_睡眠障碍',
				key: 'habit_sleep',
				type: 'radio',
				options: [{
					label: '入睡困难',
					value: '0',
				}, {
					label: '易醒',
					value: '1',
				}, {
					label: '多梦',
					value: '2',
				}, {
					label: '多尿',
					value: '3',
				}, {
					label: '打鼾',
					value: '4',
				}, {
					label: '其他',
					value: '5',
				}],
			},
			{
				label: '性格',
				key: 'personality',
				type: 'radio',
				options: [{
					label: '内向',
					value: '1',
				}, {
					label: '外向',
					value: '0',
				}],
			},
			{
				label: '是否独立处理财务问题',
				key: 'finance',
				type: 'radio',
				options: [{
					label: '是',
					value: '1',
				}, {
					label: '否',
					value: '0',
				}],
			},
			{
				label: '高血压病',
				key: 'hypertension',
				type: 'radio',
				options: [{
					label: '是',
					value: '1',
				}, {
					label: '否',
					value: '0',
				}],
			},
			{
				label: '高血压病_血压控制良好',
				key: 'hypertension_control',
				type: 'radio',
				options: [{
					label: '是',
					value: '1',
				}, {
					label: '否',
					value: '0',
				}],
				showCondition: {
					key: 'hypertension',
					value: '1'
				}
			},
			{
				label: '高血压病_治疗药',
				key: 'hypertension_medicine',
				type: 'radio',
				options: [{
					label: 'CCB',
					value: '0',
				}, {
					label: 'ACEI',
					value: '1',
				}, {
					label: 'ARB',
					value: '2',
				}, {
					label: 'β受体阻滞剂',
					value: '3',
				}, {
					label: '利尿剂',
					value: '4',
				}],
				showCondition: {
					key: 'hypertension',
					value: '1'
				}
			},
			{
				label: '冠心病',
				key: 'cad',
				type: 'radio',
				options: [{
					label: '是',
					value: '1',
				}, {
					label: '否',
					value: '0',
				}],
			},
			{
				label: '冠心病_治疗药',
				key: 'cad_medicine',
				type: 'radio',
				options: [{
					label: '阿司匹林肠溶片',
					value: '0',
				}, {
					label: '他汀类',
					value: '1',
				}],
				showCondition: {
					key: 'cad',
					value: '1'
				}
			},
			{
				label: '糖尿病',
				key: 'diabetes',
				type: 'radio',
				options: [{
					label: '是',
					value: '1',
				}, {
					label: '否',
					value: '0',
				}],
			},
			{
				label: '糖尿病_血糖控制良好',
				key: 'diabetes_control',
				type: 'radio',
				options: [{
					label: '是',
					value: '1',
				}, {
					label: '否',
					value: '0',
				}],
				showCondition: {
					key: 'diabetes',
					value: '1'
				}
			},
			{
				label: '糖尿病_治疗药',
				key: 'diabetes_medicine',
				type: 'radio',
				options: [{
					label: '磺脲类',
					value: '0',
				}, {
					label: '双胍类',
					value: '1',
				}, {
					label: 'α糖苷酶抑制剂',
					value: '2',
				}, {
					label: 'SGLT23SGLT2',
					value: '3',
				}, {
					label: 'DPP4抑制剂',
					value: '4',
				}, {
					label: '胰岛素',
					value: '5',
				}],
				showCondition: {
					key: 'diabetes',
					value: '1'
				}
			},
			{
				label: '家族遗传史',
				key: 'hereditary',
				type: 'radio',
				options: [{
					label: '冠心病',
					value: '0',
				}, {
					label: '高血压病',
					value: '1',
				}, {
					label: '糖尿病',
					value: '2',
				}, {
					label: '帕金森病',
					value: '3',
				}, {
					label: '痴呆',
					value: '4',
				}],
			},
			{
				label: '家族遗传史_其他',
				key: 'hereditary_others',
				type: 'input'
			},
		],
		hisItems: [{
				label: '1、急性起病',
				key: 'acute_onset',
				type: 'radio',
				options: [{
					label: '是',
					value: 2,
				}, {
					label: '否',
					value: 0,
				}]
			},
			{
				label: '2、阶梯式恶化',
				key: 'step_deterioration',
				type: 'radio',
				options: [{
					label: '是',
					value: 1,
				}, {
					label: '否',
					value: 0,
				}]
			},
			{
				label: '3、波动性病程',
				key: 'fluctuating_course',
				type: 'radio',
				options: [{
					label: '是',
					value: 2,
				}, {
					label: '否',
					value: 0,
				}]
			},
			{
				label: '4、夜间意识模糊',
				key: 'unconscious',
				type: 'radio',
				options: [{
					label: '是',
					value: 1,
				}, {
					label: '否',
					value: 0,
				}]
			},
			{
				label: '5、人格相对保持完整',
				key: 'integrate_personalities',
				type: 'radio',
				options: [{
					label: '是',
					value: 1,
				}, {
					label: '否',
					value: 0,
				}]
			},
			{
				label: '6、情绪低落',
				key: 'depression',
				type: 'radio',
				options: [{
					label: '是',
					value: 1,
				}, {
					label: '否',
					value: 0,
				}]
			},
			{
				label: '7、身体诉述',
				key: 'body_state',
				type: 'radio',
				options: [{
					label: '是',
					value: 1,
				}, {
					label: '否',
					value: 0,
				}]
			},
			{
				label: '8、情感失禁',
				key: 'affective_incontinence',
				type: 'radio',
				options: [{
					label: '是',
					value: 1,
				}, {
					label: '否',
					value: 0,
				}]
			},
			{
				label: '9、有高血压或高血压史 ',
				key: 'hypertension',
				type: 'radio',
				options: [{
					label: '是',
					value: 1,
				}, {
					label: '否',
					value: 0,
				}]
			},
			{
				label: '10、中风史',
				key: 'stroke',
				type: 'radio',
				options: [{
					label: '是',
					value: 1,
				}, {
					label: '否',
					value: 0,
				}]
			},
			{
				label: '11、动脉硬化',
				key: 'arteriosclerotic',
				type: 'radio',
				options: [{
					label: '是',
					value: 1,
				}, {
					label: '否',
					value: 0,
				}]
			},
			{
				label: '12、局灶神经系统症状',
				key: 'neurological_symptoms',
				type: 'radio',
				options: [{
					label: '是',
					value: 1,
				}, {
					label: '否',
					value: 0,
				}]
			},
			{
				label: '13、局灶神经系体征',
				key: 'neurological_signs',
				type: 'radio',
				options: [{
					label: '是',
					value: 2,
				}, {
					label: '否',
					value: 0,
				}]
			},
		],
		mmseItems: [{
				key: 'age',
				tips: '年龄',
				result: {
					label: '年龄',
					type: 'input',
				}
			},
			{
				key: 'sex',
				tips: '性别',
				result: {
					label: '性别',
					type: 'input',
				}
			},
			{
				key: 'mobile',
				tips: '手机号',
				result: {
					label: '手机号',
					type: 'input',
				}
			},
			{
				key: 'education',
				tips: '教育年限',
				result: {
					label: '教育年限',
					type: 'input',
				}
			},
			{
				key: 'address',
				tips: '地址',
				result: {
					label: '地址',
					type: 'input',
				}
			},
			{
				key: 'initial_diagnosis',
				tips: '初步诊断',
				result: {
					label: '初步诊断',
					type: 'input',
				}
			},
			{
				key: 'time_ability',
				tips: '现在是星期几？\n几号？\n几月？\n什么季节？\n那一年？',
				result: {
					label: '答对个数',
					type: 'radio',
					options: [{
						label: '0',
						value: 0,
					}, {
						label: '1',
						value: 1,
					}, {
						label: '2',
						value: 2,
					}, {
						label: '3',
						value: 3,
					}, {
						label: '4',
						value: 4,
					}, {
						label: '5',
						value: 5,
					}]
				}
			},
			{
				key: 'space_ability',
				tips: '我们在什么省？\n什么市？\n什么医院？\n什么科室？\n第几层楼？',
				result: {
					label: '答对个数',
					type: 'radio',
					options: [{
						label: '0',
						value: 0,
					}, {
						label: '1',
						value: 1,
					}, {
						label: '2',
						value: 2,
					}, {
						label: '3',
						value: 3,
					}, {
						label: '4',
						value: 4,
					}, {
						label: '5',
						value: 5,
					}]
				}
			},
			{
				key: 'memory',
				tips: '现在我要说三样东西的名称，请记住，并重复，过几分钟后会问您',
				result: {
					label: '答对个数',
					type: 'radio',
					options: [{
						label: '0',
						value: 0,
					}, {
						label: '1',
						value: 1,
					}, {
						label: '2',
						value: 2,
					}, {
						label: '3',
						value: 3,
					}]
				}
			},
			{
				key: 'concentration',
				tips: '100 - 7 等于几？再减 7？\n再减 7？\n再减 7？\n再减 7？',
				result: {
					label: '答对个数',
					type: 'radio',
					options: [{
						label: '0',
						value: 0,
					}, {
						label: '1',
						value: 1,
					}, {
						label: '2',
						value: 2,
					}, {
						label: '3',
						value: 3,
					}, {
						label: '4',
						value: 4,
					}, {
						label: '5',
						value: 5,
					}]
				}
			},
			{
				key: 'recollection',
				tips: '重复刚刚三样东西',
				result: {
					label: '答对个数',
					type: 'radio',
					options: [{
						label: '0',
						value: 0,
					}, {
						label: '1',
						value: 1,
					}, {
						label: '2',
						value: 2,
					}, {
						label: '3',
						value: 3,
					}]
				}
			},
			{
				key: 'linguistic1',
				tips: '这是什么东西？',
				imgSrc: 'http://47.113.91.80:8002/upload/images/watches.png',

				result: {
					label: '是否答对',
					type: 'radio',
					options: [{
						label: '是',
						value: 1,
					}, {
						label: '否',
						value: 0,
					}]
				}
			},
			{
				key: 'linguistic2',
				tips: '这是什么东西？',
				imgSrc: 'http://47.113.91.80:8002/upload/images/pen.png',
				result: {
					label: '是否答对',
					type: 'radio',
					options: [{
						label: '是',
						value: 1,
					}, {
						label: '否',
						value: 0,
					}]
				}
			},
			{
				key: 'linguistic3',
				tips: '重复医生的话：四十四只石狮子',
				result: {
					label: '是否答对',
					type: 'radio',
					options: [{
						label: '是',
						value: 1,
					}, {
						label: '否',
						value: 0,
					}]
				}
			},
			{
				key: 'linguistic4_1',
				tips: '按照医生指示行动：用右手拿着纸，用两只手将它对折起来，放在您的大腿上',
				result: {
					label: '答对个数',
					type: 'radio',
					options: [{
						label: '0',
						value: 0,
					}, {
						label: '1',
						value: 1,
					}, {
						label: '2',
						value: 2,
					}, {
						label: '3',
						value: 3,
					}]
				}
			},
			{
				key: 'linguistic4_2',
				tips: '按照医生指示行动：请您念一念这句话，并按它的意思去做',
				result: {
					label: '是否答对',
					type: 'radio',
					options: [{
						label: '是',
						value: 1,
					}, {
						label: '否',
						value: 0,
					}]
				}
			},
			{
				key: 'linguistic4_3',
				tips: '按照医生指示行动：请您写一句完整的句子。（句子必须有主语、谓语、宾语）',
				imgSrc: '',
				result: {
					label: '是否答对',
					type: 'radio',
					options: [{
						label: '是',
						value: 1,
					}, {
						label: '否',
						value: 0,
					}]
				}
			},
			{
				key: 'linguistic4_4',
				tips: '这是一张图，请您在同一张纸上照样画出来',
				imgSrc: '../../../static/linguistic4_4.png',
				// 附件
				attachment: [{
					key: 'linguistic4_4_img',
					type: 'img',
				}],
				result: {
					label: '是否答对',
					type: 'radio',
					options: [{
						label: '是',
						value: 1,
					}, {
						label: '否',
						value: 0,
					}]
				}
			},
			{
				key: 'clinical_impression',
				tips: '临床印象',
				result: {
					label: '临床印象',
					type: 'input',
				}
			},
			{
				key: 'hostipal',
				tips: '评定医师',
				result: {
					label: '评定医师',
					type: 'input',
				}
			},

		],
		mocaItems: [{
				key: 'visual_exec1',
				tips: '我们有时会用‘123……’或者汉语的‘甲乙丙……’来表示顺序。\n请您按照从数字到汉字并逐渐升高的顺序画一条连线。]',
				imgSrc: 'http://47.113.91.80:8002/upload/images/visual_exec1.png',
				// 附件
				attachment: [{
					key: 'visual_exec1_img',
					type: 'img',
				}],
				result: {
					label: '评分',
					type: 'radio',
					options: [{
						label: '出现任何错误而没有立刻自我纠正',
						value: 0,
					}, {
						label: '完全按照“１-甲-２-乙-３-丙-４-丁-５-戊”\n的顺序进行连线且没有任何交叉线',
						value: 1,
					}]
				}
			},
			{
				key: 'visual_exec2',
				tips: '请您照着这幅图在下面的空白处再画一遍，并尽可能精确',
				imgSrc: 'http://47.113.91.80:8002/upload/images/visual_exec2.png',
				// 附件
				attachment: [{
					key: 'visual_exec2_img',
					type: 'img',
				}],
				result: {
					label: '评分',
					type: 'radio',
					options: [{
						label: '上述标准中，只要违反其中任何一条',
						value: 0,
					}, {
						label: '图形为三维结构,\n所有的线都存在\n无多余的线\n相对的边基本平行，\n长度基本一致（长方体或棱柱体也算正确）',
						value: 1,
					}]
				}
			},
			{
				key: 'visual_exec3',
				tips: '请您在此处画一个钟表，\n填上所有的数字并指示出11点10分',
				// 附件
				attachment: [{
					key: 'visual_exec3_img',
					type: 'img',
				}],
				imgSrc: '',
				result: {
					label: '答对个数',
					type: 'checkbox',
					customComputation: (value) => {
						let newValue = 0;
						value?.forEach((v) => {
							if (v != 0) newValue += 1;
						});
						return newValue
					},
					options: [{

							label: '违反其中任何一条，',
							value: 0,
						}, {

							label: '轮廓：表面必须是个圆，允许有轻微的缺陷（如，圆没有闭合）',
							value: 1,
						}, {

							label: '数字：所有的数字必须完整且无多余的数字；\n数字顺序必须正确且在所属的象限内；\n可以是罗马数字；\n数字可以放在圆圈之外。',
							value: 2,
						},
						{

							label: '指针：必须有两个指针且一起指向正确的时间；\n时针必须明显短于分针；\n指针的中心交点必须在表内且接近于钟表的中心',
							value: 3,
						}
					]
				}
			},
			{
				key: 'christen1',
				tips: '请您告诉我这个动物的名字',
				imgSrc: 'http://47.113.91.80:8002/upload/images/christen1.png',
				result: {
					label: '是否答对',
					type: 'radio',
					options: [{
						label: '是',
						value: 1,
					}, {
						label: '否',
						value: 0,
					}]
				}
			},
			{
				key: 'christen2',
				tips: '请您告诉我这个动物的名字',
				imgSrc: 'http://47.113.91.80:8002/upload/images/christen2.png',
				result: {
					label: '是否答对',
					type: 'radio',
					options: [{
						label: '是',
						value: 1,
					}, {
						label: '否',
						value: 0,
					}]
				}
			},
			{
				key: 'christen3',
				tips: '请您告诉我这个动物的名字',
				imgSrc: 'http://47.113.91.80:8002/upload/images/christen3.png',
				result: {
					label: '是否答对',
					type: 'radio',
					options: [{
						label: '是',
						value: 1,
					}, {
						label: '否',
						value: 0,
					}]
				}
			},
			{
				key: 'attention1',
				tips: '下面我说一些数字，您仔细听，当我说完时您就跟着照样背出来',
				result: {
					label: '复述准确',
					type: 'radio',
					options: [{
						label: '是',
						value: 1,
					}, {
						label: '否',
						value: 0,
					}]
				}
			},
			{
				key: 'attention2',
				tips: '下面我再说一些数字，您仔细听，但是当我说完时您必须按照原数倒着背出来',
				result: {
					label: '复述准确',
					type: 'radio',
					options: [{
						label: '是',
						value: 1,
					}, {
						label: '否',
						value: 0,
					}]
				}
			},
			{
				key: 'attention3',
				tips: '下面我要读出一系列数字，请注意听。\n每当我读到１的时候，您就拍一下手。\n当我读其他的数字时不要拍手？',
				result: {
					label: '是否答对',
					type: 'radio',
					options: [{
						label: '完全正确或出现一次错误',
						value: 1,
					}, {
						label: '出现两次及两次以上错误',
						value: 0,
					}]
				}
			},
			{
				key: 'attention4',
				tips: '现在请您做一道计算题，\n从100中减去一个7，\n而后从得数中再减去一个7，\n一直往下减，直到我让您停下为止？',
				result: {
					label: '计算正确个数',
					type: 'radio',
					options: [{
						label: '0个',
						value: 0,
					}, {
						label: '1个',
						value: 1,
					}, {
						label: '2个',
						value: 2,
					}, {
						label: '3个',
						value: 2,
					}, {
						label: '4个',
						value: 3,
					}, {
						label: '5个',
						value: 3,
					}]
				}
			},
			{
				key: 'language1',
				tips: '重复医生的话：我只知道今天张亮是来帮过忙的人',
				result: {
					label: '复述是否准确',
					type: 'radio',
					options: [{
						label: '是',
						value: 1,
					}, {
						label: '否',
						value: 0,
					}]
				}
			},
			{
				key: 'language2',
				tips: '重复医生的话：狗在房间的时候，猫总是躲在沙发下面',
				result: {
					label: '复述是否准确',
					type: 'radio',
					options: [{
						label: '是',
						value: 1,
					}, {
						label: '否',
						value: 0,
					}]
				}
			},
			{
				key: 'language3',
				tips: '一分钟内尽可能多地说出您所知道的动物的名称',
				imgSrc: '',
				result: {
					label: '１分钟内说出的动物是否名称≥11个',
					type: 'radio',
					options: [{
						label: '是',
						value: 1,
					}, {
						label: '否',
						value: 0,
					}]
				}
			},
			{
				key: 'abstract1',
				tips: '请您说说桔子和香蕉在什么方面相类似？再想想火车和自行车在什么方面相类似',
				imgSrc: '',
				result: {
					label: '回答是否正确',
					type: 'radio',
					options: [{
						label: '是',
						value: 1,
					}, {
						label: '否',
						value: 0,
					}]
				}
			},
			{
				key: 'abstract2',
				tips: '您再说说手表和尺子在什么方面相类似？',
				result: {
					label: '是否答对',
					type: 'radio',
					options: [{
						label: '是',
						value: 1,
					}, {
						label: '否',
						value: 0,
					}]
				}
			},
			{
				key: 'delay_memory',
				tips: '刚才我给您读了几个词让您记住，请您再尽量回忆一下，告诉我这些词都有什么？',
				result: {
					label: '在没有提示的情况下正确回忆起来的词语个数',
					type: 'radio',
					options: [{
						label: '0个',
						value: 0,
					}, {
						label: '1个',
						value: 1,
					}, {
						label: '2个',
						value: 2,
					}, {
						label: '3个',
						value: 2,
					}, {
						label: '4个',
						value: 3,
					}, {
						label: '5个',
						value: 3,
					}]
				}
			},
			{
				key: 'direct',
				tips: '告诉我今天是什么日期？\n告诉我这是什么地方，它在哪个城市？',
				result: {
					label: '正确回答个数',
					type: 'radio',
					options: [{
						label: '0个',
						value: 0,
					}, {
						label: '1个',
						value: 1,
					}, {
						label: '2个',
						value: 2,
					}, {
						label: '3个',
						value: 3,
					}, {
						label: '4个',
						value: 4,
					}, {
						label: '5个',
						value: 5,
					}, {
						label: '6个',
						value: 6,
					}]
				}
			},
		],

		pageNavItems: [{
				title: '阿尔茨海默病早期筛查及评估',
				note: '',
				thumb: '/static/quantityTable.png',
				thumbSize: 'lg',
				to: '/pages/test-page-nav/evaluate-form/evaluate-form'
			},
			{
				title: 'Mini-Cog量表',
				note: '',
				thumb: '/static/quantityTable.png',
				thumbSize: 'lg',
				to: '/pages/test-page-nav/mini-cog/mini-cog'
			},
			{
				title: 'HIS量表',
				note: '',
				thumb: '/static/quantityTable.png',
				thumbSize: 'lg',
				to: '/pages/test-page-nav/his/his'
			},
			{
				title: 'MMSE量表',
				note: '',
				thumb: '/static/quantityTable.png',
				thumbSize: 'lg',
				to: '/pages/test-page-nav/mmse/mmse'
			},
			{
				title: 'MoCA量表',
				note: '',
				thumb: '/static/quantityTable.png',
				thumbSize: 'lg',
				to: '/pages/test-page-nav/moca/moca'
			},
		]
	},
	mutations: {
		setPatientInfoData(state, patients) {
			state.patientInfoData = {
				patient_id: patients.map(patient => patient.patient_id || ""),
				patient_name: patients.map(patient => patient.patient_name || ""),
				created_at: patients.map(patient => patient.created_at || "")
			}
		},

		setEvaluateFormData(state, newData) {
			state.evaluateFormData = newData;
		},
		setMiniCogData(state, newData) {
			state.miniCogData = newData;
		},
		setHisData(state, newData) {
			state.hisData = newData;
		},
		setMmseData(state, newData) {
			state.mmseData = newData;
		},
		setMocaData(state, newData) {
			state.mocaData = newData;
		},
		// 清除测试数据
		clearTestPageData(state) {
			state.evaluateFormData = {};
			state.miniCogData = {};
		},
		// 标记已完成
		markCompleted(state, key) {
			if (key == 'evaluate-form') {
				if (!state.pageNavItems[0].title?.includes('已完成'))
					state.pageNavItems[0].title = state.pageNavItems[0].title + ' (已完成)'
			} else if (key == 'mini-cog') {
				if (!state.pageNavItems[1].title?.includes('已完成'))
					state.pageNavItems[1].title = state.pageNavItems[1].title + ' (已完成)'
			} else if (key == 'his') {
				if (!state.pageNavItems[2].title?.includes('已完成'))
					state.pageNavItems[2].title = state.pageNavItems[2].title + ' (已完成)'
			} else if (key == 'mmse') {
				if (!state.pageNavItems[3].title?.includes('已完成'))
					state.pageNavItems[3].title = state.pageNavItems[3].title + ' (已完成)'
			} else if (key == 'moca') {
				if (!state.pageNavItems[4].title?.includes('已完成'))
					state.pageNavItems[4].title = state.pageNavItems[4].title + ' (已完成)'
			}
		},
		setNurse(state, nurseId) {
			state.nurse = nurseId
		},
		setCreatedAt(state, created_at) {
			state.created_at = created_at
		},
		setResultCreatedAt(state, result_created_at) {
			state.result_created_at = result_created_at
		},
		setMiniCogScore2(state, score) {
			state.minicog_score2 = score
		}
	},
})

export default store