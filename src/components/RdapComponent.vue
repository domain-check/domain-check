<script lang="ts" setup>
import { fetchRdap } from '@/services/rdapService';
import type { RdapEvent, RdapResponse } from '@/types/rdap';
import { onMounted, ref } from 'vue';
import SpinnerIcon from '@/icons/SpinnerIcon.vue';
import BaseAlert from './BaseAlert.vue';

const props = defineProps({
  domain: {
    type: String,
    required: true
  }
});

const rdapResponse = ref<RdapResponse>()
const rdapError = ref<{ title: string, text?: string } | null>();
const isRdapLoading = ref(false);
const isResponseShown = ref(false);

onMounted(async () => {
  rdapError.value = null;
  isRdapLoading.value = true;
  try {
    rdapResponse.value = await fetchRdap(props.domain).then((json) => {
      json.events.sort((a: RdapEvent, b: RdapEvent) => {
        return new Date(b.eventDate).getTime() - new Date(a.eventDate).getTime();
      });
      return json;
    });
  } catch (error: any) {
    console.error(error)
    rdapError.value = {
      title: 'RDAP request failed',
      text: error.message ?? error.toString()
    }
  } finally {
    isRdapLoading.value = false;
  }
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <div v-if="isRdapLoading" class="flex items-center justify-center">
      <SpinnerIcon class="w-12 h-12 fill-neutral-800 text-neutral-500"></SpinnerIcon>
    </div>

    <BaseAlert v-if="rdapError" type="error">{{ rdapError.title }}</BaseAlert>

    <div v-if="rdapResponse" class="flex flex-col gap-3">

      <div class="flex gap-2">
        <div>Status:</div>
        <div class="flex flex-wrap gap-1">
          <span v-for="(status, index) in rdapResponse.status" :key="index"
            class="flex items-center gap-1 text-xs px-2 py-1 rounded bg-neutral-700 text-neutral-100 whitespace-nowrap">
            {{ status }}
          </span>
        </div>
      </div>

      <hr class="w-full h-px bg-neutral-200 border-0 dark:bg-neutral-700">

      <div class="flex flex-col gap-2">
        <div>Entities:</div>
        <div class="flex flex-col gap-2">
          <div v-for="(entity, index) in rdapResponse.entities" :key="index">
            <div class="flex justify-between items-start gap-2">
              <div class="flex flex-wrap gap-1">
                <span v-for="(role, index) in entity.roles" :key="index"
                  class="flex items-center gap-1 text-xs px-2 py-1 rounded bg-neutral-700 text-neutral-100 whitespace-nowrap">
                  {{ role }}
                </span>
              </div>
              <div class="font-medium">{{ (entity.vcardArray && entity.vcardArray[1][1] &&
                entity.vcardArray[1][1][3]) ?
                entity.vcardArray[1][1][3] :
                'Unknown' }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <hr class="w-full h-px bg-neutral-200 border-0 dark:bg-neutral-700">

      <div class="flex flex-col gap-2">
        <div>Events:</div>
        <div class="flex flex-col gap-2">
          <div v-for="(event, index) in rdapResponse.events" :key="index">
            <div class="flex justify-between items-start gap-2">
              <div class="flex flex-wrap gap-1">
                <span
                  class="flex items-center gap-1 text-xs px-2 py-1 rounded bg-neutral-700 text-neutral-100 whitespace-nowrap">
                  {{ event.eventAction }}
                </span>
              </div>
              <div class="font-medium">{{ new Date(event.eventDate).toLocaleString() }}</div>
            </div>
          </div>
        </div>
      </div>

      <hr class="w-full h-px bg-neutral-200 border-0 dark:bg-neutral-700">

      <div>
        <button v-if="!isResponseShown" @click="isResponseShown = true" class="underline">Show response</button>
        <button v-else @click="isResponseShown = false" class="underline">Hide response</button>
        <pre v-if="isResponseShown" class="max-h-[360px] p-3 mt-3 bg-grey-darken-3 overflow-scroll bg-neutral-200 dark:bg-neutral-700">{{ rdapResponse }}</pre>
      </div>

    </div>

    <!-- <div v-if="rdapResponse">

      <v-row v-if="rdapResponse.events && rdapResponse.events.length > 0">
        <v-col cols="auto" class="pb-0 pb-sm-3">
          <v-list-item-subtitle>Events:</v-list-item-subtitle>
        </v-col>
        <v-col>
          <div class="d-flex flex-column ga-2">
            <div v-for="(event, index) in rdapResponse.events" :key="index" class="flex-1-1">
              <v-card variant="tonal">
                <v-card-text class="d-flex align-center justify-space-between">
                  <div class="d-flex flex-wrap ga-1">
                    <v-chip size="small">{{ event.eventAction }}</v-chip>
                  </div>
                  <div class="d-flex align-center ga-2">
                    <v-icon>mdi-calendar</v-icon>
                    <div class="font-weight-medium">{{ event.eventDate }}
                    </div>
                  </div>
                </v-card-text>
              </v-card>
            </div>
          </div>
        </v-col>
      </v-row>

      <v-row v-if="rdapResponse.entities && rdapResponse.entities.length > 0">
        <v-col cols="auto" class="pb-0 pb-sm-3">
          <v-list-item-subtitle>Entities:</v-list-item-subtitle>
        </v-col>
        <v-col>
          <div class="d-flex flex-column ga-2">
            <div v-for="(entity, index) in rdapResponse.entities" :key="index" class="flex-1-1">
              <v-card variant="tonal">
                <v-card-text class="d-flex align-center justify-space-between">
                  <div class="d-flex flex-wrap ga-1">
                    <v-chip size="small" v-for="(role, index) in entity.roles" :key="index">{{ role }}</v-chip>
                  </div>
                  <div class="d-flex align-center ga-2">
                    <v-icon>mdi-account</v-icon>
                    <div>
                      <div class="font-weight-medium">{{ (entity.vcardArray && entity.vcardArray[1][1] &&
                        entity.vcardArray[1][1][3]) ?
                        entity.vcardArray[1][1][3] :
                        'Unknown' }}
                      </div>
                    </div>
                  </div>
                </v-card-text>
              </v-card>
            </div>
          </div>
        </v-col>
      </v-row>
      <div class="mt-5">
        <v-btn v-if="!isResponseShown" @click="isResponseShown = true" block prepend-icon="mdi-code-json"
          variant="outlined">Show response</v-btn>
        <v-btn v-else @click="isResponseShown = false" block prepend-icon="mdi-code-json" variant="outlined">Hide
          response</v-btn>
        <pre v-if="isResponseShown" class="pa-3 mt-3 bg-grey-darken-3 overflow-auto">{{ rdapResponse }}</pre>
      </div>
    </div> -->
  </div>
</template>