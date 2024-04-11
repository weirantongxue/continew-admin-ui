<script lang="ts" setup>
import {
  DataRecord,
  ListParam,
  list,
  get,
  add,
  update,
  del,
// eslint-disable-next-line import/no-unresolved
} from '@/api/ai/chatMessage';
import checkPermission from '@/utils/permission';

const { proxy } = getCurrentInstance() as any;
// const { dis_enable_status_enum } = proxy.useDict('dis_enable_status_enum');

const queryFormRef = ref();
const formRef = ref();
const dataList = ref<DataRecord[]>([]);
const dataDetail = ref<DataRecord>({
  // TODO 待补充详情字段默认值
});
const total = ref(0);
const ids = ref<Array<string>>([]);
const title = ref('');
const single = ref(true);
const multiple = ref(true);
const showQuery = ref(true);
const loading = ref(false);
const detailLoading = ref(false);
const exportLoading = ref(false);
const visible = ref(false);
const detailVisible = ref(false);

const data = reactive({
  // 查询参数
  queryParams: {
    itemId: undefined,
    messageId: undefined,
    model: undefined,
    adopt: undefined,
    createTime: undefined,
    createUser: undefined,
    page: 1,
    size: 10,
    sort: ['createTime,desc'],
  },
  // 表单数据
  form: {} as DataRecord,
  // 表单验证规则
  rules: {
    messageId: [{ required: true, message: '消息id不能为空' }],
    promptTokens: [{ required: true, message: '输入词块数不能为空' }],
    completionTokens: [{ required: true, message: '输出词块数不能为空' }],
    totalTokens: [{ required: true, message: '总词块数不能为空' }],
    responseTime: [{ required: true, message: '总请求耗时不能为空' }],
    chatResponseTime: [{ required: true, message: '聊天耗时不能为空' }],
  },
});
const { queryParams, form, rules } = toRefs(data);

/**
 * 查询列表
 *
 * @param params 查询参数
 */
const getList = (params: ListParam = { ...queryParams.value }) => {
  loading.value = true;
  list(params)
      .then((res) => {
        dataList.value = res.data.list;
        total.value = res.data.total;
      })
      .finally(() => {
        loading.value = false;
      });
};
getList();


/**
 * 重置表单
 */
const reset = () => {
  form.value = {
    // TODO 待补充需要重置的字段默认值，详情请参考其他模块 index.vue
  };
  formRef.value.resetFields();
};

/**
 * 取消
 */
const handleCancel = () => {
  visible.value = false;
  formRef.value.resetFields();
};

/**
 * 确定
 */
const handleOk = () => {
  formRef.value.validate((valid: any) => {
    if (!valid) {
      if (form.value.id !== undefined) {
        update(form.value, form.value.id).then((res) => {
          handleCancel();
          getList();
          proxy.$message.success(res.msg);
        });
      } else {
        add(form.value).then((res) => {
          handleCancel();
          getList();
          proxy.$message.success(res.msg);
        });
      }
    }
  });
};

/**
 * 查看详情
 *
 * @param id ID
 */
const toDetail = async (id: string) => {
  if (detailLoading.value) return;
  detailLoading.value = true;
  detailVisible.value = true;
  get(id)
      .then((res) => {
        dataDetail.value = res.data;
      })
      .finally(() => {
        detailLoading.value = false;
      });
};

/**
 * 关闭详情
 */
const handleDetailCancel = () => {
  detailVisible.value = false;
};

/**
 * 批量删除
 */
const handleBatchDelete = () => {
  if (ids.value.length === 0) {
    proxy.$message.info('请选择要删除的数据');
  } else {
    proxy.$modal.warning({
      title: '警告',
      titleAlign: 'start',
      content: `是否确定删除所选的${ids.value.length}条数据？`,
      hideCancel: false,
      onOk: () => {
        handleDelete(ids.value);
      },
    });
  }
};

/**
 * 删除
 *
 * @param ids ID 列表
 */
