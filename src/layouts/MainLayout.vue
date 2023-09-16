<template>
  <q-layout view="hHh lpR fFf">

    <q-header
      elevated
      class="bg-primary text-white"
      height-hint="98"
    >
      <q-toolbar>
        <q-btn
          flat
          round
          icon="menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <q-icon name="diversity_1" />
          IFS Companion
        </q-toolbar-title>

        <q-tabs align="left">
          <q-route-tab
            label="Maps"
            v-model="isActiveTab"
            @click="toPage('maps')"
          />
          <q-route-tab
            label="Sessions"
            v-model="isActiveTab"
            @click="toPage('sessions')"
          />
          <q-route-tab
            label="Flows"
            v-model="isActiveTab"
            @click="toPage('flows')"
          />
        </q-tabs>

        <q-btn
          @click="toPage('login')"
          flat
          round
          icon="logout"
        ></q-btn>

        <q-btn
          flat
          round
          icon="menu"
          @click="toggleRightDrawer"
        />
      </q-toolbar>


    </q-header>

    <q-drawer
      show-if-above
      v-model="leftDrawerOpen"
      side="left"
      bordered
    >
      <SessionLeftDrawerContents />
    </q-drawer>

    <q-drawer
      show-if-above
      v-model="rightDrawerOpen"
      side="right"
      bordered
    >
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <!-- <q-footer
      elevated
      class="bg-grey-8 text-white"
    >
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
          </q-avatar>
          <div>Title</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-footer> -->

  </q-layout>
</template>

<script>
import SessionLeftDrawerContents from 'src/components/SessionLeftDrawerContents.vue'
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router';

export default {
  setup() {
    // UI
    const leftDrawerOpen = ref(false);
    const rightDrawerOpen = ref(false);

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value;
    }


    const activeTab = ref("activation");
    const isActiveTab = computed((label) => {
      return label === activeTab.value;
    });

    // Navigation
    const router = useRouter();
    const toPage = (page) => {
      router.push({ path: `/${page}` });
    };




    return {
      toPage,
      leftDrawerOpen,
      rightDrawerOpen,
      toggleRightDrawer() {
        rightDrawerOpen.value = !rightDrawerOpen.value;
      },
      isActiveTab,
    };
  },
  components: { SessionLeftDrawerContents }
}
</script>
