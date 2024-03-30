<script lang="ts" setup>
  import {
    add,
    DataRecord,
    del,
    get,
    list,
    ListParam,
    update,
  } from '@/api/ai/model';
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
      name: undefined,
      modelType: undefined,
      status: undefined,
      createUser: undefined,
      createTime: undefined,
      page: 1,
      size: 10,
      sort: ['sort,asc'],
    },
    // 表单数据
    form: {} as DataRecord,
    // 表单验证规则
    rules: {
      name: [{ required: true, message: '模型名称不能为空' }],
      modelType: [
        { required: true, message: '模型类型,1:大语言模型,2:文生图不能为空' },
      ],
      url: [{ required: true, message: '模型地址不能为空' }],
      sort: [{ required: true, message: '排序值不能为空' }],
      status: [{ required: true, message: '状态（1：启用；2：禁用）不能为空' }],
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
   * 打开新增对话框
   */
  const toAdd = () => {
    reset();
    title.value = '新增AI模型';
    visible.value = true;
  };

  /**
   * 打开修改对话框
   *
   * @param id ID
   */
  const toUpdate = (id: string) => {
    reset();
    get(id).then((res) => {
      form.value = res.data;
      title.value = '修改AI模型';
      visible.value = true;
    });
  };

  /**
   * 重置表单
   */
  const reset = () => {
    form.value = {};
    formRef.value?.resetFields();
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
      .download('/ai/model/export', { ...queryParams.value }, 'AI模型数据')
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
    name: 'Model',
  };
</script>

<template>
  <div class="app-container">
    <Breadcrumb :items="['menu.ai.model', 'menu.ai.model.list']" />
    <a-card class="general-card" :title="$t('menu.ai.model.list')">
      <!-- 头部区域 -->
      <div class="header">
        <!-- 搜索栏 -->
        <div v-if="showQuery" class="header-query">
          <a-form ref="queryFormRef" :model="queryParams" layout="inline">
            <a-form-item field="name" hide-label>
              <a-input
                v-model="queryParams.name"
                placeholder="输入模型名称搜索"
                allow-clear
                style="width: 150px"
                @press-enter="handleQuery"
              />
            </a-form-item>
            <a-form-item field="modelType" hide-label>
              <a-input
                v-model="queryParams.modelType"
                placeholder="输入模型类型,1:大语言模型,2:文生图搜索"
                allow-clear
                style="width: 150px"
                @press-enter="handleQuery"
              />
            </a-form-item>
            <a-form-item field="status" hide-label>
              <a-input
                v-model="queryParams.status"
                placeholder="输入状态（1：启用；2：禁用）搜索"
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
            <a-form-item field="createTime" hide-label>
              <a-input
                v-model="queryParams.createTime"
                placeholder="输入创建时间搜索"
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
                  v-permission="['ai:model:add']"
                  type="primary"
                  @click="toAdd"
                >
                  <template #icon><icon-plus /></template>新增
                </a-button>
                <a-button
                  v-permission="['ai:model:update']"
                  type="primary"
                  status="success"
                  :disabled="single"
                  :title="single ? '请选择一条要修改的数据' : ''"
                  @click="toUpdate(ids[0])"
                >
                  <template #icon><icon-edit /></template>修改
                </a-button>
                <a-button
                  v-permission="['ai:model:delete']"
                  type="primary"
                  status="danger"
                  :disabled="multiple"
                  :title="multiple ? '请选择要删除的数据' : ''"
                  @click="handleBatchDelete"
                >
                  <template #icon><icon-delete /></template>删除
                </a-button>
                <a-button
                  v-permission="['ai:model:export']"
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
          <a-table-column title="模型名称" data-index="name" />
          <a-table-column
            title="模型类型,1:大语言模型,2:文生图"
            data-index="modelType"
          />
          <a-table-column title="模型图标" data-index="coverUrl" />
          <a-table-column title="模型地址" data-index="url" />
          <a-table-column title="描述" data-index="introduction" />
          <a-table-column title="排序值" data-index="sort" />
          <a-table-column
            title="状态（1：启用；2：禁用）"
            data-index="status"
          />
          <a-table-column title="创建人" data-index="createUser" />
          <a-table-column title="创建时间" data-index="createTime" />
          <a-table-column
            v-if="checkPermission(['ai:model:update', 'ai:model:delete'])"
            title="操作"
            align="center"
          >
            <template #cell="{ record }">
              <a-button
                v-permission="['ai:model:update']"
                type="text"
                size="small"
                title="修改"
                @click="toUpdate(record.id)"
              >
                <template #icon><icon-edit /></template>修改
              </a-button>
              <a-popconfirm
                content="是否确定删除该数据？"
                type="warning"
                @ok="handleDelete([record.id])"
              >
                <a-button
                  v-permission="['ai:model:delete']"
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
          <a-form-item label="模型名称" field="name">
            <a-input v-model="form.name" placeholder="请输入模型名称" />
          </a-form-item>
          <a-form-item label="模型类型,1:大语言模型,2:文生图" field="modelType">
            <a-input
              v-model="form.modelType"
              placeholder="请输入模型类型,1:大语言模型,2:文生图"
            />
          </a-form-item>
          <a-form-item label="模型图标" field="coverUrl">
            <a-input v-model="form.coverUrl" placeholder="请输入模型图标" />
          </a-form-item>
          <a-form-item label="模型地址" field="url">
            <a-input v-model="form.url" placeholder="请输入模型地址" />
          </a-form-item>
          <a-form-item label="描述" field="introduction">
            <a-input v-model="form.introduction" placeholder="请输入描述" />
          </a-form-item>
          <a-form-item label="排序值" field="sort">
            <a-input v-model="form.sort" placeholder="请输入排序值" />
          </a-form-item>
          <a-form-item label="状态（1：启用；2：禁用）" field="status">
            <a-input
              v-model="form.status"
              placeholder="请输入状态（1：启用；2：禁用）"
            />
          </a-form-item>
        </a-form>
      </a-modal>

      <!-- 详情区域 -->
      <a-drawer
        title="AI模型详情"
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
          <a-descriptions-item label="模型名称">
            <a-skeleton v-if="detailLoading" :animation="true">
              <a-skeleton-line :rows="1" />
            </a-skeleton>
            <span v-else>{{ dataDetail.name }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="模型类型,1:大语言模型,2:文生图">
            <a-skeleton v-if="detailLoading" :animation="true">
              <a-skeleton-line :rows="1" />
            </a-skeleton>
            <span v-else>{{ dataDetail.modelType }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="模型图标">
            <a-skeleton v-if="detailLoading" :animation="true">
              <a-skeleton-line :rows="1" />
            </a-skeleton>
            <span v-else>{{ dataDetail.coverUrl }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="模型地址">
            <a-skeleton v-if="detailLoading" :animation="true">
              <a-skeleton-line :rows="1" />
            </a-skeleton>
            <span v-else>{{ dataDetail.url }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="描述">
            <a-skeleton v-if="detailLoading" :animation="true">
              <a-skeleton-line :rows="1" />
            </a-skeleton>
            <span v-else>{{ dataDetail.introduction }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="排序值">
            <a-skeleton v-if="detailLoading" :animation="true">
              <a-skeleton-line :rows="1" />
            </a-skeleton>
            <span v-else>{{ dataDetail.sort }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="状态（1：启用；2：禁用）">
            <a-skeleton v-if="detailLoading" :animation="true">
              <a-skeleton-line :rows="1" />
            </a-skeleton>
            <span v-else>{{ dataDetail.status }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="是否删除: 0=否, 1=是">
            <a-skeleton v-if="detailLoading" :animation="true">
              <a-skeleton-line :rows="1" />
            </a-skeleton>
            <span v-else>{{ dataDetail.isDelete }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="创建人">
            <a-skeleton v-if="detailLoading" :animation="true">
              <a-skeleton-line :rows="1" />
            </a-skeleton>
            <span v-else>{{ dataDetail.createUserString }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="创建时间">
            <a-skeleton v-if="detailLoading" :animation="true">
              <a-skeleton-line :rows="1" />
            </a-skeleton>
            <span v-else>{{ dataDetail.createTime }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="修改人">
            <a-skeleton v-if="detailLoading" :animation="true">
              <a-skeleton-line :rows="1" />
            </a-skeleton>
            <span v-else>{{ dataDetail.updateUserString }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="修改时间">
            <a-skeleton v-if="detailLoading" :animation="true">
              <a-skeleton-line :rows="1" />
            </a-skeleton>
            <span v-else>{{ dataDetail.updateTime }}</span>
          </a-descriptions-item>
        </a-descriptions>
      </a-drawer>
    </a-card>
  </div>
</template>

<style scoped lang="less"></style>
