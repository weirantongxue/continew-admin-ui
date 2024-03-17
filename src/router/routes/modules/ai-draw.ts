import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DRAW: AppRouteRecordRaw = {
  name: 'DRAW',
  path: '/draw',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.ai.draw',
    icon: 'draw',
    requiresAuth: true,
    order: 2,
  },
  children: [
    {
      name: 'DrawTask',
      path: '/ai/draw/task',
      component: () => import('@/views/ai/draw/task/index.vue'),
      meta: {
        locale: 'menu.ai.draw.task.list',
        requiresAuth: true,
      },
    },
    {
      name: 'DrawImg',
      path: '/ai/draw/img',
      component: () => import('@/views/ai/draw/img/index.vue'),
      meta: {
        locale: 'menu.ai.draw.img.list',
        requiresAuth: true,
      },
    },
  ],
};

export default DRAW;
