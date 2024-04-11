<script lang="ts" setup>
import {add, DataRecord, del, get, list, ListParam, update,}
  from '@/api/ai/orderInfo';
import checkPermission from '@/utils/permission';

const {proxy} = getCurrentInstance() as any;
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

const { order_status_enum } = proxy.useDict(
    'order_status_enum'
  );

const data = reactive({
  // 查询参数
  queryParams: {
    title: undefined,
    orderNo: undefined,
    productId: undefined,
    orderStatus: undefined,
    createUser: undefined,
    page: 1,
    size: 10,
    sort: ['createTime,desc'],
  },
  // 表单数据
  form: {} as DataRecord,
  // 表单验证规则
  rules: {},
});
const {queryParams, form, rules} = toRefs(data);

/**
 * 查询列表
 *
 * @param params 查询参数
 */
const getList = (params: ListParam = {...queryParams.value}) => {
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
      .download('/ai/orderInfo/export', {...queryParams.value}, '订单信息数据')
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
  name: 'OrderInfo',
};
</script>

<template>
  <div class="app-container">
    <Breadcrumb :items="['menu.ai.order', 'menu.ai.order.list']"/>
    <a-card class="general-card" :title="$t('menu.ai.order.list')">
      <!-- 头部区域 -->
      <div class="header">
        <!-- 搜索栏 -->
        <div v-if="showQuery" class="header-query">
          <a-form ref="queryFormRef" :model="queryParams" layout="inline">
            <a-form-item field="title" hide-label>
              <a-input
                  v-model="queryParams.title"
                  placeholder="订单标题"
                  allow-clear
                  style="width: 150px"
                  @press-enter="handleQuery"
              />
            </a-form-item>
            <a-form-item field="orderNo" hide-label>
              <a-input
                  v-model="queryParams.orderNo"
                  placeholder="商户订单编号"
                  allow-clear
                  style="width: 150px"
                  @press-enter="handleQuery"
              />
            </a-form-item>
            <a-form-item field="productId" hide-label>
              <a-input
                  v-model="queryParams.productId"
                  placeholder="支付产品id"
                  allow-clear
                  style="width: 150px"
                  @press-enter="handleQuery"
              />
            </a-form-item>
            <a-form-item field="orderStatus" hide-label>
              <a-select
                v-model="queryParams.orderStatus"
                :options="order_status_enum"
                placeholder="订单状态"
                allow-clear
                style="width: 150px"
              />
            </a-form-item>
            <a-form-item field="createUser" hide-label>
              <a-input
                  v-model="queryParams.createUser"
                  placeholder="创建人"
                  allow-clear
                  style="width: 150px"
                  @press-enter="handleQuery"
              />
            </a-form-item>
            <a-form-item hide-label>
              <a-space>
                <a-button type="primary" @click="handleQuery">
                  <template #icon>
                    <icon-search/>
                  </template>
                  查询
                </a-button>
                <a-button @click="resetQuery">
                  <template #icon>
                    <icon-refresh/>
                  </template>
                  重置
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
                    v-permission="['ai:orderInfo:delete']"
                    type="primary"
                    status="danger"
                    :disabled="multiple"
                    :title="multiple ? '请选择要删除的数据' : ''"
                    @click="handleBatchDelete"
                >
                  <template #icon>
                    <icon-delete/>
                  </template>
                  删除
                </a-button>
                <a-button
                    v-permission="['ai:orderInfo:export']"
                    :loading="exportLoading"
                    type="primary"
                    status="warning"
                    @click="handleExport"
                >
                  <template #icon>
                    <icon-download/>
                  </template>
                  导出
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
          <a-table-column title="订单id" data-index="id">
            <template #cell="{ record }">
              <a-link @click="toDetail(record.id)">{{ record.id }}</a-link>
            </template>
          </a-table-column>
          <a-table-column title="订单标题" data-index="title"/>
          <a-table-column title="商户订单编号" data-index="orderNo"/>
          <a-table-column title="支付产品id" data-index="productId"/>
          <a-table-column title="订单金额(分)" data-index="totalFee"/>
          <a-table-column title="订单二维码连接" data-index="codeUrl"/>
          <a-table-column title="订单状态" data-index="orderStatus"/>
          <a-table-column title="创建人" data-index="createUser"/>
          <a-table-column title="创建时间" data-index="createTime"/>
          <a-table-column title="更新时间" data-index="updateTime"/>
          <a-table-column
              v-if="checkPermission(['ai:orderInfo:update', 'ai:orderInfo:delete'])"
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
                    v-permission="['ai:orderInfo:delete']"
                    type="text"
                    size="small"
                    title="删除"
                    :disabled="record.disabled"
                >
                  <template #icon>
                    <icon-delete/>
                  </template>
                  删除
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
          <a-form-item label="订单标题" field="title">
            <a-input v-model="form.title" placeholder="请输入订单标题"/>
          </a-form-item>
          <a-form-item label="商户订单编号" field="orderNo">
            <a-input v-model="form.orderNo" placeholder="请输入商户订单编号"/>
          </a-form-item>
          <a-form-item label="支付产品id" field="productId">
            <a-input v-model="form.productId" placeholder="请输入支付产品id"/>
          </a-form-item>
          <a-form-item label="订单金额(分)" field="totalFee">
            <a-input v-model="form.totalFee" placeholder="请输入订单金额(分)"/>
          </a-form-item>
          <a-form-item label="订单二维码连接" field="codeUrl">
            <a-input v-model="form.codeUrl" placeholder="请输入订单二维码连接"/>
          </a-form-item>
          <a-form-item label="订单状态" field="orderStatus">
          </a-form-item>
        </a-form>
      </a-modal>

      <!-- 详情区域 -->
      <a-drawer
          title="订单信息详情"
          :visible="detailVisible"
          :width="580"
          :footer="false"
          unmount-on-close
          render-to-body
          @cancel="handleDetailCancel"
      >
        <a-descriptions :column="2" bordered size="large">
          <a-descriptions-item label="订单id">
            <a-skeleton v-if="detailLoading" :animation="true">
              <a-skeleton-line :rows="1"/>
            </a-skeleton>
            <span v-else>{{ dataDetail.id }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="订单标题">
            <a-skeleton v-if="detailLoading" :animation="true">
              <a-skeleton-line :rows="1"/>
            </a-skeleton>
            <span v-else>{{ dataDetail.title }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="商户订单编号">
            <a-skeleton v-if="detailLoading" :animation="true">
              <a-skeleton-line :rows="1"/>
            </a-skeleton>
            <span v-else>{{ dataDetail.orderNo }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="支付产品id">
            <a-skeleton v-if="detailLoading" :animation="true">
              <a-skeleton-line :rows="1"/>
            </a-skeleton>
            <span v-else>{{ dataDetail.productId }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="订单金额(分)">
            <a-skeleton v-if="detailLoading" :animation="true">
              <a-skeleton-line :rows="1"/>
            </a-skeleton>
            <span v-else>{{ dataDetail.totalFee }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="订单二维码连接">
            <a-skeleton v-if="detailLoading" :animation="true">
              <a-skeleton-line :rows="1"/>
            </a-skeleton>
            <span v-else>{{ dataDetail.codeUrl }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="订单状态">
            <a-skeleton v-if="detailLoading" :animation="true">
              <a-skeleton-line :rows="1"/>
            </a-skeleton>
            <span v-else>{{ dataDetail.orderStatus }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="创建人">
            <a-skeleton v-if="detailLoading" :animation="true">
              <a-skeleton-line :rows="1"/>
            </a-skeleton>
            <span v-else>{{ dataDetail.createUserString }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="创建时间">
            <a-skeleton v-if="detailLoading" :animation="true">
              <a-skeleton-line :rows="1"/>
            </a-skeleton>
            <span v-else>{{ dataDetail.createTime }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="修改人">
            <a-skeleton v-if="detailLoading" :animation="true">
              <a-skeleton-line :rows="1"/>
            </a-skeleton>
            <span v-else>{{ dataDetail.updateUserString }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="更新时间">
            <a-skeleton v-if="detailLoading" :animation="true">
              <a-skeleton-line :rows="1"/>
            </a-skeleton>
            <span v-else>{{ dataDetail.updateTime }}</span>
          </a-descriptions-item>
        </a-descriptions>
      </a-drawer>
    </a-card>
  </div>
</template>

<style scoped lang="less"></style>
