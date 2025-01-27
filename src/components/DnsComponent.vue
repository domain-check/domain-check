<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { DnsResponseStatus, DnsRecordType, type DnsJsonResponse } from '@/types/dns';
import { fetchDns } from '@/services/dnsService';
import SpinnerIcon from '@/icons/SpinnerIcon.vue';
import BaseAlert from './BaseAlert.vue';
import ArrowDownIcon from '@/icons/ArrowDownIcon.vue';

const props = defineProps({
  domain: {
    type: String,
    required: true
  }
});

const dnsResponse = ref<DnsJsonResponse>()
const dnsError = ref<{ title: string, text?: string } | null>();
const isDnsLoading = ref(false);
const isResponseShown = ref(false);
const dnsType = ref<DnsRecordType>(1); // A
const dnsTypes: { value: DnsRecordType, title: string }[] = Object.values(DnsRecordType).filter((value) => typeof value === 'number').map((value) => { return { value, title: DnsRecordType[value] } });

onMounted(async () => {
  await fetch();
})

watch(dnsType, async () => {
  await fetch();
})

async function fetch(): Promise<void> {
  dnsError.value = null;
  isDnsLoading.value = true;
  try {
    dnsResponse.value = await fetchDns(props.domain, dnsType.value);
  } catch (error: any) {
    dnsError.value = {
      title: 'DNS request failed',
      text: error.message ?? error.toString()
    }
  } finally {
    isDnsLoading.value = false;
  }
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <div v-if="isDnsLoading" class="flex items-center justify-center">
      <SpinnerIcon class="w-12 h-12 fill-neutral-800 text-neutral-500"></SpinnerIcon>
    </div>

    <BaseAlert v-if="dnsError" type="error">{{ dnsError.title }}</BaseAlert>

    <div v-if="dnsResponse" class="flex gap-2">
      <div>Status:</div>
      <span class="flex items-center gap-1 text-xs px-2 py-1 rounded bg-neutral-700 text-neutral-100 whitespace-nowrap">
        {{ DnsResponseStatus[dnsResponse.Status] }}
      </span>
    </div>

    <div class="grid">
      <select v-model="dnsType"
        class="block w-full p-2.5 pr-8 appearance-none row-start-1 col-start-1 text-sm rounded-lg border bg-neutral-100 border-neutral-300 text-neutral-900 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-100 !outline-none cursor-pointer">
        <option v-for="(type, index) in dnsTypes" :key="index" :value="type.value">{{ type.title }}</option>
      </select>
      <ArrowDownIcon class="w-5 h-5 row-start-1 col-start-1 self-center justify-self-end mr-2"></ArrowDownIcon>
    </div>

    <table v-if="dnsResponse">
      <thead>
        <tr>
          <th class="text-left p-2">Name</th>
          <th class="text-left p-2">Type</th>
          <th class="text-left p-2">TTL</th>
          <th class="text-left p-2">Data</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="dnsRecord in dnsResponse.Answer">
          <td class="text-left p-2">{{ dnsRecord.name }}</td>
          <td class="text-left p-2">{{ DnsRecordType[dnsRecord.type] }}</td>
          <td class="text-left p-2">{{ dnsRecord.TTL }}</td>
          <td class="text-left p-2">{{ dnsRecord.data }}</td>
        </tr>
      </tbody>
    </table>

    <div>
      <button v-if="!isResponseShown" @click="isResponseShown = true" class="underline">Show response</button>
      <button v-else @click="isResponseShown = false" class="underline">Hide response</button>
      <pre v-if="isResponseShown" class="max-h-[360px] p-3 mt-3 bg-grey-darken-3 overflow-scroll bg-neutral-200 dark:bg-neutral-700">{{ dnsResponse }}</pre>
    </div>
  </div>

</template>