import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const AI: AppRouteRecordRaw = {
  name: 'AI',
  path: '/ai',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: 'menu.ai',
    icon: 'ai',
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
    {
      name: 'Model',
      path: '/ai/model',
      component: () => import('@/views/ai/model/index.vue'),
      meta: {
        locale: 'menu.ai.model.list',
        requiresAuth: true,
      },
    },
    {
      name: 'ModelScript',
      path: '/ai/modelScript',
      component: () => import('@/views/ai/modelScript/index.vue'),
      meta: {
        locale: 'menu.ai.modelScript.list',
        requiresAuth: true,
      },
    },

    {
      name: 'Item',
      path: '/ai/item',
      component: () => import('@/views/ai/item/index.vue'),
      meta: {
        locale: 'menu.ai.item.list',
        requiresAuth: true,
      },
    },
    {
      name: 'Msg',
      path: '/ai/msg',
      component: () => import('@/views/ai/msg/index.vue'),
      meta: {
        locale: 'menu.ai.msg.list',
        requiresAuth: true,
      },
    },
    {
      name: 'Order',
      path: '/ai/order',
      component: () => import('@/views/ai/order/index.vue'),
      meta: {
        locale: 'menu.ai.order',
        requiresAuth: true,
      },
    },
    {
      name: 'PaymentInfo',
      path: '/ai/pay/info',
      component: () => import('@/views/ai/pay/PaymentInfo/index.vue'),
      meta: {
        locale: 'menu.ai.pay',
        requiresAuth: true,
      },
    },
    {
      name: 'PayConfig',
      path: '/ai/pay/config',
      component: () => import('@/views/ai/pay/config/index.vue'),
      meta: {
        locale: 'menu.ai.pay',
        requiresAuth: true,
      },
    },
    {
      name: 'DeptAccount',
      path: '/ai/pay/account',
      component: () => import('@/views/ai/pay/account/index.vue'),
      meta: {
        locale: 'menu.ai.pay',
        requiresAuth: true,
      },
    },
    {
      name: 'Product',
      path: '/ai/product',
      component: () => import('@/views/ai/product/index.vue'),
      meta: {
        locale: 'menu.ai.product.list',
        requiresAuth: true,
      },
    },
  ],
};

export default AI;
