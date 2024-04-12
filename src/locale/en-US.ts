import localeWorkplace from '@/views/dashboard/workplace/locale/en-US';

import localeUser from '@/views/system/user/locale/en-US';
import localeRole from '@/views/system/role/locale/en-US';
import localeMenu from '@/views/system/menu/locale/en-US';
import localeDept from '@/views/system/dept/locale/en-US';
import localeAnnouncement from '@/views/system/announcement/locale/en-US';
import localeMessage from '@/views/system/message/locale/en-US';
import localeDict from '@/views/system/dict/locale/en-US';
import localeConfig from '@/views/system/config/locale/en-US';
import localeFile from '@/views/system/file/locale/en-US';

import localeGenerator from '@/views/tool/generator/locale/en-US';

import localeOnlineUser from '@/views/monitor/online/locale/en-US';
import localeLoginLog from '@/views/monitor/log/login/locale/en-US';
import localeOperationLog from '@/views/monitor/log/operation/locale/en-US';
import localeSystemLog from '@/views/monitor/log/system/locale/en-US';

import localeSearchTable from '@/views/demo/list/search-table/locale/en-US';
import localeCardList from '@/views/demo/list/card/locale/en-US';
import localeStepForm from '@/views/demo/form/step/locale/en-US';
import localeGroupForm from '@/views/demo/form/group/locale/en-US';
import localeBasicProfile from '@/views/demo/profile/basic/locale/en-US';
import localeSuccess from '@/views/demo/result/success/locale/en-US';
import localeError from '@/views/demo/result/error/locale/en-US';
import locale403 from '@/views/demo/exception/403/locale/en-US';
import locale404 from '@/views/demo/exception/404/locale/en-US';
import locale500 from '@/views/demo/exception/500/locale/en-US';
import localeDataAnalysis from '@/views/demo/visualization/data-analysis/locale/en-US';
import localeMultiDAnalysis from '@/views/demo/visualization/multi-dimension-data-analysis/locale/en-US';
import localeRealTimeMonitor from '@/views/demo/visualization/real-time-monitor/locale/en-US';

import localeMessageBox from '@/components/message-box/locale/en-US';
import localeLogin from '@/views/login/locale/en-US';
import localeUserCenter from '@/views/system/user/center/locale/en-US';
import localeItem from '@/views/ai/item/locale/en-US';
import localeMsg from '@/views/ai/msg/locale/en-US';
import localeDrawTask from '@/views/ai/draw/task/locale/en-US';
import localeDrawImg from '@/views/ai/draw/img/locale/en-US';
import localeMode from '@/views/ai/model/locale/en-US';
import localeModelScript from '@/views/ai/modelScript/locale/en-US';
import localeAiOrder from '@/views/ai/order/locale/en-US';
import localePayInfo from '@/views/ai/pay/PaymentInfo/locale/en-US';
import localePayConfig from '@/views/ai/pay/config/locale/en-US';
import localePayDeptAccount from '@/views/ai/pay/account/locale/en-US';
import localeProduct from '@/views/ai/product/locale/en-US';
import localeSettings from './en-US/settings';

export default {
  'title': 'AI makes the world',
  'menu.dashboard': 'Dashboard',
  'menu.server.dashboard': 'Dashboard-Server',
  'menu.server.workplace': 'Workplace-Server',
  'menu.ai.qa': 'AiQa QA',
  'menu.ai.draw': 'Painting tasks',
  'menu.ai.model': 'Model',
  'menu.ai.order': 'order',
  'menu.ai.pay': '支付管理',
  'menu.ai.pay.info': '支付信息列表',
  'menu.ai.product': '产品管理',
  'menu.system': 'System management',
  'menu.tool': 'Tool',
  'menu.monitor': 'Monitor',
  'menu.list': 'List',
  'menu.form': 'Form',
  'menu.profile': 'Profile',
  'menu.result': 'Result',
  'menu.exception': 'Exception',
  'menu.visualization': 'Data Visualization',
  'menu.server.monitor': 'Monitor-Server',
  'menu.arcoWebsite': 'Arco Design Vue',
  'menu.github': 'GitHub',
  'menu.user': 'User Center',
  'navbar.docs': 'Docs',
  'navbar.action.locale': 'Switch to English',

  ...localeWorkplace,

  ...localeUser,
  ...localeRole,
  ...localeMenu,
  ...localeDept,
  ...localeAnnouncement,
  ...localeMessage,
  ...localeDict,
  ...localeConfig,
  ...localeFile,

  ...localeGenerator,

  ...localeOnlineUser,
  ...localeLoginLog,
  ...localeOperationLog,
  ...localeSystemLog,

  ...localeSearchTable,
  ...localeCardList,
  ...localeStepForm,
  ...localeGroupForm,
  ...localeBasicProfile,
  ...localeSuccess,
  ...localeError,
  ...locale403,
  ...locale404,
  ...locale500,
  ...localeDataAnalysis,
  ...localeMultiDAnalysis,
  ...localeRealTimeMonitor,

  ...localeMessageBox,
  ...localeLogin,
  ...localeUserCenter,
  ...localeSettings,
  ...localeItem,
  ...localeMsg,
  ...localeDrawTask,
  ...localeDrawImg,
  ...locale403,

  ...localeMode,
  ...localeModelScript,
  ...localeAiOrder,
  ...localePayInfo,
  ...localeProduct,
  ...localePayConfig,
  ...localePayDeptAccount,
};
