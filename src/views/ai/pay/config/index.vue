<script lang="ts" setup>
import {add, DataRecord, del, get, list, ListParam, update,}
  from '@/api/ai/payConfig';
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
      page: 1,
      size: 10,
      sort: ['createTime,desc'],
    },
    // 表单数据
    form: {} as DataRecord,
    // 表单验证规则
    rules: {
      name: [{ required: true, message: '支付名称不能为空' }],
      icon: [{ required: true, message: '渠道图标不能为空' }],
      way: [{ required: true, message: '支付方式' }],
      sort: [{ required: true, message: '排序编号不能为空' }],
      remark: [{ required: true, message: '备注信息不能为空' }],
      params: [{ required: true, message: '配置参数不能为空' }],
      isDefault: [{ required: true, message: '默认支付: [0=否的, 1=是的]不能为空' }],
      status: [{ required: true, message: '方式状态: [0=关闭, 1=开启]不能为空' }],
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
    title.value = '新增支付配置';
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
      title.value = '修改支付配置';
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
      .download('/ai/payConfig/export', { ...queryParams.value }, '支付配置数据')
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
    name: 'PayConfig',
  };
</script>

<template>
  <div class="app-container">
    <Breadcrumb :items="['menu.ai.pay', 'menu.ai.pay.config.list']" />
    <a-card class="general-card" :title="$t('menu.ai.pay.config.list')">
      <!-- 头部区域 -->
      <div class="header">
        <!-- 搜索栏 -->
        <div v-if="showQuery" class="header-query">
          <a-form ref="queryFormRef" :model="queryParams" layout="inline">
            <a-form-item field="name" hide-label>
              <a-input
                v-model="queryParams.name"
                placeholder="输入支付名称搜索"
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
                  v-permission="['ai:payConfig:add']"
                  type="primary"
                  @click="toAdd"
                >
                  <template #icon><icon-plus /></template>新增
                </a-button>
                <a-button
                  v-permission="['ai:payConfig:update']"
                  type="primary"
                  status="success"
                  :disabled="single"
                  :title="single ? '请选择一条要修改的数据' : ''"
                  @click="toUpdate(ids[0])"
                >
                  <template #icon><icon-edit /></template>修改
                </a-button>
                <a-button
                  v-permission="['ai:payConfig:delete']"
                  type="primary"
                  status="danger"
                  :disabled="multiple"
                  :title="multiple ? '请选择要删除的数据' : ''"
                  @click="handleBatchDelete"
                >
                  <template #icon><icon-delete /></template>删除
                </a-button>
                <a-button
                  v-permission="['ai:payConfig:export']"
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
          <a-table-column title="支付名称" data-index="name" />
          <a-table-column title="渠道图标" data-index="icon" />
          <a-table-column title="支付方式" data-index="way" />
          <a-table-column title="排序编号" data-index="sort" />
          <a-table-column title="备注信息" data-index="remark" />
          <a-table-column title="配置参数" data-index="params" />
          <a-table-column title="默认支付" data-index="isDefault" />
          <a-table-column title="方式状态" data-index="status" />
          <a-table-column title="创建时间" data-index="createTime" />
          <a-table-column title="创建人" data-index="createUser" />
          <a-table-column
            v-if="checkPermission(['ai:payConfig:update', 'ai:payConfig:delete'])"
            title="操作"
            align="center"
          >
            <template #cell="{ record }">
              <a-button
                v-permission="['ai:payConfig:update']"
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
                  v-permission="['ai:payConfig:delete']"
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
          <a-form-item label="支付名称" field="name">
            <a-input v-model="form.name" placeholder="请输入支付名称" />
          </a-form-item>
          <a-form-item label="渠道图标" field="icon">
            <a-input v-model="form.icon" placeholder="请输入渠道图标" />
          </a-form-item>
          <a-form-item label="支付方式" field="way">
            <a-input v-model="form.way" placeholder="请输入支付方式" />
          </a-form-item>
          <a-form-item label="排序编号" field="sort">
            <a-input v-model="form.sort" placeholder="请输入排序编号" />
          </a-form-item>
          <a-form-item label="备注信息" field="remark">
            <a-input v-model="form.remark" placeholder="请输入备注信息" />
          </a-form-item>
          <a-form-item label="配置参数" field="params">
            <a-input v-model="form.params" placeholder="请输入配置参数" />
          </a-form-item>
          <a-form-item label="默认支付: [0=否的, 1=是的]" field="isDefault">
            <a-input v-model="form.isDefault" placeholder="请输入默认支付: [0=否的, 1=是的]" />
          </a-form-item>
          <a-form-item label="方式状态: [0=关闭, 1=开启]" field="status">
            <a-input v-model="form.status" placeholder="请输入方式状态: [0=关闭, 1=开启]" />
          </a-form-item>
        </a-form>
      </a-modal>

      <!-- 详情区域 -->
      <a-drawer
        title="支付配置详情"
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
          <a-descriptions-item label="支付名称">
            <a-skeleton v-if="detailLoading" :animation="true">
              <a-skeleton-line :rows="1" />
            </a-skeleton>
            <span v-else>{{ dataDetail.name }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="渠道图标">
            <a-skeleton v-if="detailLoading" :animation="true">
              <a-skeleton-line :rows="1" />
            </a-skeleton>
            <span v-else>{{ dataDetail.icon }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="支付方式">
            <a-skeleton v-if="detailLoading" :animation="true">
              <a-skeleton-line :rows="1" />
            </a-skeleton>
            <span v-else>{{ dataDetail.way }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="排序编号">
            <a-skeleton v-if="detailLoading" :animation="true">
              <a-skeleton-line :rows="1" />
            </a-skeleton>
            <span v-else>{{ dataDetail.sort }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="备注信息">
            <a-skeleton v-if="detailLoading" :animation="true">
              <a-skeleton-line :rows="1" />
            </a-skeleton>
            <span v-else>{{ dataDetail.remark }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="配置参数">
            <a-skeleton v-if="detailLoading" :animation="true">
              <a-skeleton-line :rows="1" />
            </a-skeleton>
            <span v-else>{{ dataDetail.params }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="默认支付: [0=否的, 1=是的]">
            <a-skeleton v-if="detailLoading" :animation="true">
              <a-skeleton-line :rows="1" />
            </a-skeleton>
            <span v-else>{{ dataDetail.isDefault }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="方式状态: [0=关闭, 1=开启]">
            <a-skeleton v-if="detailLoading" :animation="true">
              <a-skeleton-line :rows="1" />
            </a-skeleton>
            <span v-else>{{ dataDetail.status }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="是否删除: [0=否, 1=是]">
            <a-skeleton v-if="detailLoading" :animation="true">
              <a-skeleton-line :rows="1" />
            </a-skeleton>
            <span v-else>{{ dataDetail.isDeleted }}</span>
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
          <a-descriptions-item label="更新时间">
            <a-skeleton v-if="detailLoading" :animation="true">
              <a-skeleton-line :rows="1" />
            </a-skeleton>
            <span v-else>{{ dataDetail.updateTime }}</span>
          </a-descriptions-item>
          <a-descriptions-item label="修改人">
            <a-skeleton v-if="detailLoading" :animation="true">
              <a-skeleton-line :rows="1" />
            </a-skeleton>
            <span v-else>{{ dataDetail.updateUserString }}</span>
          </a-descriptions-item>
        </a-descriptions>
      </a-drawer>
    </a-card>
  </div>
</template>

<style scoped lang="less"></style>
