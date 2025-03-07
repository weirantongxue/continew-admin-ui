<template>
  <div class="gi_page">
    <SplitPanel>
      <template #left>
        <RoleTree @node-click="handleSelectRole" />
      </template>
      <template #main>
        <a-tabs v-model:activeKey="activeTab" class="gi_tabs" size="large">
          <a-tab-pane key="1" title="功能权限">
            <component :is="Pane1" v-if="activeTab === '1'" :role-id="roleId" />
          </a-tab-pane>
          <a-tab-pane key="2" title="角色用户">
            <component :is="Pane2" v-if="activeTab === '2'" :role-id="roleId" />
          </a-tab-pane>
        </a-tabs>
      </template>
    </SplitPanel>
  </div>
</template>

<script setup lang="ts">
import RoleTree from './tree/index.vue'
import Pane1 from './components/Pane1.vue'
import Pane2 from './components/Pane2.vue'

defineOptions({ name: 'SystemRole' })

const activeTab = ref('1')

const roleId = ref('')
// 根据选中角色查询
const handleSelectRole = (keys: Array<any>) => {
  roleId.value = keys.length === 1 ? keys[0] : undefined
}
</script>

<style scoped lang="scss">

</style>