const handleDelete = (ids: Array<string>) => {
  del(ids).then((res) => {
    proxy.$message.success(res.msg);
    getList();
  });
};

/**
 * 已选择的数据行发生改变时触发
 *
 * @param rowKeys ID 列表
 */
const handleSelectionChange = (rowKeys: Array<any>) => {
  ids.value = rowKeys;
  single.value = rowKeys.length !== 1;
  multiple.value = !rowKeys.length;
};

/**
 * 导出
 */
const handleExport = () => {
  if (exportLoading.value) return;
  exportLoading.value = true;
  proxy
      .download('/ai/chatMessage/export', { ...queryParams.value }, '对话消息数据')
      .finally(() => {
        exportLoading.value = false;
      });
};

/**
 * 查询
 */
const handleQuery = () => {
  getList();
};

/**
 * 重置
 */
const resetQuery = () => {
  queryFormRef.value.resetFields();
  handleQuery();
};

/**
 * 切换页码
 *
 * @param current 页码
 */
const handlePageChange = (current: number) => {
  queryParams.value.page = current;
  getList();
};

/**
 * 切换每页条数
 *
 * @param pageSize 每页条数
 */
const handlePageSizeChange = (pageSize: number) => {
  queryParams.value.size = pageSize;
  getList();
};
</script>

<script lang="ts">
export default {
  name: 'ChatMessage',
};
</script>

<template>
  <div class="app-container">
    <Breadcrumb :items="['menu.ai.qa', 'menu.ai.msg.list']" />
    <a-card class="general-card" :title="$t('menu.ai.msg.list')">
      <!-- 头部区域 -->
      <div class="header">
        <!-- 搜索栏 -->
        <div v-if="showQuery" class="header-query">
          <a-form ref="queryFormRef" :model="queryParams" layout="inline">
            <a-form-item field="itemId" hide-label>
              <a-input
                  v-model="queryParams.itemId"
                  placeholder="输入会话id搜索"
                  allow-clear
                  style="width: 150px"
                  @press-enter="handleQuery"
              />
            </a-form-item>
            <a-form-item field="messageId" hide-label>
              <a-input
                  v-model="queryParams.messageId"
                  placeholder="输入消息id搜索"
                  allow-clear
                  style="width: 150px"
                  @press-enter="handleQuery"
              />
            </a-form-item>
            <a-form-item field="model" hide-label>
              <a-input
                  v-model="queryParams.model"
                  placeholder="输入模型名称搜索"
                  allow-clear
                  style="width: 150px"
                  @press-enter="handleQuery"
              />
            </a-form-item>
            <a-form-item field="adopt" hide-label>
              <a-input
                  v-model="queryParams.adopt"
                  placeholder="输入是否采纳,0:未点击.1:采纳.2,未采纳搜索"
                  allow-clear
                  style="width: 150px"
                  @press-enter="handleQuery"
              />
            </a-form-item>
            <a-form-item field="createTime" hide-label>
              <a-input
                  v-model="queryParams.createTime"
                  placeholder="输入创建时间搜索"
                  allow-clear
                  style="width: 150px"
                  @press-enter="handleQuery"
              />
            </a-form-item>
            <a-form-item field="createUser" hide-label>
              <a-input
                  v-model="queryParams.createUser"
                  placeholder="输入创建人搜索"
                  allow-clear
                  style="width: 150px"
                  @press-enter="handleQuery"
              />
            </a-form-item>
            <a-form-item hide-label>
              <a-space>
                <a-button type="primary" @click="handleQuery">
                  <template #icon><icon-search /></template>查询
                </a-button>
                <a-button @click="resetQuery">
                  <template #icon><icon-refresh /></template>重置
                </a-button>
              </a-space>
            </a-form-item>
          </a-form>
        </div>
        <!-- 操作栏 -->
        <div class="header-operation">
          <a-row>
            <a-col :span="12">
              <a-space>
                <a-button
                    v-permission="['ai:chatMessage:delete']"
                    type="primary"
                    status="danger"
                    :disabled="multiple"
                    :title="multiple ? '请选择要删除的数据' : ''"
                    @click="handleBatchDelete"
                >
                  <template #icon><icon-delete /></template>删除
                </a-button>
                <a-button
                    v-permission="['ai:chatMessage:export']"
                    :loading="exportLoading"
                    type="primary"
                    status="warning"
                    @click="handleExport"
                >
                  <template #icon><icon-download /></template>导出
                </a-button>
              </a-space>
            </a-col>
            <a-col :span="12">
              <right-toolbar
                  v-model:show-query="showQuery"
                  @refresh="getList"
              />
            </a-col>
          </a-row>
        </div>
      </div>

      <!-- 列表区域 -->
      <a-table
          row-key="id"
          :data="dataList"
          :loading="loading"
          :row-selection="{
          type: 'checkbox',
          showCheckedAll: true,
          onlyCurrent: false,
        }"
          :pagination="{
          showTotal: true,
          showPageSize: true,
          total: total,
          current: queryParams.page,
        }"
          :bordered="false"
          column-resizable
          stripe
          size="large"
          @page-change="handlePageChange"
          @page-size-change="handlePageSizeChange"
          @selection-change="handleSelectionChange"
      >
        <template #columns>
          <a-table-column title="主键" data-index="id">
            <template #cell="{ record }">
              <a-link @click="toDetail(record.id)">{{ record.id }}</a-link>
            </template>
          </a-table-column>
          <a-table-column title="会话id" data-index="itemId" />
          <a-table-column title="消息id" data-index="messageId" />
          <a-table-column title="任务id" data-index="taskId" />
          <a-table-column title="提问" data-index="question" />
          <a-table-column title="回答" data-index="answer" />
          <a-table-column title="模型名称" data-index="model" />
          <a-table-column title="是否采纳" data-index="adopt" />
          <a-table-column title="输入词块数" data-index="promptTokens" />
          <a-table-column title="输出词块数" data-index="completionTokens" />
          <a-table-column title="总词块数" data-index="totalTokens" />
          <a-table-column title="总请求耗时" data-index="responseTime" />
          <a-table-column title="聊天耗时" data-index="chatResponseTime" />
          <a-table-column title="创建时间" data-index="createTime" />
          <a-table-column title="创建人" data-index="createUser" />
          <a-table-column
              v-if="checkPermission(['ai:chatMessage:update', 'ai:chatMessage:delete'])"
              title="操作"
              align="center"
          >
            <template #cell="{ record }">
              <a-popconfirm
                  content="是否确定删除该数据？"
                  type="warning"
                  @ok="handleDelete([record.id])"
              >
                <a-button
                    v-permission="['ai:chatMessage:delete']"
                    type="text"
                    size="small"
                    title="删除"
                    :disabled="record.disabled"
                >
                  <template #icon><icon-delete /></template>删除
                </a-button>
              </a-popconfirm>
            </template>
          </a-table-column>
        </template>
      </a-table>

      <!-- 表单区域 -->
      <a-modal
          :title="title"
          :visible="visible"
          :mask-closable="false"
          :esc-to-close="false"
          unmount-on-close
          render-to-body
          @ok="handleOk"
          @cancel="handleCancel"
      >
        <a-form ref="formRef" :model="form" :rules="rules" size="large">
          <a-form-item label="消息id" field="messageId">
            <a-input v-model="form.messageId" placeholder="请输入消息id" />
          </a-form-item>
          <a-form-item label="输入词块数" field="promptTokens">
            <a-input v-model="form.promptTokens" placeholder="请输入输入词块数" />
          </a-form-item>
          <a-form-item label="输出词块数" field="completionTokens">
            <a-input v-model="form.completionTokens" placeholder="请输入输出词块数" />
          </a-form-item>
          <a-form-item label="总词块数" field="totalTokens">
            <a-input v-model="form.totalTokens" placeholder="请输入总词块数" />
          </a-form-item>
          <a-form-item label="总请求耗时" field="responseTime">
            <a-input v-model="form.responseTime" placeholder="请输入总请求耗时" />
          </a-form-item>
          <a-form-item label="聊天耗时" field="chatResponseTime">
            <a-input v-model="form.chatResponseTime" placeholder="请输入聊天耗时" />
          </a-form-item>
        </a-form>
      </a-modal>

      <!-- 详情区域 -->
      <a-drawer
          title="对话消息详情"
          :visible="detailVisible"
          :width="580"
          :footer="false"
          unmount-on-close
          render-to-body
          @cancel="handleDetailCancel"
      >
        <a-descriptions :column="2" bordered size="large">
          <a-descriptions-item label="主键">
            <a-skeleton v-if="detailLoading" :animation="true">
              <a-skeleton-line :rows="1" />
            </a-skeleton>
            <span v-else>{{ dataDetail.id }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="会话id">
            <a-skeleton v-if="detailLoading" :animation="true">
              <a-skeleton-line :rows="1" />
            </a-skeleton>
            <span v-else>{{ dataDetail.itemId }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="消息id">
            <a-skeleton v-if="detailLoading" :animation="true">
              <a-skeleton-line :rows="1" />
            </a-skeleton>
            <span v-else>{{ dataDetail.messageId }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="任务id">
            <a-skeleton v-if="detailLoading" :animation="true">
              <a-skeleton-line :rows="1" />
            </a-skeleton>
            <span v-else>{{ dataDetail.taskId }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="提问">
            <a-skeleton v-if="detailLoading" :animation="true">
              <a-skeleton-line :rows="1" />
            </a-skeleton>
            <span v-else>{{ dataDetail.question }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="回答">
            <a-skeleton v-if="detailLoading" :animation="true">
              <a-skeleton-line :rows="1" />
            </a-skeleton>
            <span v-else>{{ dataDetail.answer }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="模型名称">
            <a-skeleton v-if="detailLoading" :animation="true">
              <a-skeleton-line :rows="1" />
            </a-skeleton>
            <span v-else>{{ dataDetail.model }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="是否采纳,0:未点击.1:采纳.2,未采纳">
            <a-skeleton v-if="detailLoading" :animation="true">
              <a-skeleton-line :rows="1" />
            </a-skeleton>
            <span v-else>{{ dataDetail.adopt }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="ip信息">
            <a-skeleton v-if="detailLoading" :animation="true">
              <a-skeleton-line :rows="1" />
            </a-skeleton>
            <span v-else>{{ dataDetail.ip }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="输入词块数">
            <a-skeleton v-if="detailLoading" :animation="true">
              <a-skeleton-line :rows="1" />
            </a-skeleton>
            <span v-else>{{ dataDetail.promptTokens }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="输出词块数">
            <a-skeleton v-if="detailLoading" :animation="true">
              <a-skeleton-line :rows="1" />
            </a-skeleton>
            <span v-else>{{ dataDetail.completionTokens }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="总词块数">
            <a-skeleton v-if="detailLoading" :animation="true">
              <a-skeleton-line :rows="1" />
            </a-skeleton>
            <span v-else>{{ dataDetail.totalTokens }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="总请求耗时">
            <a-skeleton v-if="detailLoading" :animation="true">
              <a-skeleton-line :rows="1" />
            </a-skeleton>
            <span v-else>{{ dataDetail.responseTime }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="聊天耗时">
            <a-skeleton v-if="detailLoading" :animation="true">
              <a-skeleton-line :rows="1" />
            </a-skeleton>
            <span v-else>{{ dataDetail.chatResponseTime }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="创建时间">
            <a-skeleton v-if="detailLoading" :animation="true">
              <a-skeleton-line :rows="1" />
            </a-skeleton>
            <span v-else>{{ dataDetail.createTime }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="创建人">
            <a-skeleton v-if="detailLoading" :animation="true">
              <a-skeleton-line :rows="1" />
            </a-skeleton>
            <span v-else>{{ dataDetail.createUserString }}</span>
          </a-descriptions-item>
        </a-descriptions>
      </a-drawer>
    </a-card>
  </div>
</template>

<style scoped lang="less"></style>
